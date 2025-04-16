"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/navigation.module.css'

export default function Navigation() {
   return (
      <nav>
         <ul className={styles.navList}>
            <li>
               <Link href="/" className={styles.navLink}>
                  <div className={styles.navItem}>
                  <Image 
                  src="/images/home.svg" 
                  alt="홈"
                  width={32}
                  height={32}
                  className={styles.navImage}
                  />        
                  <span className={styles.navText}>홈</span>     
                  </div>
               </Link>
            </li>
            <li>
               <Link href="/" className={styles.navLink}>
                  <div className={styles.navItem}>
                     <Image 
                     src="/images/mymoney.svg" 
                     alt="자산" 
                     width={32}
                     height={32}
                     className={styles.navImage}                  
                     />
                     <span className={styles.navText}>자산</span>
                  </div>
               </Link>
            </li>
            <li>
               <Link href="/" className={styles.navLink}>
                  <div className={styles.navItem}>
                     <Image
                     src="/images/graph.svg" 
                     alt="통계" 
                     width={32}
                     height={32}
                     className={styles.navImage}                  
                     />                  
                     <span className={styles.navText}>통계</span>    
                  </div>
               </Link>
            </li>
            <li>
               <Link href="/" className={styles.navLink}>
                  <div className={styles.navItem}>
                     <Image
                     src="/images/more.svg" 
                     alt="더보기" 
                     width={32}
                     height={32}
                     className={styles.navImage}                  
                     />
                     <span className={styles.navText}>더보기</span>                  
                  </div>
               </Link>
            </li>
         </ul>
      </nav>
   );
}