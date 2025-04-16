import React from 'react';
import { DataProvider } from './contexts/DataContext';


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