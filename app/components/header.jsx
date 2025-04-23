"use client"
import { useMonth } from "../contexts/MonthContext";
import { usePathname, useRouter } from 'next/navigation';
import { addMonths, subMonths } from 'date-fns';
import styles from "./styles/header.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
   const { currentDate, setCurrentDate } = useMonth();


   const Pathname = usePathname();
   const router = useRouter();
   if (Pathname.includes("/inputheader")) return null;

   let pageTitle = '가계부'; // 기본값

   if (Pathname === "/MyAssets") {
     pageTitle = "자산";
   } else if (Pathname === "/MyAssets/asset-detail") {
     pageTitle = "통계";
   }
   // 이전 월로 이동
   const handlePrevMonth = () => {
      const prevMonth = subMonths(currentDate, 1); // 이전 달로 설정
      setCurrentDate(prevMonth);  // currentDate를 업데이트
   };

   // 다음 월로 이동
   const handleNextMonth = () => {
      const nextMonth = addMonths(currentDate, 1);  // 다음 달로 설정
      setCurrentDate(nextMonth);  // currentDate를 업데이트
   };
   //날짜를 포맷팅!
   const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

   return (
      <div className={styles.container}>
         <div className={styles.topBar}>
            <Link href="/">
               <button>
                  <Image
                     src="/images/home.svg"
                     alt="Home"
                     width={25}
                     height={25}
                     className={styles.Images}
                  />
               </button>
            </Link>
            <span className={styles.mainText}>{pageTitle}</span>
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