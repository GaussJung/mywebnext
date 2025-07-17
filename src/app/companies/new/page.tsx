'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <form onSubmit={handleSubmit}>
      <input placeholder="ID" value={form.cid} onChange={e => setForm({ ...form, cid: e.target.value })} /><br/>
      <input placeholder="Name" value={form.cname} onChange={e => setForm({ ...form, cname: e.target.value })} /><br/>
      <input placeholder="Phone" value={form.cphone} onChange={e => setForm({ ...form, cphone: e.target.value })} /><br/>
      <input placeholder="Industry" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} /><br/>
      <textarea placeholder="Remarks" value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} /><br/>
      <button type="submit">Create</button>
    </form>
  );
}