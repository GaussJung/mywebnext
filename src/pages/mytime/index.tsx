// src/app/mydate/page.tsx

 // Marks this as a Client Component in Next.js

import { useEffect, useState } from 'react';

// 1. Define the expected structure of the backend API response using a TypeScript interface.
// This interface reflects the JSON structure you provided, now including the 'UTC' field.
// Example: { "TimeZone": "Asia/Seoul", "DateTime": "20250601-123309", "UTC": "20250601-033309" }
interface BackendDateTimeResponse {
  TimeZone: string;
  DateTime: string;
  UTC: string; // Added the UTC field here
}

export default function MyDate() {
  // 2. Use the defined interface along with 'null' as the generic type for useState.
  // This indicates that the 'data' state can be 'BackendDateTimeResponse' or 'null' (initial state/loading).
  const [data, setData] = useState<BackendDateTimeResponse | null>(null);
  // (Optional) State to handle errors that might occur during the API call.
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Log the backend URL to confirm it's being read correctly.
    console.log('NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

    // Crucial: Check if the environment variable is defined.
    // If not, the fetch call would fail, or attempt to fetch from an undefined URL.
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      console.error("Error: NEXT_PUBLIC_BACKEND_URL is not defined. Please check your .env* files.");
      setError("Backend URL is not configured.");
      return; // Abort API call if URL is missing.
    }

    // Fetch the current date/time from the backend.
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/time`)
      .then(res => {
        // Check if the HTTP response was successful (status code 200-299).
        // `fetch` does not throw an error for HTTP status codes outside 2xx,
        // so we need to explicitly check `res.ok`.
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Parse the JSON response body into a JavaScript object.
      })
      .then((fetchedData: BackendDateTimeResponse) => { // 3. Assign the fetched data, typed as BackendDateTimeResponse.
        // This ensures the data conforms to our specified interface.
        setData(fetchedData);
      })
      .catch(err => {
        // Catch any errors that occur during the fetch operation
        // (e.g., network errors, JSON parsing errors, or errors thrown from `res.ok` check).
        console.error("Failed to fetch date/time data:", err);
        setError(`Failed to load date/time data: ${err.message}`);
        setData(null); // Reset data to null on error.
      });
  }, []); // Empty dependency array means this effect runs only once after the initial render.

  // Display loading message if data is not yet available and no error has occurred.
  if (!data && !error) return <p>Loading date/time data...</p>;

  // Display error message if an error occurred.
  if (error) return <p className="error-message">Error: {error}</p>;

  // Render the data once it has been successfully loaded.
  return (
    <div>
      <h1>Current Date/Time Information:</h1>
      {/* Display the entire response object using JSON.stringify for a raw view. */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
      {/* Safely access and display specific properties of the 'data' object.
          TypeScript guarantees that 'data' has 'TimeZone', 'DateTime', and 'UTC' properties here. */}
      {data && (
        <>
          <p>Time Zone: <strong>{data.TimeZone}</strong></p>
          <p>Date & Time: <strong>{data.DateTime}</strong></p>
          <p>UTC Time: <strong>{data.UTC}</strong></p> {/* Added line to display UTC */}
        </>
      )}

      {/* Styling for the error message. */}
      <style jsx>{`
        .error-message {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
