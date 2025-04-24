"use client"

import { usePathname } from 'next/navigation';
import Header from './Header';
import InputHeader from './InputHeader'
export default function HeaderWrapper() {
  const pathname = usePathname();

  // 특정 페이지에서는 헤더를 아예 숨기기
  if (pathname === "/inputheader") {
    return null;
  }
  if (
    pathname === "/Categories/SetRevenu" ||
    pathname === "/Categories/SetAssets" ||
    pathname === "/Categories/SetExpend"
  ) {
    return null; 
  }
  if (pathname === "/InputAssets") {
    return <InputHeader />
  }

  // 모든 페이지에서 Header 하나만 사용
  return <Header />;
}