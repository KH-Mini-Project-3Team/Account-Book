"use client"

import Link from "next/link";
import styles from "../../../styles/homepage/daily.module.css"
import { useData } from "@/app/contexts/DataContext";
import { useMonth } from "@/app/contexts/MonthContext";

//요일 구하기
const getDay = (dateStr) => {
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayIndex = new Date(dateStr).getDay();
  return days[dayIndex];
};



export default function DailyTotal() {
  const { data } = useData();
  const { currentDate } = useMonth();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  //현재 월 필터링
  const monthData = data.filter(item => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === currentYear &&
      itemDate.getMonth() === currentMonth
    );
  });

  //일별 그룹화
  const groupedData = {};
  monthData.forEach(item => {
    const itemDate = new Date(item.date);
    const dateStr = item.date;
    const dayKey = `${String(itemDate.getDate()).padStart(2, "0")}일 (${getDay(dateStr)})`;

    if (!groupedData[dayKey]) groupedData[dayKey] = [];
    groupedData[dayKey].push(item);
  });

  return (
    <div className={styles.dailyTotal}>
      {Object.entries(groupedData)
        .sort((a, b) => {
          const getDateNumber = (str) => parseInt(str.split("일")[0], 10);
          return getDateNumber(b[0]) - getDateNumber(a[0]);
        })

        .map(([dayStr, items]) => {
          const [datePart, dayPartWithParen] = dayStr.split(" ");
          const dayPart = dayPartWithParen.replace(/[()]/g, "");

          const income = items
            .filter(i => i.type === "income")
            .reduce((sum, i) => sum + i.price, 0);

          const expend = items
            .filter(i => i.type === "expend")
            .reduce((sum, i) => sum + i.price, 0);

          return (
            <div key={dayStr}>
              <ul>
                <li>{datePart}</li>
                <li>{dayPart}</li>
                <li><span>{income.toLocaleString()}원</span></li>
                <li><span>{expend.toLocaleString()}원</span></li>
              </ul>
              {/* 세부 내역 */}
              {items.map((item, index) => (

                <ul key={index}>
                  <li>{item.category}</li>

                  <li>
                    <Link href={`/InputAssets?id=${item.id}`}>
                      <div>{item.memo}</div>
                      <div>{item.asset}</div>
                    </Link>
                  </li>

                  <li>
                    {item.type === "income" ? item.price.toLocaleString() + "원" : ""}
                  </li>
                  <li>
                    {item.type === "expend" ? item.price.toLocaleString() + "원" : ""}
                  </li>
                </ul>
              ))}
            </div>
          );
        })}
    </div>
  );
}