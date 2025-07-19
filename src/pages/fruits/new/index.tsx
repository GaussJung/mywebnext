import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../page.module.css';

export default function NewFruit() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fruits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    router.push('/fruits');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.title}>Create New Fruit</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            placeholder="Fruit name"
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.buttonBlue}>Save</button>
        </form>
      </div>
    </div>
  );
}