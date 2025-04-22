"use client";

import { createContext, useContext, useState } from "react";
import { globalConfig } from "../config/globalConfig";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(globalConfig);

  // 데이터 수정
  const updateItem = (id, newData) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, ...newData } : item
    ));
  };

  // 데이터 삭제
  const deleteItem = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  // 데이터 추가
  const insertItem = (newItem) => {
    const newId = Math.max(...data.map(item => item.id)) + 1;
    setData(prev => [...prev, { ...newItem, id: newId }]);
  };

  const [revenuList, setRevenuList] = useState([
    "용돈", 
    "금융소득", 
    "월급"]);
  const [expensesList, setExpensesList] = useState([
    "편의점",
    "카페",
    "음식점",
    "담배",
    "구독료",
  ]);
  const [assetList, setAssetList] = useState([
    "토스뱅크",
    "카카오뱅크",
    "농협",
    "IBK기업",
    "신한",
  ]);

  return (
    <DataContext.Provider
      value={{
        revenuList,
        setRevenuList,
        expensesList,
        setExpensesList,
        assetList,
        setAssetList,
        data,
        updateItem,
        deleteItem,
        insertItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
