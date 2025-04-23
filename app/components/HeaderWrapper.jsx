"use client"

import { usePathname } from 'next/navigation';
import Header from './Header';
import InputHeader from './inputheader';
import StasticsHeader from './stasticsheader';

export default function HeaderWrapper() {
  const pathname = usePathname();

  // /MyAssets 일 때 InputHeader 표시
  if (pathname === "/MyAssets") {
    return <InputHeader />;
  }
  if (pathname === "/MyAssets/asset-detail") {
    return <StasticsHeader />;
  }

  // 특정 페이지에서만 헤더 숨기기
  if (pathname === "/inputheader") {
    return null;
  }

  if (pathname === "/InputAssets"){
    return null;
  }

  // 그 외 기본 Header
  return <Header />;
}