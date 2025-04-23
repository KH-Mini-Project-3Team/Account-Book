"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/navigation.module.css'
import { format } from "date-fns";
import { useEffect, useState } from 'react';

export default function Navigation() {
   const Pathname = usePathname();
   if(Pathname === "/inputheader") return null;

   const [today, setToday] = useState("");
   useEffect(()=>{
      const now = new Date();
      const formatted = format(now, "M. d.");
      setToday(formatted);
   },[]);
   return (
      <nav className={styles.container}>
         <ul className={styles.navList}>
            <li>
               <Link href="/" className={styles.navLink}>
                  <div className={styles.navItem}>
                  <Image 
                  src="/images/today.svg" 
                  alt="홈"
                  width={32}
                  height={32}
                  
                  className={styles.navImage}
                  />        
                  <span className={styles.navText}>{today}</span>     
                  </div>
               </Link>
            </li>
            <li>
               <Link href="/MyAssets" className={styles.navLink}>
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
               <Link href="/MyAssets/asset-detail" className={styles.navLink}>
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
               <Link href="/InputAssets" className={styles.navLink}>
                  <div className={styles.navItem}>
                     <Image
                     src="/images/add.svg" 
                     alt="추가" 
                     width={32}
                     height={32}
                     className={styles.navImage}                  
                     />
                     <span className={styles.navText}>추가</span>                  
                  </div>
               </Link>
            </li>
         </ul>
      </nav>
   );
}