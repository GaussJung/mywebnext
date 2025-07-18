import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

type Company = {
  cid: number;
  cname: string;
  cphone?: string;
};

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [cname, setCname] = useState('');
  const [cphone, setCphone] = useState('');

  const fetchCompanies = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies`);
    const data = await res.json();
    setCompanies(data);
  };

  const searchByCname = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/search/cname`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cname })
    });
    const data = await res.json();
    setCompanies(data);
  };

  const searchByCphone = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/search/cphone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cphone })
    });
    const data = await res.json();
    setCompanies(data);
  };

  useEffect(() => { fetchCompanies(); }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.title}>Companies</h1>
        <Link href="/companies/new" className={styles.link}>Create New</Link>
        <div className={styles.controls}>
          <input
            placeholder="Search by name"
            value={cname}
            onChange={e => setCname(e.target.value)}
            className={styles.input}
          />
          <button onClick={searchByCname} className={styles.buttonBlue}>Search Name</button>
          <input
            placeholder="Search by phone"
            value={cphone}
            onChange={e => setCphone(e.target.value)}
            className={styles.input}
          />
          <button onClick={searchByCphone} className={styles.buttonGreen}>Search Phone</button>
        </div>
        <hr className={styles.hr} />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Company ID</th>
              <th>Company Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.cid}>
                <td>{c.cid}</td>
                <td>
                  <Link href={`/companies/${c.cid}`} className={styles.companyLink}>
                    {c.cname}
                  </Link>
                </td>
                <td>{c.cphone || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
