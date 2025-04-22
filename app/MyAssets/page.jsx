"use client";
import React, { useState } from "react";
import DonutChart from "./components/donutchart";
import { useRouter } from "next/navigation";
import styles from "./MyAssets.module.css";
import { useData } from "../contexts/DataContext";

export default function MyAssetsPage() {
  const { data } = useData();
  const router = useRouter();
  const [chartColors, setChartColors] = useState([]);
  const [expanded, setExpanded] = useState(null);

  

  // ✅ 자산별 수입/지출 합산 및 내역 그룹화
  const assetMap = data.reduce((acc, item) => {
    const asset = item.asset;

    if (!acc[asset]) {
      acc[asset] = {
        label: asset,
        incomeTotal: 0,
        expendTotal: 0,
        details: [],
      };
    }

    if (item.type === "income") {
      acc[asset].incomeTotal += item.price;
    } else if (item.type === "expend") {
      acc[asset].expendTotal += item.price;
    }

    acc[asset].details.push(item);
    return acc;
  }, {});

  // ✅ assetMap을 배열로 변환 + 잔액 계산
  const assetDataArray = Object.values(assetMap).map((asset) => ({
    ...asset,
    balance: asset.incomeTotal - asset.expendTotal,
  }));

  // ✅ 도넛 차트용 데이터 (잔액 기준)
  const chartData = {
    labels: assetDataArray.map((item) => item.label),
    values: assetDataArray.map((item) => item.balance),
  };

  // ✅ 총 자산 계산
  const totalAssets = chartData.values.reduce((sum, v) => sum + v, 0);
  const formattedTotalAssets = totalAssets.toLocaleString();

  // ✅ 상세 페이지 이동
  const goToAssetDetail = () => {
    router.push("/MyAssets/asset-detail");
  };

  // ✅ 펼침 토글 함수
  const toggleExpanded = (label) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <main className={styles.mainContainer}>
      {/* 타이틀 영역 */}
      <h1 className={styles.title}>📊 나의 자산 현황</h1>
      <h2 className={styles.totalAssets}>총 자산: {formattedTotalAssets} 원</h2>

      {/* 도넛 차트 */}
      <section>
        <div className={styles.chartWrapper}>
          <DonutChart data={chartData} onColors={setChartColors} />
        </div>
      </section>

      {/* 자산별 리스트 */}
      <section className={styles.assetListSection}>
        <button className={styles.detailButton} onClick={goToAssetDetail}>
          수입 / 지출
        </button>

        {assetDataArray.map((item, index) => (
          <div key={index} className={styles.assetCard}>
            <div className={styles.cardInner}>
              {/* 좌측: 자산명 + 색상 */}
              <div className={styles.leftSide}>
                <div
                  className={styles.colorDot}
                  style={{ backgroundColor: chartColors[index] || "#ccc" }}
                ></div>
                <h3 className={styles.labelText}>{item.label}</h3>
              </div>

              {/* 우측: 잔액 + 버튼 */}
              <div className={styles.rightSide}>
                <p className={styles.labelText}>
                  {item.balance.toLocaleString()} 원
                </p>
                <button
                  className={styles.toggleButton}
                  onClick={() => toggleExpanded(item.label)}
                >
                  {expanded === item.label ? "닫기" : "보기"}
                </button>
              </div>
            </div>

            {/* 상세 내역 */}
            <div
              className={`${styles.slideContent} ${
                expanded === item.label ? styles.slideContentExpanded : ""
              }`}
            >
              {expanded === item.label && (
                <div className={styles.detailList}>
                  {item.details
                    .slice() // 원본 배열 손상 방지
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // ✅ 최신순 정렬
                    .map((detail, i) => (
                      <div key={i} className={styles.detailCard}>
                        <span
                          className={
                            detail.type === "income"
                              ? styles.income
                              : styles.expend
                          }
                        >
                          [{detail.type === "income" ? "수입" : "지출"}]
                        </span>
                        <span>{detail.memo}</span>
                        <span>{detail.date}</span>
                        <span>{detail.price.toLocaleString()} 원</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
