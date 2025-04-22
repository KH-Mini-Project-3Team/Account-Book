"use client";
import React, { useState } from "react";
import DonutChart from "../components/donutchart";
import { useRouter } from "next/navigation";
import { globalConfig } from "../../config/globalConfig";
import styles from "../MyAssets.module.css";

export default function MyAssetsPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(null);

  // 사용자 정의 색상 상태
  const [customColors, setCustomColors] = useState({});

  // 수입/지출 데이터 그룹화
  const assetMap = globalConfig.reduce((acc, item) => {
    const asset = item.asset;
    if (!acc[asset]) {
      acc[asset] = {
        label: asset,
        incomeTotal: 0,
        expendTotal: 0,
        details: [],
      };
    }

    item.type === "income"
      ? (acc[asset].incomeTotal += item.price)
      : (acc[asset].expendTotal += item.price);

    acc[asset].details.push(item);
    return acc;
  }, {});

  const assetDataArray = Object.values(assetMap).map((item) => ({
    ...item,
    balance: item.incomeTotal - item.expendTotal,
  }));

  // 도넛 차트용 데이터
  const chartData = {
    labels: assetDataArray.map((item) => item.label),
    values: assetDataArray.map((item) => item.balance),
    colors: assetDataArray.map(
      (item) => customColors[item.label] || "#ccc"
    ),
  };

  const totalAssets = chartData.values.reduce((sum, v) => sum + v, 0);
  const formattedTotalAssets = totalAssets.toLocaleString();

  const toggleExpanded = (label) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  const handleColorChange = (label, color) => {
    setCustomColors((prev) => ({
      ...prev,
      [label]: color,
    }));
  };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>📊 나의 자산 현황</h1>
      <h2 className={styles.totalAssets}>총 자산: {formattedTotalAssets} 원</h2>

      <section>
        <div className={styles.chartWrapper}>
          <DonutChart data={chartData} />
        </div>
      </section>

      <section className={styles.assetListSection}>
        {assetDataArray.map((item, index) => (
          <div key={index} className={styles.assetCard}>
            <div className={styles.cardInner}>
              <div className={styles.leftSide}>
                <div
                  className={styles.colorDot}
                  style={{ backgroundColor: chartData.colors[index] }}
                ></div>
                <h3 className={styles.labelText}>{item.label}</h3>
              </div>

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

            {/* 색상 선택기 */}
            <div className={styles.colorPicker}>
              <label>
                색상 선택:
                <input
                  type="color"
                  value={customColors[item.label] || "#ccc"}
                  onChange={(e) =>
                    handleColorChange(item.label, e.target.value)
                  }
                />
              </label>
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
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((detail, i) => (
                      <div key={i} className={styles.detailCard}>
                        <span className={detail.type === "income" ? styles.income : styles.expend}>
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
