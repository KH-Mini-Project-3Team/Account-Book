"use client"

import styles from "../../../styles/homepage/daily.module.css"
import { useData } from "@/app/contexts/DataContext";
import { useMonth } from "@/app/contexts/MonthContext";
import { useState } from "react";


export default function Total() {
  const { data } = useData();
  const { currentDate } =useMonth();

  const monthData = data.filter(item=> {
    const date = new Date(item.date);
    return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
  })

  const incomeTotal = monthData
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.price, 0);

  const expendTotal = monthData
    .filter(item => item.type === "expend")
    .reduce((sum, item) => sum + item.price, 0);

  const finalTotal = incomeTotal - expendTotal;

  return (
    <div className={styles.total}>
      <div>
        <span>수입</span>
        <span>{incomeTotal.toLocaleString()}</span>
      </div>
      <div>
        <span>지출</span>
        <span>{expendTotal.toLocaleString()}</span>
      </div>
      <div>
        <span>합계</span>
        <span>{finalTotal.toLocaleString()}</span>
      </div>
    </div>
  )
}