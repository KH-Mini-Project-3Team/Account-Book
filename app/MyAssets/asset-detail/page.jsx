"use client"; // Next.js에서 클라이언트 컴포넌트로 동작하도록 설정

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { globalConfig } from "../../config/globalConfig"; // 전체 수입/지출 내역 데이터
import DonutChart from "../components/donutchart"; // 도넛 차트 컴포넌트

export default function AssetDetailPage() {
  const router = useRouter();

  // 선택된 탭: 수입(income) 또는 지출(expend)
  const [selectedTab, setSelectedTab] = useState("income");

  // 선택된 카테고리 필터 (예: 식비, 교통비 등)
  const [filterCategory, setFilterCategory] = useState("전체");

  // 정렬 방식: 최신순 또는 금액순
  const [sortType, setSortType] = useState("최신순");

  // 선택된 월 (예: 2025-04)
  const [selectedMonth, setSelectedMonth] = useState("");

  // 월별로 더보기 버튼 클릭 여부 저장
  const [expandedMonth, setExpandedMonth] = useState({});

  // 선택된 탭과 카테고리에 따라 필터링된 데이터
  const filtered = globalConfig
    .filter((item) => item.type === selectedTab)
    .filter((item) => filterCategory === "전체" || item.category === filterCategory);

  // 선택된 정렬 방식에 따라 정렬
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "최신순") return new Date(b.date) - new Date(a.date);
    else return b.price - a.price;
  });

  // 데이터를 월별로 그룹화 (예: {"2025-04": [...], "2025-03": [...]})
  const grouped = sorted.reduce((acc, item) => {
    const month = item.date.slice(0, 7);
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
  }, {});

  // 월 리스트를 최신순으로 정렬
  const allMonths = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  // 탭이 바뀔 때 현재 월 자동 설정
  useEffect(() => {
    const todayMonth = new Date().toISOString().slice(0, 7);
    setSelectedMonth(todayMonth);
  }, [selectedTab]);

  // 선택된 월의 항목 리스트
  const currentItems = selectedMonth ? grouped[selectedMonth] || [] : [];

  // 해당 월에 대해 확장 여부 확인
  const isExpanded = expandedMonth[selectedMonth] || false;

  // 확장 여부에 따라 보여줄 리스트 개수 결정
  const itemsToShow = isExpanded ? currentItems : currentItems.slice(0, 3);

  // 도넛 차트용 카테고리별 금액 계산
  const categoryMap = {};
  (selectedMonth ? currentItems : filtered).forEach((item) => {
    if (!categoryMap[item.category]) categoryMap[item.category] = 0;
    categoryMap[item.category] += item.price;
  });

  // 도넛 차트에 전달할 라벨, 값, 색상
  const chartLabels = Object.keys(categoryMap);
  const chartValues = Object.values(categoryMap);

  // 수입/지출에 따라 도넛 차트 색상 설정
  const incomeColors = ["#34D399", "#10B981", "#6EE7B7", "#A7F3D0"];
  const expenseColors = ["#F87171", "#EF4444", "#FCA5A5", "#FECACA"];
  const chartColors =
    selectedTab === "income"
      ? incomeColors.slice(0, chartLabels.length)
      : expenseColors.slice(0, chartLabels.length);

  return (
    <div
      style={{
        backgroundColor: "#F8DCD7",
        minHeight: "100vh",
        maxWidth: "390px",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      {/* 돌아가기 버튼 */}
      <button
        onClick={() => router.push("/MyAssets")}
        style={{
          background: "none",
          border: "none",
          color: "#333",
          fontSize: "1rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        ← 자산 페이지로 돌아가기
      </button>

      {/* 탭: 수입 / 지출 */}
      <div style={{ display: "flex", backgroundColor: "#fff", borderRadius: "8px", marginBottom: "1rem" }}>
        {["income", "expend"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              setFilterCategory("전체");
            }}
            style={{
              flex: 1,
              padding: "0.5rem",
              backgroundColor: selectedTab === tab ? "#fff" : "#eee",
              fontWeight: selectedTab === tab ? "bold" : "normal",
              border: "none",
              cursor: "pointer",
            }}
          >
            {tab === "income" ? "수입" : "지출"}
          </button>
        ))}
      </div>

      {/* 필터: 카테고리 + 정렬 */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ flex: 1 }}>
          <option value="전체">전체 카테고리</option>
          {[...new Set(filtered.map((item) => item.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ flex: 1 }}>
          <option value="최신순">최신순</option>
          <option value="금액순">금액순</option>
        </select>
      </div>

      {/* 도넛 차트 컴포넌트 */}
      <DonutChart data={{ labels: chartLabels, values: chartValues, colors: chartColors }} />

      {/* 월 선택 셀렉트박스 */}
      <div style={{ margin: "1rem 0" }}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", borderRadius: "8px" }}
        >
          <option value="">월 선택</option>
          {allMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* 선택된 월의 상세 내역 리스트 */}
      <div>
        {selectedMonth && (
          <>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              {selectedMonth} {selectedTab === "income" ? "수입" : "지출"} 내역
            </h3>

            {/* 리스트 출력 */}
            <ul style={{ listStyle: "none", padding: 0 }}>
              {itemsToShow.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "1rem",
                    marginBottom: "0.8rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>
                    {item.category} - {item.price.toLocaleString()}원
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    {item.date} | {item.memo} | {item.asset}
                  </div>
                </li>
              ))}
            </ul>

            {/* 더보기 / 접기 버튼 */}
            {currentItems.length > 3 && (
              <button
                onClick={() =>
                  setExpandedMonth((prev) => ({ ...prev, [selectedMonth]: !isExpanded }))
                }
                style={{
                  background: "none",
                  border: "none",
                  color: "#333",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "block",
                  margin: "0 auto",
                }}
              >
                {isExpanded ? "접기 ▲" : "더보기 ▼"}
              </button>
            )}

            {/* 내역이 없을 경우 표시 */}
            {currentItems.length === 0 && <p>해당 월의 내역이 없습니다.</p>}
          </>
        )}
      </div>
    </div>
  );
}
