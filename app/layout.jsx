"use client"

import Header from "./components/header.jsx";
import Navigation from "./components/navigation.jsx"
import styles from "../app/styles/layout.module.css"

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.container}>    
          <Header />
          <main className={styles.mainContent}>
            {children}
          </main>
          <nav className={styles.navigation}>
            <Navigation />
          </nav>
        </div>
      </body>
    </html>
  );
}

