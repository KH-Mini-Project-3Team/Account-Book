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
    const date = dateObj.getDate();
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
  const march = {"3월": groupedData["3월"]};

  return (
    <div className={styles.dailyTotal}>
      {Object.entries(march).map(([month, days]) => (
        <div key={month}>
          {Object.entries(days).map(([day, items], index) => {
            const income = items
              .filter(i => i.type === "income")
              .reduce((sum, i) => sum + i.price, 0);

            const expend = items
              .filter(i => i.type === "expend")
              .reduce((sum, i) => sum + i.price, 0);

            return (
              <ul key={index}>
                <li>{day}</li>
                <li>수입 <span>{income.toLocaleString()}원</span></li>
                <li>지출 <span>{expend.toLocaleString()}원</span></li>
                <li>합계 <span>{(income - expend).toLocaleString()}원</span></li>
              </ul>
            );
          })}
        </div>
      ))}
    </div>
  );
}