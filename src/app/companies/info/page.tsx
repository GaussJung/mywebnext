'use client';
import { useState } from 'react';

type Company = {
  cname: string;
  cphone?: string;
  industry?: string;
  remarks?: string;
};

export default function CompanyInfo() {
  const [cid, setCid] = useState('');
  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState('');

  const fetchCompany = async () => {
    setError('');
    setCompany(null);

    if (!cid) {
      setError('회사 ID를 입력해주세요.');
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies/${cid}`);
    if (!res.ok) {
      setError(`회사 ID ${cid}의 정보를 불러오지 못했습니다.`);
      return;
    }

    const data = await res.json();
    setCompany(data);
  };

  return (
    <div>
      <h1>회사 정보 조회</h1>
      <input
        placeholder="회사 ID를 입력하세요"
        value={cid}
        onChange={e => setCid(e.target.value)}
      />
      <button onClick={fetchCompany}>확인</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {company && (
        <div>
          <h2>{company.cname}</h2>
          <p>Phone: {company.cphone}</p>
          <p>Industry: {company.industry}</p>
          <p>Remarks: {company.remarks}</p>
        </div>
      )}
    </div>
  );
}