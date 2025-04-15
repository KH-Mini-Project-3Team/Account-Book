"use client"

import Header from "./components/header.jsx";
import Navigation from "./components/navigation.jsx"
import styles from "../app/styles/layout.module.css"

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.container}>
          {/* Header (기존 header.module.css 스타일 적용) */}
          <Header />

          {/* 메인 콘텐츠 (스크롤 가능 영역) */}
          <main className={styles.mainContent}>
            {children}
          </main>

          {/* 하단 고정 네비게이션 */}
          <nav className={styles.navigation}>
            <Navigation />
          </nav>
        </div>
      </body>
    </html>
  );
}

