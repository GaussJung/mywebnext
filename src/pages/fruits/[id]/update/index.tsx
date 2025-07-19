import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../page.module.css';

export default function UpdateFruit() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');

  const fetchFruit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fruits/${id}`);
    const data = await res.json();
    setName(data.name);
  };

  useEffect(() => {
    if (id) fetchFruit();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fruits/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    router.push(`/fruits/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.title}>Update Fruit</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            placeholder="Fruit name"
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.buttonBlue}>Update</button>
        </form>
      </div>
    </div>
  );
}