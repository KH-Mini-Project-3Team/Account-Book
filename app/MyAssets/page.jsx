"use client";
import React, { useState } from "react";
import DonutChart from "./components/donutchart";
import { useRouter } from "next/navigation";
import { globalConfig } from "../config/globalConfig";
import styles from "./MyAssets.module.css"; // 💡 CSS 모듈 임포트

export default function MyAssetsPage() {
  const allowanceTotal = globalConfig
    .filter((item) => item.type === "income" && item.category === "용돈")
    .reduce((sum, item) => sum + item.price, 0);

  const assetData = {
    labels: ["계좌/현금", "주식", "용돈", "코인"],
    values: [400000, 120000, allowanceTotal, 20000],
  };

  const router = useRouter();
  const goToAssetDetail = () => {
    router.push("/MyAssets/asset-detail");
  };

  const totalAssets = assetData.values.reduce((acc, value) => acc + value, 0);
  const formattedTotalAssets = totalAssets.toLocaleString();

  const [chartColors, setChartColors] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const cashDetails = [
    { bank: "농협", amount: 100000 },
    { bank: "카카오뱅크", amount: 150000 },
    { bank: "토스뱅크", amount: 150000 },
  ];

  const stockDetails = [
    { stock: "삼성전자", amount: 50000 },
    { stock: "카카오", amount: 30000 },
    { stock: "네이버", amount: 20000 },
  ];

  const toggleExpanded = (label) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>📊 나의 자산 현황</h1>
      <h2 className={styles.totalAssets}>총 자산: {formattedTotalAssets} 원</h2>

      <section>
        <div className={styles.chartWrapper}>
          <DonutChart data={assetData} onColors={setChartColors} />
        </div>
      </section>

      <section className={styles.assetListSection}>
        <button className={styles.detailButton} onClick={goToAssetDetail}>
          수입 / 지출
        </button>

        {assetData.labels.map((label, index) => (
          <div key={index} className={styles.assetCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardInner}>
                <div
                  className={styles.colorDot}
                  style={{ backgroundColor: chartColors[index] || "#ccc" }}
                ></div>

                <div className={styles.labelBox}>
                  <h3>{label}</h3>
                  <p>{assetData.values[index].toLocaleString()} 원</p>
                </div>

                <button
                  className={styles.toggleButton}
                  onClick={() => toggleExpanded(label)}
                >
                  {expanded === label ? "닫기" : "보기"}
                </button>
              </div>
            </div>

            <div
              className={`${styles.slideContent} ${expanded === label ? styles.slideContentExpanded : ""}`}
            >
              {label === "계좌/현금" && expanded === "계좌/현금" && (
                <div className={styles.detailList}>
                  {cashDetails.map((item, index) => (
                    <div key={index} className={styles.detailCard}>
                      <span>{item.bank}</span>
                      <span>{item.amount.toLocaleString()} 원</span>
                    </div>
                  ))}
                </div>
              )}

              {label === "주식" && expanded === "주식" && (
                <div className={styles.detailList}>
                  {stockDetails.map((item, index) => (
                    <div key={index} className={styles.detailCard}>
                      <span>{item.stock}</span>
                      <span>{item.amount.toLocaleString()} 원</span>
                    </div>
                  ))}
                </div>
              )}

              {label === "용돈" && expanded === "용돈" && (
                <div className={styles.detailList}>
                  {globalConfig
                    .filter((item) => item.type === "income" && item.category === "용돈")
                    .map((item, index) => (
                      <div key={index} className={styles.detailCard}>
                        <span>{item.memo}</span>
                        <span>{item.price.toLocaleString()} 원</span>
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
