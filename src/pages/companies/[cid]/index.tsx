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

  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [cidParam, setCidParam] = useState<string | null>(null);

  /**
   * Save cid to localStorage or retrieve from localStorage
   */
  useEffect(() => {
    console.log('[useEffect-1] router.isReady:', router.isReady, 'cid:', cid);

    if (!router.isReady) {
      console.log('[useEffect-1] router is not ready yet.');
      return;
    }

    if (typeof cid === 'string') {
      console.log('[useEffect-1] found cid in router.query:', cid);
      localStorage.setItem('cid-param', cid);
      setCidParam(cid);
    } else {
      const storedCid = localStorage.getItem('cid-param');
      if (storedCid) {
        console.log('[useEffect-1] retrieved cid from localStorage:', storedCid);
        setCidParam(storedCid);
      } else {
        console.log('[useEffect-1] no cid in router.query and no cid in localStorage.');
        setError('Invalid company ID');
        setLoading(false);
      }
    }
  }, [router.isReady, cid]);

  /**
   * Fetch company details by cidParam
   */
  useEffect(() => {
    console.log('[useEffect-2] cidParam:', cidParam);

    if (!cidParam) {
      console.log('[useEffect-2] cidParam is null, skipping fetch.');
      return;
    }

    const fetchCompany = async () => {
      console.log('[fetchCompany] fetching company with cidParam:', cidParam);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cidParam}`);
        console.log('[fetchCompany] response status:', res.status);

        if (!res.ok) {
          throw new Error(`Failed to fetch company ID ${cidParam}`);
        }

        const data = await res.json();
        console.log('[fetchCompany] fetched data:', data);

        setCompanyData(data);
        setError('');
      } catch (err) {
        if (err instanceof Error) {
          console.error('[fetchCompany] error:', err.message);
          setError(err.message);
        } else {
          console.error('[fetchCompany] unknown error');
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [cidParam]);

  const handleUpdate = () => {
    if (cidParam) {
      router.push(`/companies/${cidParam}/update`);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this company?')) return;

    if (!cidParam) {
      alert('Invalid company ID');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cidParam}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete company');
      }
      alert('Company deleted successfully');
      router.push('/companies');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Unknown error occurred');
      }
    }
  };

  if (!router.isReady && !cidParam) {
    return <div>Loading route information…</div>;
  }

  if (loading) {
    return <div>Loading company data…</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className={styles.title}>Company Information</h1>
          <Link href="/companies" className={styles.link}>Go to list</Link>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {companyData && (
          <div>
            <p><span className={styles.label}>Name:</span> <span className={styles.value}>{companyData.cname}</span></p>
            <p><span className={styles.label}>Phone:</span> <span className={styles.value}>{companyData.cphone || '-'}</span></p>
            <p><span className={styles.label}>Industry:</span> <span className={styles.value}>{companyData.industry || '-'}</span></p>
            <p><span className={styles.label}>Remarks:</span> <span className={styles.value}>{companyData.remarks || '-'}</span></p>
          </div>
        )}

        {companyData && (
          <div className={styles.controls} style={{ justifyContent: 'space-between', marginTop: '20px' }}>
            <button className={styles.buttonBlue} onClick={handleUpdate}>Update</button>
            <button className={styles.buttonGreen} onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
