import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.wrapper}>
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
  );
}