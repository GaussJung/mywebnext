import Image from 'next/image';
import styles from './page.module.css'; // CSS Modules Import  

export default function Home() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/wikiki.jpg"
        alt="Hawaii wikiki"
        width={1200}
        height={800}
        className={styles.mainImage} // CSS Moudles Usage  
      />
    </div>
  );
}