// /src/pages/fruits/[id]/index.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../page.module.css';

type Fruit = {
  id: number;
  name: string;
};

export default function FruitDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [fruit, setFruit] = useState<Fruit | null>(null);

  const fetchFruit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fruits/${id}`);
    const data = await res.json();
    setFruit(data);
  };

  useEffect(() => {
    if (id) fetchFruit();
  }, [id]);

  if (!fruit) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.header}>
          <h1 className={styles.title}>Fruit Details</h1>
          <Link href="/fruits" className={styles.link}>Go to list</Link>
        </div>

        <p><strong>ID:</strong> {fruit.id}</p>
        <p><strong>Name:</strong> {fruit.name}</p>
        <Link href={`/fruits/${fruit.id}/update`} className={styles.link}>Edit</Link>
      </div>
    </div>
  );
}
