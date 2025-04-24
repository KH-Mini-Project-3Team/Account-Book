"use client";

import styles from "../../styles/homepage/daily.module.css"
import { usePathname, useRouter } from "next/navigation"

export default function Select() {
  const router = useRouter();
  const pathname = usePathname();

  return (<>
    <div>
      <ul className={styles.list}>
        <li className={pathname === '/' ? styles.underline : ''} onClick={() => router.push('/')}>일일</li>
        <li className={pathname === '/calendar' ? styles.underline : ''} onClick={() => router.push('/calendar')}>달력</li>
        <li className={pathname === '/monthly' ? styles.underline : ''} onClick={() => router.push('/monthly')}>월별</li>
        <li>요약</li>
        <li>메모</li>
      </ul>
    </div>
  </>)
}