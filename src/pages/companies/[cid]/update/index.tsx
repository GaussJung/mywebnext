// ./src/pages/companies/[cid]/update/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../page.module.css';

type Company = {
  cid: number;
  cname: string;
  cphone?: string;
  industry?: string;
  remarks?: string;
};

export default function UpdateCompany() {
  const router = useRouter();
  const { cid } = router.query;

  const [form, setForm] = useState<Company>({
    cid: 0,
    cname: '',
    cphone: '',
    industry: '',
    remarks: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (!cid) return;

    const fetchCompany = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cid}`);
      if (!res.ok) {
        setError(`Failed to fetch company ID ${cid}`);
        return;
      }
      const data = await res.json();
      setForm(data);
    };

    fetchCompany();
  }, [cid]);

  // Submit the updated company data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Failed to update company');
      }

      alert('Company updated successfully');
      router.push(`/companies/${cid}`);
    } // Handle unexpected errors in a type-safe way
      catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert('Unknown error');
        }
 
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.title}>Update Company</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label className={styles.formLabel}>Name</label>
            <input
              value={form.cname}
              onChange={(e) => setForm({ ...form, cname: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>Phone</label>
            <input
              value={form.cphone || ''}
              onChange={(e) => setForm({ ...form, cphone: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>Industry</label>
            <input
              value={form.industry || ''}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>Remarks</label>
            <textarea
              value={form.remarks || ''}
              onChange={(e) => setForm({ ...form, remarks: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <button type="submit" className={styles.buttonBlue}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
