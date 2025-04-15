"use client";
import Link from 'next/link';


export default function Navigation() {
   return (
      <nav>
         <ul>
            <li>
               <Link href="/">
                  <img src="/images/home.svg" alt="홈" />
               </Link>
            </li>
            <li>
               <Link href="/mymoney">
                  <img src="/images/mymoney.svg" alt="자산" />
               </Link>
            </li>
            <li>
               <Link href="/statistics">
                  <img src="/images/graph.svg" alt="통계" />
               </Link>
            </li>
         </ul>
      </nav>
   );
}