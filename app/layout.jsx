import React from 'react';
import { DataProvider } from './contexts/DataContext';
import './styles/globals.css';


export default function RootLayout({children}){
  return (
    <html lang="en">
      <body>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}