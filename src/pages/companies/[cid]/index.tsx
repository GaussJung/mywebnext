// ./src/pages/companies/[cid]/index.tsx

import styles from '../page.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Company = {
  cid: number;
  cname: string;
  cphone?: string;
  industry?: string;
  remarks?: string;
};

export default function CompanyInformationPage() {
  const router = useRouter();
  const { cid } = router.query;

  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState('');

  /**
   * Fetch company details by cid when component mounts or cid changes
   */
  useEffect(() => {
    if (!cid) return;

    const fetchCompany = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cid}`);
      if (!res.ok) {
        setError(`Failed to fetch company ID ${cid}`);
        return;
      }
      const data = await res.json();
      setCompany(data);
    };

    fetchCompany();
  }, [cid]);

  /**
   * Navigate to update page for the current company
   */
  const handleUpdate = () => {
    router.push(`/companies/${cid}/update`);
  };

  /**
   * Delete the current company and navigate back to the company list
   */
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this company?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cid}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete company');
      }
      alert('Company deleted successfully');
      router.push('/companies');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Unknown error occurred');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        {/* Header with title and link to company list */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className={styles.title}>Company Information</h1>
          <Link href="/companies" className={styles.link}>Go to list</Link>
        </div>

        {/* Error message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Company details */}
        {company && (
          <div>
            <p><span className={styles.label}>Name:</span> <span className={styles.value}>{company.cname}</span></p>
            <p><span className={styles.label}>Phone:</span> <span className={styles.value}>{company.cphone || '-'}</span></p>
            <p><span className={styles.label}>Industry:</span> <span className={styles.value}>{company.industry || '-'}</span></p>
            <p><span className={styles.label}>Remarks:</span> <span className={styles.value}>{company.remarks || '-'}</span></p>
          </div>
        )}

        {/* Action buttons */}
        <div className={styles.controls} style={{ justifyContent: 'space-between', marginTop: '20px' }}>
          <button className={styles.buttonBlue} onClick={handleUpdate}>Update</button>
          <button className={styles.buttonGreen} onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
