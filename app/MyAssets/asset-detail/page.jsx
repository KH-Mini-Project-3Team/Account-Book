"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DonutChart from "../components/donutchart";
import styles from "./AssetDetail.module.css";
import { useData } from "@/app/contexts/DataContext";
import chroma from "chroma-js";  // chroma.js 라이브러리 임포트

export default function AssetDetailPage() {
  const router = useRouter();
  const { data } = useData();
  const [selectedTab, setSelectedTab] = useState("income");
  const [filterCategory, setFilterCategory] = useState("전체");
  const [sortType, setSortType] = useState("최신순");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [expandedMonth, setExpandedMonth] = useState({});

  const grouped = data.reduce((acc, item) => {
    const month = item.date.slice(0, 7);
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
  }, {});

  const allMonths = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  useEffect(() => {
    const todayMonth = new Date().toISOString().slice(0, 7);
    setSelectedMonth(todayMonth);
  }, [selectedTab]);

  const currentItems = selectedMonth
    ? (grouped[selectedMonth] || []).filter((item) => item.type === selectedTab)
    : [];

  const currentMonthCategories = [...new Set(currentItems.map((item) => item.category))];

  const filtered = currentItems.filter(
    (item) => filterCategory === "전체" || item.category === filterCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "최신순") return new Date(b.date) - new Date(a.date);
    else return b.price - a.price;
  });

  const isExpanded = expandedMonth[selectedMonth] || false;
  const itemsToShow = isExpanded ? sorted : sorted.slice(0, 3);

  const categoryMap = {};
  (selectedMonth ? currentItems : filtered).forEach((item) => {
    if (!categoryMap[item.category]) categoryMap[item.category] = 0;
    categoryMap[item.category] += item.price;
  });

  const chartLabels = Object.keys(categoryMap);
  const chartValues = Object.values(categoryMap);

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
      <div className={styles.tabWrapper}>
        {["income", "expend"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              setFilterCategory("전체");
            }}
            className={`${styles.tabButton} ${
              selectedTab === tab ? styles.tabSelected : styles.tabUnselected
            }`}
          >
            {tab === "income" ? "수입" : "지출"}
          </button>
        ))}
      </div>

      <div className={styles.filterRow}>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
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

      <div className={styles.chartContainer}>
        <DonutChart
          data={{
            labels: chartLabels,
            values: chartValues,
            colors: chartColors, 
          }}
        />
      </div>

      <div className={styles.selectAndButtonWrapper}>
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

        <div>
          <button onClick={() => router.push("/MyAssets")} className={styles.backButton}>
            나의 자산 현황
          </button>
        </div>
      </div>

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
