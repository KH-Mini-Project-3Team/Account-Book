"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DonutChart from "../components/donutchart";
import styles from "./AssetDetail.module.css";
import { useData } from "@/app/contexts/DataContext";
import { useMonth } from "@/app/contexts/MonthContext";
import chroma from "chroma-js";

export default function AssetDetailPage() {
  const { currentDate, setCurrentDate } = useMonth();
  const selectedMonth = currentDate.toISOString().slice(0, 7);

  const router = useRouter();
  const { data } = useData();

  const [selectedTab, setSelectedTab] = useState("income");
  const [filterCategory, setFilterCategory] = useState("전체");
  const [sortType, setSortType] = useState("최신순");
  const [expandedMonth, setExpandedMonth] = useState({});

  const grouped = data.reduce((acc, item) => {
    const month = item.date.slice(0, 7);
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
  }, {});

  const allMonths = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  const currentItems = selectedMonth
    ? grouped[selectedMonth]?.filter((item) => item.type === selectedTab) || []
    : [];

  const filtered = currentItems.filter(
    (item) => filterCategory === "전체" || item.category === filterCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "최신순") return new Date(b.date) - new Date(a.date);
    return b.price - a.price;
  });

  const isExpanded = expandedMonth[selectedMonth] || false;
  const itemsToShow = isExpanded ? sorted : sorted.slice(0, 3);

  const currentCategories = [...new Set(currentItems.map((item) => item.category))];

  const categoryMap = {};
  filtered.forEach((item) => {
    if (!categoryMap[item.category]) categoryMap[item.category] = 0;
    categoryMap[item.category] += item.price;
  });

  const chartLabels = Object.keys(categoryMap);
  const chartValues = Object.values(categoryMap);

  const generateColors = (numColors) =>
    chroma.scale(['#34D399', '#10B981', '#6EE7B7', '#A7F3D0'])
      .mode('lab')
      .colors(numColors);

  const chartColors = generateColors(chartLabels.length);

  const TAB_LABELS = {
    income: "수입",
    expend: "지출",
  };

  return (
    <div className={styles.container}>
      {/* 수입 / 지출 탭 */}
      <div className={styles.tabWrapper}>
        {["income", "expend"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setSelectedTab(tab);
              setFilterCategory("전체");
            }}
            className={`${styles.tabButton} ${
              selectedTab === tab ? styles.tabSelected : styles.tabUnselected
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* 카테고리 & 정렬 필터 */}
      <div className={styles.filterRow}>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.select}
        >
          <option value="전체">전체 카테고리</option>
          {currentCategories.map((cat) => (
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

      {/* 월 선택 + 돌아가기 버튼 */}
      <div className={styles.selectAndButtonWrapper}>
        <div className={styles.monthSelectWrapper}>
          <select
            className={styles.select}
            value={selectedMonth}
            onChange={(e) => {
              const newMonth = new Date(`${e.target.value}-01`);
              setCurrentDate(newMonth);
            }}
          >
            <option value="" >월 선택</option>
            {allMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.buttonBox}>
          <button
            type="button"
            onClick={() => router.push("/MyAssets")}
            className={styles.backButton}
          >
            나의 자산 현황
          </button>
        </div>
      </div>

      {/* 선택된 월 내역 */}
      <div className={styles.centerSection}>
        {selectedMonth && (
          <>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
              {selectedMonth} {TAB_LABELS[selectedTab]} 내역
            </h3>

            {sorted.length > 0 ? (
              <>
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
                      type="button"
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
              </>
            ) : (
              <p style={{ textAlign: "center", marginTop: "1rem", color: "#666" }}>
                📭 해당 월의 {TAB_LABELS[selectedTab]} 내역이 없습니다.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
