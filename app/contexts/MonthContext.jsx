"use client";
import { createContext, useContext, useState } from "react";

const MonthContext = createContext();

export function MonthProvider({ children }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <MonthContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </MonthContext.Provider>
  );
}

export function useMonth() {
  return useContext(MonthContext);
}