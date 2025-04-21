"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { globalConfig } from "../../config/globalConfig"; // 전체 수입/지출 데이터
import DonutChart from "../components/donutchart"; // 도넛 차트 컴포넌트
import styles from "./AssetDetail.module.css"; // 스타일 모듈 불러오기

export default function AssetDetailPage() {
  const router = useRouter();

  // ▶ 상태 설정
  const [selectedTab, setSelectedTab] = useState("income"); // 현재 탭 (수입 / 지출)
  const [filterCategory, setFilterCategory] = useState("전체"); // 선택된 카테고리 필터
  const [sortType, setSortType] = useState("최신순"); // 정렬 방식
  const [selectedMonth, setSelectedMonth] = useState(""); // 선택된 월
  const [expandedMonth, setExpandedMonth] = useState({}); // 월별 더보기 여부

  // ▶ 데이터 필터링 및 정렬
  const filtered = globalConfig
    .filter((item) => item.type === selectedTab)
    .filter((item) => filterCategory === "전체" || item.category === filterCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "최신순") return new Date(b.date) - new Date(a.date);
    else return b.price - a.price;
  });

  // ▶ 데이터 월별로 그룹화
  const grouped = sorted.reduce((acc, item) => {
    const month = item.date.slice(0, 7); // YYYY-MM 형식
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
  }, {});

  // ▶ 월 리스트 생성 (최신순)
  const allMonths = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  // ▶ 탭이 바뀔 때 현재 월 자동 선택
  useEffect(() => {
    const todayMonth = new Date().toISOString().slice(0, 7);
    setSelectedMonth(todayMonth);
  }, [selectedTab]);

  // ▶ 현재 선택된 월의 데이터
  const currentItems = selectedMonth ? grouped[selectedMonth] || [] : [];
  const isExpanded = expandedMonth[selectedMonth] || false;
  const itemsToShow = isExpanded ? currentItems : currentItems.slice(0, 3);

  // ▶ 카테고리별 총액 집계 (도넛 차트용)
  const categoryMap = {};
  (selectedMonth ? currentItems : filtered).forEach((item) => {
    if (!categoryMap[item.category]) categoryMap[item.category] = 0;
    categoryMap[item.category] += item.price;
  });

  const chartLabels = Object.keys(categoryMap);
  const chartValues = Object.values(categoryMap);

  // ▶ 수입/지출에 따른 차트 색상 설정
  const incomeColors = ["#34D399", "#10B981", "#6EE7B7", "#A7F3D0"];
  const expenseColors = ["#F87171", "#EF4444", "#FCA5A5", "#FECACA"];
  const chartColors =
    selectedTab === "income"
      ? incomeColors.slice(0, chartLabels.length)
      : expenseColors.slice(0, chartLabels.length);

  return (
    <div className={styles.container}>
      {/* 수입 / 지출 탭 */}
      <div className={styles.tabWrapper}>
        {["income", "expend"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab); // 탭 클릭 시 변경
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

      {/* 카테고리 필터 + 정렬 선택 */}
      <div className={styles.filterRow}>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.select}
        >
          <option value="전체">전체 카테고리</option>
          {[...new Set(filtered.map((item) => item.category))].map((cat) => (
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
        <DonutChart data={{ labels: chartLabels, values: chartValues, colors: chartColors }} />
      </div>

      {/* 월 선택 드롭다운 */}
      <div className={styles.monthSelectWrapper}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={styles.select}
        >
          <option value="">월 선택</option>
          {allMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      {/*자산 페이지 버튼 */}
      <div>
        <button onClick={() => router.push("/MyAssets")} className={styles.backButton}>
          나의 자산 현황
        </button>
      </div>

      {/* 선택된 월의 내역 리스트 */}
      <div>
        {selectedMonth && (
          <>
            {/* 현재 월 + 탭명 표시 */}
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              {selectedMonth} {selectedTab === "income" ? "수입" : "지출"} 내역
            </h3>

            {/* 항목 리스트 */}
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
            {currentItems.length > 3 && (
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
            )}

            {/* 항목이 없는 경우 */}
            {currentItems.length === 0 && <p>해당 월의 내역이 없습니다.</p>}
          </>
        )}
      </div>
    </div>
  );
}
