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

  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [cid, setCid] = useState<string | null>(null);

  /**
   * 📌 CID 추출
   * - URL pathname에서 추출
   * - 없으면 localStorage fallback
   */
  useEffect(() => {
    const log = '[useEffect-C1]';
    console.log(`${log} router.isReady:`, router.isReady);

    if (!router.isReady) return;

    const path = window.location.pathname;
    console.log(`${log} pathname:`, path);

    const match = path.match(/^\/companies\/(\d+)/);
    const foundCid = match?.[1] || localStorage.getItem('cid-param');

    if (foundCid) {
      console.log(`${log} resolved cid:`, foundCid);
      localStorage.setItem('cid-param', foundCid);
      setCid(foundCid);
    } else {
      console.error(`${log} no cid found`);
      setError('Invalid company ID');
      setLoading(false);
    }
  }, [router.isReady]);

  /**
   * 📌 회사 데이터 로드
   */
  useEffect(() => {
    const log = '[useEffect-C2]';
    if (!cid) {
      console.warn(`${log} cid is null, skipping fetch.`);
      return;
    }

    console.log(`${log} fetching for cid:`, cid);

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cid}`);
        console.log(`${log} response status:`, res.status);

        if (!res.ok) {
          throw new Error(`Failed to fetch company ID ${cid}`);
        }

        const data: Company = await res.json();
        console.log(`${log} fetched data:`, data);

        setCompanyData(data);
        setError('');
      } catch (err) {
        console.error(`${log} error:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cid]);

  const handleUpdate = () => {
    if (cid) {
      router.push(`/companies/${cid}/update`);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this company?`')) return;

    if (!cid) {
      alert('Invalid company ID');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cid}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error('Failed to delete company');

      alert('Company deleted successfully');
      router.push('/companies');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  if (!router.isReady && !cid) {
    return <div>Loading route information…</div>;
  }

  if (loading) {
    return <div>Loading company data…</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.header}>
          <h1 className={styles.title}>Company Information</h1>
          <Link href="/companies" className={styles.link}>
            Go to list
          </Link>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {companyData && (
          <>
            <p><span className={styles.label}>Name:</span> <span className={styles.value}>{companyData.cname}</span></p>
            <p><span className={styles.label}>Phone:</span> <span className={styles.value}>{companyData.cphone || '-'}</span></p>
            <p><span className={styles.label}>Industry:</span> <span className={styles.value}>{companyData.industry || '-'}</span></p>
            <p><span className={styles.label}>Remarks:</span> <span className={styles.value}>{companyData.remarks || '-'}</span></p>
          </>
        )}

        {companyData && (
          <div
            className={styles.controls}
            style={{ justifyContent: 'space-between', marginTop: '20px' }}
          >
            <button className={styles.buttonBlue} onClick={handleUpdate}>Update</button>
            <button className={styles.buttonGreen} onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
