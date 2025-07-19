
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

type Fruit = {
  id: number;
  name: string;
};

export default function FruitList() {
  const [fruits, setFruits] = useState<Fruit[]>([]);

  const fetchFruits = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fruits`);
    const data = await res.json();
    setFruits(data);
  };

  useEffect(() => { fetchFruits(); }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.title}>Fruits</h1>
        <Link href="/fruits/new" className={styles.link}>Create New</Link>

        <hr className={styles.hr} />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {fruits.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>
                  <Link href={`/fruits/${f.id}`} className={styles.companyLink}>
                    {f.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
