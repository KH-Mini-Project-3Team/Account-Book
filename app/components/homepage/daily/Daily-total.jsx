import styles from "../../../styles/homepage/daily.module.css"
import { globalConfig } from "../../../config/globalConfig"

//요일 반환
const getDay = (dateStr) => {
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayIndex = new Date(dateStr).getDay();
  return days[dayIndex];
}

// 월별 > 일별 그룹화
const groupByMonthAndDate = (data) => {
  const grouped = {};

  data.forEach(item => {
    const dateObj = new Date(item.date);
    const month = dateObj.getMonth() + 1;
    const date = String(dateObj.getDate()).padStart(2, "0");
    const dateStr = item.date;

    const monthKey = `${month}월`;
    const dayKey = `${date}일 (${getDay(dateStr)})`;

    if (!grouped[monthKey]) grouped[monthKey] = {};
    if (!grouped[monthKey][dayKey]) grouped[monthKey][dayKey] = [];

    grouped[monthKey][dayKey].push(item);
  });

  return grouped;
};



export default function DailyTotal() {
  const groupedData = groupByMonthAndDate(globalConfig);
  const april = { "4월": groupedData["4월"] };

  return (
    <div className={styles.dailyTotal}>
      {Object.entries(april).map(([month, days]) => (
        <div key={month}>
          {Object.entries(days)
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
              <div  key={dayStr}>
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
                        <div>{item.memo}</div>
                        <div>{item.asset}</div>
                      </li>
                      <li>
                        {item.type === "income" ? item.price.toLocaleString() + "원" : ""}
                      </li>
                      <li>
                        {item.type === "expend" ? item.price.toLocaleString() + "원" : ""}
                      </li>
                    </ul>
                  ))
                }
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}