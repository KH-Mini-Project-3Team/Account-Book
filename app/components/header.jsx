"use client"

import {addMonths, subMonths} from 'date-fns';
import { useState } from 'react';
import styles from "../styles/header.module.css" ;
import Image from 'next/image';
export default function Header() {
   const [currentDate, setCurrentDate] = useState(new Date());

   const handlePrevMonth = () => {
      setCurrentDate(prev => subMonths(prev, 1));
   }

   const handleNextMonth = () => {
      setCurrentDate(prev => addMonths(prev, 1));
   }

   const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

   return (
      <div className={styles.container}>
         <div className={styles.topBar}>
            <button>
               <Image
               src="/images/search.svg" 
               alt="search"
               width={25}
               height={25}
               className={styles.Images}
               />
            </button>
            <span className={styles.mainText}>가계부</span>
            <button>
               <Image
               src="/images/favorite.svg" 
               alt="favorite"
               width={25}
               height={25} 
               className={styles.Images}
               />
            </button>
            <button>
               <Image
               src="/images/filter.svg" 
               alt="filter"
               width={25}
               height={25} 
               className={styles.Images}
               />
            </button>
         </div>

         <div className={styles.arrowButtons}>
            <button onClick={handlePrevMonth}>
               <Image 
               src="/images/arrow-back.svg" 
               alt="prev"
               width={20}
               height={20} 
               />
            </button>
            <span className={styles.dateText}>{formattedDate}</span>
            <button onClick={handleNextMonth}>
               <Image
               src="/images/arrow-next.svg" 
               alt="next"
               width={20}
               height={20} 
               />
            </button>
         </div>
      </div>
   )
}