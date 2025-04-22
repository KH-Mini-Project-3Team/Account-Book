'use client'; 

import { createContext, useContext, useState } from 'react';
import { globalConfig } from '../config/globalConfig'

const DataContext = createContext();

export function DataProvider({children}){

  const [data, setData] = useState(globalConfig);

  const addData = (item) => setData(prev => [...prev, item]);
  // 예시: 데이터 수정 함수
  const updateData = (idx, newItem) =>
    setData(prev => prev.map((item, i) => (i === idx ? newItem : item)));
  // 예시: 데이터 삭제 함수
  const removeData = (idx) =>
    setData(prev => prev.filter((_, i) => i !== idx));

  const [revenuList, setRevenuList] = useState(["용돈", "금융소득", "월급"]);
  const [expensesList, setExpensesList] = useState(["편의점", "카페", "음식점", "담배", "구독료"]);
  const [assetList, setAssetList] = useState(["토스뱅크", "카카오뱅크", "농협", "IBK기업", "신한"])

  return (
    <DataContext.Provider value={{
      revenuList, setRevenuList,
      expensesList, setExpensesList,
      assetList, setAssetList
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData(){
  return useContext(DataContext);
}