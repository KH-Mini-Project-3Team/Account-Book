import React from "react";
import { DataProvider } from "./contexts/DataContext";
import "./styles/globals.css";
import styles from "../app/styles/layout.module.css";
import { Dongle } from "next/font/google";
import Header from "./components/header.jsx";
import Navigation from "./components/navigation.jsx";

const dongle = Dongle({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={dongle.className}>
      <body>
        <DataProvider>
          <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>{children}</main>
            <nav className={styles.navigation}>
              <Navigation />
            </nav>
          </div>

          {children}
        </DataProvider>
      </body>
    </html>
  );
}
