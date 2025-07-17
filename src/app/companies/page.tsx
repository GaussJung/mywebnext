'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Company = {
  cid: number;
  cname: string;
  cphone?: string;
  industry?: string;
  remarks?: string;
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
    <div>
      <h1>Companies</h1>
      <Link href="/companies/new">Create New</Link>
      <div>
        <input placeholder="Search by name" value={cname} onChange={e => setCname(e.target.value)} />
        <button onClick={searchByCname}>Search Name</button>
        <input placeholder="Search by phone" value={cphone} onChange={e => setCphone(e.target.value)} />
        <button onClick={searchByCphone}>Search Phone</button>
      </div>
      <ul>
        {companies.map((c) => (
          <li key={c.cid}>
            <Link href={`/companies/${c.cid}`}>{c.cname}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}