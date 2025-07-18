import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

export default function NewCompany() {
  const router = useRouter();
  const [form, setForm] = useState({ cid: '', cname: '', cphone: '', industry: '', remarks: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    router.push('/companies');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.title}>Create Company</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label className={styles.formLabel}>ID</label>
            <input
              value={form.cid}
              onChange={e => setForm({ ...form, cid: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>Name</label>
            <input
              value={form.cname}
              onChange={e => setForm({ ...form, cname: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>Phone</label>
            <input
              value={form.cphone}
              onChange={e => setForm({ ...form, cphone: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>Industry</label>
            <input
              value={form.industry}
              onChange={e => setForm({ ...form, industry: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.formLabel}>Remarks</label>
            <textarea
              value={form.remarks}
              onChange={e => setForm({ ...form, remarks: e.target.value })}
              className={styles.formInput}
            />
          </div>

          <button type="submit" className={styles.buttonBlue}>Create</button>
        </form>
      </div>
    </div>
  );
}
