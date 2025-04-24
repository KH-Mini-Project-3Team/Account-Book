"use client";

import styles from "../../../styles/homepage/calendar.module.css";

const { useState, useEffect } = require("react");

//내역
const extraInfo = {
  10: ["50,000", "29,500","20,500"],
}



const Calander = () => {
  // 연 / 달 변경
  const [calendarHTML, setCalendarHTML] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  //윤달 확인
  const checkLeapYear = (year) => {
    if (year % 400 === 0) return true;
    else if (year % 100 === 0) return false;
    else if (year % 4 === 0) return true;
    else return false;
  }

  //각 달의 01일 위치 정해주기
  const getFirstDayOfWeek = (year, month) => {
    let zero = "";
    if (month < 10) zero = "0";
    //return (new Date(year + "-" + zero + month + "-" + "01")).getDay();
    return (new Date(`${year} - ${zero}${month} - 01`)).getDay();
  }

  //월 변경
  const changeYearMonth = (year, month) => {
    let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //윤달인 경우
    if (month === 2) if (checkLeapYear(year)) monthDay[1] = 29;

    // 01일 찾기
    const firstDay = new Date(year, month - 1, 1).getDay();

    //이전 달 날짜
    let totalDays = monthDay[month - 1]
    let arrCalendar = [];

    //01일이 생성되기 전 비어 있는 내용
    for (let i = 0; i < firstDay; i++) {
      arrCalendar.push({ day: "", extra: ""});
    }

    //날짜 넣기
    for (let i = 1; i <= totalDays ; i++) {
      arrCalendar.push({ day: String(i), extra: extraInfo[i] || ""});
    }

    //마지막 날짜까지 넣고 비어 있는 내용
    let remainDay = 7 - (arrCalendar.length % 7);
    if (remainDay < 7) {
      for (let i = 0; i < remainDay; i++) {
        arrCalendar.push({ day: "", extra: ""});
      }
    }
    return arrCalendar;
  }

  //HTML 생성
  const renderCalendarHTML = (calendarData) => {
    const rows = [];
    for (let i = 0 ; i < calendarData.length ; i++) {
      if (i % 7 === 0) rows.push("<tr>");
      const { day, extra } = calendarData[i];
      const extraContent = Array.isArray(extra)
        ? extra.map((item) => `<div className={styles.extra}">${item}</div>`).join("")
        : `<div className={styles.extra}>${extra}</div>`;

      rows.push(
        `<td>
          <div className = {styles.day}>
            <span class="day">${day}</span>
            <div>${extraContent}</div>
          </div>
        </td>`
      );

      if (i % 7 === 6) rows.push("</tr>");
    }
    return rows.join("");
  };

//달력 갱신
useEffect(() => {
  let year = currentYear;
  let month = currentMonth;

  if(month < 1) {
    year -= 1;
    month = 12;
    setCurrentYear(year);
    setCurrentMonth(month);
  } else if(month > 12) {
    year += 1;
    month = 12;
    setCurrentYear(year);
    setCurrentMonth(month);
  }

  const calendarData = changeYearMonth(year, month);
  const html = renderCalendarHTML(calendarData);
  setCalendarHTML(html);
}, [currentYear, currentMonth]);

//화살표 클릭했을 때 왼쪽/오른쪽
const changeMonth = (diff) => {
  setCurrentMonth(prev => prev + diff);
}

  return (
    <div>
      <div>
        {/* 
        <div>
          <button onClick={() => changeMonth(-1)}>이전 달</button>
          <input type="number" value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value))} />
          <select value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value))}>
            <option value="1">1월</option>
            <option value="2">2월</option>
            <option value="3">3월</option>
            <option value="4">4월</option>
            <option value="5">5월</option>
            <option value="6">6월</option>
            <option value="7">7월</option>
            <option value="8">8월</option>
            <option value="9">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
          <button onClick={() => changeMonth(1)}>다음 달</button>
        </div>
         */}
        <div className={styles.calendar}>
          <table>
            <thead>
              <tr>
                <td>일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
              </tr>
            </thead>
            { calendarHTML.length > 0 &&
            <tbody dangerouslySetInnerHTML={{__html: calendarHTML}}></tbody>}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Calander;