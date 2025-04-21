import React from "react";
import { DataProvider } from "./contexts/DataContext";
import "./styles/globals.css";
import { Dongle } from "next/font/google";
import Header from "./components/header.jsx";
import Navigation from "./components/navigation.jsx";

const dongle = Dongle({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <DataProvider>
          <div>
            <Header />
            <main>{children}</main>
            <nav>
              <Navigation />
            </nav>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
