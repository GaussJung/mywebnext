// src/app/myip/page.tsx

"use client"; // Marks this as a Client Component in Next.js

import { useEffect, useState } from 'react';

// 1. Define the expected structure of the backend API response using a TypeScript interface.
// This assumes the backend returns an object with a 'clientIp' property of type string.
// Example :{ "clientIp": "192.168.0.2" }
interface ClientIpApiResponse {
  clientIp: string;
}

export default function MyIP() {
  // 2. Use the defined interface along with 'null' as the generic type for useState.
  // This indicates that the 'data' state can be 'ClientIpApiResponse' or 'null' (initial state/loading).
  const [data, setData] = useState<ClientIpApiResponse | null>(null);
  // (Optional) State to handle errors that might occur during the API call.
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

    // Crucial: Check if the environment variable is defined.
    // If not, it means the backend URL is missing, which would prevent the fetch call from working.
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      console.error("Error: NEXT_PUBLIC_BACKEND_URL is not defined. Please check your .env* files.");
      setError("NEXT_PUBLIC_BACKEND_URL is not defined.");
      return; // Abort API call if URL is not defined.
    }

    // Fetch the client's IP address from backend
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ip`)
      .then(res => {
        // If the HTTP response is not successful (e.g., 404, 500 status codes), throw an error.
        // Note: fetch only rejects on network errors; it resolves even for HTTP error codes (e.g., 4xx, 5xx).
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Parses the JSON response body into a JavaScript object.
      })
      .then((fetchedData: ClientIpApiResponse) => { // 3. Assign the fetched data (typed as ClientIpApiResponse) to the state.
        // The type assertion 'ClientIpApiResponse' confirms to TypeScript the expected structure.
        setData(fetchedData);
      })
      .catch(err => {
        // Handles API call failures, network errors, JSON parsing errors, etc.
        console.error("Failed to fetch IP data:", err);
        setError(`Failed to load IP data: ${err.message}`);
        setData(null); // Reset data to null on error (allows 'Loading...' state to reappear if retried).
      });
  }, []); // Empty dependency array ensures this effect runs only once after the initial render (componentDidMount).

  // Display loading message while API call is in progress or data hasn't loaded yet.
  if (!data && !error) return <p>Loading client IP data...</p>;

  // Display error message if an error occurred during the API call.
  if (error) return <p className="error-message">Error: {error}</p>;

  // Render the data once it has been successfully loaded.
  return (
    <div>
      <h1>Your Client IP Information:</h1>
      {/* Display the entire response object using JSON.stringify for debugging/overview. */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
      {/* Safely access and display the 'clientIp' property, guaranteed by TypeScript. */}
       {data && <p>Your IP Address: <strong style={{ color: "red" }}>{data.clientIp}</strong></p>}
 
      {/* Styling for the error message using styled-jsx (if configured). */}
      <style jsx>{`
        .error-message {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}