'use client'; 

import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({children}){
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