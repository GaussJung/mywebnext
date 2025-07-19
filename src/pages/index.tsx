// ./src/pages/index.tsx

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link href="/fruits" className={styles.headerLink}>Fruit</Link>
          <Link href="/companies" className={styles.headerLink}>Company</Link>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/images/wikiki.jpg"
            alt="Wikiki"
            width={1200}
            height={0}
            style={{ height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}
