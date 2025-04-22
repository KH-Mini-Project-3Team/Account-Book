import React from "react";
import { DataProvider } from "./contexts/DataContext";
import "./styles/globals.css";
import { Dongle } from "next/font/google";
import HeaderWrapper from "./components/HeaderWrapper";
import Navigation from "./components/navigation.jsx";

const dongle = Dongle({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body lang="ko">
        <DataProvider>
          <div  className="layout-wrapper" >
            <HeaderWrapper/>
            <main className="main-content">{children}</main>
            <footer className="footer">
              <Navigation />
            </footer>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
