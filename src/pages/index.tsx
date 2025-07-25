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
        <div className={`${styles.imageContainer} ${styles.vertical}`}>
          <Image
            src="/images/wikiki.jpg"
            alt="Wikiki"
            width={1200}
            height={0}
            style={{ height: 'auto', width: '100%' }}
          />
          <hr style={{ width: '100%' }} />
          <Image
            src="https://data.fandom.live/test/roma.jpg"
            alt="Rome"
            width={1200}
            height={0}
            style={{ height: 'auto', width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
