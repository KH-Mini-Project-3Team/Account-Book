"use client"

import {addMonths, subMonths} from 'date-fns';
import { useState } from 'react';
import styles from "../styles/header.module.css" ;

export default function Header() {
   const [currentDate, setCurrentDate] = useState(new Date());

   const handlePrevMonth = () => {
      setCurrentDate(prev => subMonths(prev, 1));
   }

   const handleNextMonth = () => {
      setCurrentDate(prev => addMonths(prev, 1));
   }

   const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;

   return (
      <div className={styles.container}>
         <div className={styles.topBar}>
            <button>
               <img src="/images/search.svg" alt="search" />
            </button>
            <span>가계부</span>
            <button>
               <img src="/images/favorite.svg" alt="favorite" />
            </button>
            <button>
               <img src="/images/filter.svg" alt="filter" />
            </button>
         </div>

         <div className={styles.arrowButtons}>
            <button onClick={handlePrevMonth}>
               <img src="/images/arrow-back.svg" alt="prev" />
            </button>
            <span className={styles.dateText}>{formattedDate}</span>
            <button onClick={handleNextMonth}>
               <img src="/images/arrow-next.svg" alt="next" />
            </button>
         </div>
      </div>
   )
}