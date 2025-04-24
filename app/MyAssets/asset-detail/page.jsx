// AssetDetailPage.js

"use client"; // 이 파일은 클라이언트 사이드에서만 실행됨

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 페이지 이동을 위한 Next.js의 router 사용
import DonutChart from "../components/donutchart"; // 도넛 차트 컴포넌트 가져오기
import styles from "./AssetDetail.module.css"; // 스타일 파일 가져오기
import { useData } from "@/app/contexts/DataContext"; // 전역 데이터 관리 컨텍스트
import chroma from "chroma-js";  // 색상 관리를 위한 chroma.js 라이브러리
import { useMonth } from "@/app/contexts/MonthContext";

export default function AssetDetailPage() {

  const {currentDate} = useMonth();
  const selectedMonth = currentDate.toISOString().slice(0, 7);

  const router = useRouter();
  const { data } = useData(); // context에서 자산 데이터를 가져옴
  const [selectedTab, setSelectedTab] = useState("income"); // '수입' 혹은 '지출' 탭 상태
  const [filterCategory, setFilterCategory] = useState("전체"); // 카테고리 필터 상태
  const [sortType, setSortType] = useState("최신순"); // 정렬 방식 상태
  const [expandedMonth, setExpandedMonth] = useState({}); // 확장된 월 내역을 위한 상태

  // 자산 데이터를 월별로 그룹화하는 코드
  const grouped = data.reduce((acc, item) => {
    const month = item.date.slice(0, 7); // yyyy-mm 형식으로 날짜 추출
    acc[month] = acc[month] || []; // 월별로 그룹화
    acc[month].push(item); // 해당 월에 아이템 추가
    return acc;
  }, {});

  // 그룹화된 월을 최신순으로 정렬
  const allMonths = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
  // 선택된 월에 해당하는 항목들 필터링
  const currentItems = selectedMonth
    ? (grouped[selectedMonth] || []).filter((item) => item.type === selectedTab)
    : [];

  // 선택된 월에서 카테고리 목록 추출
  const currentMonthCategories = [...new Set(currentItems.map((item) => item.category))];

  // 카테고리 필터링
  const filtered = currentItems.filter(
    (item) => filterCategory === "전체" || item.category === filterCategory
  );

  // 정렬 방식 적용
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "최신순") return new Date(b.date) - new Date(a.date);
    else return b.price - a.price;
  });

  // 월이 확장되었는지 여부 확인
  const isExpanded = expandedMonth[selectedMonth] || false;
  // 확장 여부에 따라 표시할 항목을 조정
  const itemsToShow = isExpanded ? sorted : sorted.slice(0, 3);

  // 각 카테고리별 금액 합계 계산
  const categoryMap = {};
  (selectedMonth ? currentItems : filtered).forEach((item) => {
    if (!categoryMap[item.category]) categoryMap[item.category] = 0;
    categoryMap[item.category] += item.price;
  });

  // 도넛 차트의 데이터 준비
  const chartLabels = Object.keys(categoryMap); // 카테고리
  const chartValues = Object.values(categoryMap); // 각 카테고리의 합계 금액

  // chroma.js를 사용하여 색상 팔레트를 동적으로 생성
  const generateColors = (numColors) => {
    return chroma.scale(['#34D399', '#10B981', '#6EE7B7', '#A7F3D0']) // 기본 색상
      .mode('lab') // 색상 변환 모드
      .colors(numColors); // 필요한 색상의 개수만큼 색상 생성
  };

  // 수입/지출에 맞는 색상 생성
  const chartColors = generateColors(chartLabels.length);

  return (
    <div className={styles.container}>
      {/* 수입 / 지출 탭 */}
      <div className={styles.tabWrapper}>
        {["income", "expend"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab); // 클릭 시 탭 변경
              setFilterCategory("전체"); // 카테고리 초기화
            }}
            className={`${styles.tabButton} ${
              selectedTab === tab ? styles.tabSelected : styles.tabUnselected
            }`}
          >
            {tab === "income" ? "수입" : "지출"}
          </button>
        ))}
      </div>

      {/* 카테고리 & 정렬 셀렉트박스 */}
      <div className={styles.filterRow}>
        <select
          value={filterCategory}
          onChange={(e) => {
            const newMonth = new Date(`${e.target.value}-01`);
          setCurrentDate(newMonth);}}
          className={styles.select}
        >
          <option value="전체">전체 카테고리</option>
          {currentMonthCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className={styles.select}
        >
          <option value="최신순">최신순</option>
          <option value="금액순">금액순</option>
        </select>
      </div>

      {/* 도넛 차트 */}
      <div className={styles.chartContainer}>
        <DonutChart
          data={{
            labels: chartLabels,
            values: chartValues,
            colors: chartColors, 
          }}
        />
      </div>

      {/* 월 선택 및 '자산 현황' 버튼 */}
      <div className={styles.selectAndButtonWrapper}>
        <div className={styles.monthSelectWrapper}>
          <select
            value={selectedMonth}
            onChange={(e) => {
              const newMonth = new Date(`${e.target.value}-01`);
              setCurrentDate(newMonth); }}
          >
            <option value="" className={styles.select}>월 선택</option>
            {allMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button onClick={() => router.push("/MyAssets")} className={styles.backButton}>
            나의 자산 현황
          </button>
        </div>
      </div>

      {/* 선택된 월 내역 */}
      <div className={styles.centerSection}>
        {selectedMonth && (
          <>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
              {selectedMonth} {selectedTab === "income" ? "수입" : "지출"} 내역
            </h3>

            <ul className={styles.listWrapper}>
              {itemsToShow.map((item, idx) => (
                <li key={idx} className={styles.listItem}>
                  <div className={styles.itemTitle}>
                    {item.category} - {item.price.toLocaleString()}원
                  </div>
                  <div className={styles.itemMeta}>
                    {item.date} | {item.memo} | {item.asset}
                  </div>
                </li>
              ))}
            </ul>

            {/* 더보기 / 접기 버튼 */}
            {sorted.length > 3 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
                <button
                  onClick={() =>
                    setExpandedMonth((prev) => ({
                      ...prev,
                      [selectedMonth]: !isExpanded,
                    }))
                  }
                  className={styles.expandButton}
                >
                  {isExpanded ? "접기 ▲" : "더보기 ▼"}
                </button>
              </div>
            )}

            {sorted.length === 0 && <p>해당 월의 내역이 없습니다.</p>}
          </>
        )}
      </div>
    </div>
  );
}
