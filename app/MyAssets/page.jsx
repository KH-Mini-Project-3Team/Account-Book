// 오늘 일단 페이지에서 레이아웃만 어떻게 구현되는지 확인하는 느낌으로 만들었구
// css는 따로 styles에 빼서 코드 가독성 좋게할 예정
// 슬라이드 박스 안에 내용이 먼가 부족한 느낌

"use client";
import React, { useState } from "react";
import DonutChart from "./components/donutchart"; // DonutChart 컴포넌트 임포트
import { useRouter } from "next/navigation";
import { globalConfig } from "../config/globalConfig"; // 글로벌 자산 데이터 임포트

export default function MyAssetsPage() {
  // globalConfig에서 가져온 용돈 데이터
  const allowanceTotal = globalConfig
    .filter((item) => item.type === "income" && item.category === "용돈")
    .reduce((sum, item) => sum + item.price, 0);

  // 💡 자산 데이터 구성 (기존과 동일하되, 용돈은 dynamic하게 설정)
  const assetData = {
    labels: ["계좌/현금", "주식", "용돈", "코인"],
    values: [400000, 120000, allowanceTotal, 20000],
  };

  // 페이지 이동 함수
  const router = useRouter();
    const goToAssetDetail = () => {
      router.push("/MyAssets/asset-detail");
    };

  // 총 자산 계산 (모든 자산 항목의 합)
  const totalAssets = assetData.values.reduce((acc, value) => acc + value, 0);
  const formattedTotalAssets = totalAssets.toLocaleString(); // 3자리마다 쉼표 추가

  // 차트 색상 상태 (DonutChart에서 사용하는 색상)
  const [chartColors, setChartColors] = useState([]);

  // 세부 정보 표시 상태 (슬라이드 열림 여부)
  const [expanded, setExpanded] = useState(null); // null = 아무것도 열려 있지 않음

  // 계좌/현금 세부 정보 (각 은행의 금액) - 임의 데이터
  const cashDetails = [
    { bank: "농협", amount: 100000 },
    { bank: "카카오뱅크", amount: 150000 },
    { bank: "토스뱅크", amount: 150000 },
  ];

  // 주식 세부 정보 (각 종목의 금액) - 임의 데이터
  const stockDetails = [
    { stock: "삼성전자", amount: 50000 },
    { stock: "카카오", amount: 30000 },
    { stock: "네이버", amount: 20000 },
  ];

  // 슬라이드 토글 함수
  const toggleExpanded = (label) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

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
      <main
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1>📊 나의 자산 현황</h1> {/* 자산 현황 제목 */}
        <h2>총 자산: {formattedTotalAssets} 원</h2> {/* 총 자산 금액 표시 */}

        {/* 자산 차트 섹션 */}
        <section>
          <div style={{ maxWidth: 300, maxHeight: 300, margin: "20px auto" }}>
            {/* DonutChart 컴포넌트를 이용해 차트 그리기 */}
            <DonutChart data={assetData} onColors={setChartColors} />
          </div>
        </section>

        {/* 자산 항목 리스트 */}
        <section
          style={{
            marginTop: "2rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* 수입/지출 페이지 이동 버튼 */}
          <button
            onClick={goToAssetDetail}
            style={{
              marginTop: "1rem",
              marginBottom: "2rem",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#FF6384",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            수입 / 지출
          </button>

          {/* 각 자산 항목 표시 */}
          {assetData.labels.map((label, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                border: "2px solid #ccc",
                padding: "1rem",
                width: "100%",
                maxWidth: "400px",
                borderRadius: "20px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* 색상 원 + 라벨 + 금액 + 보기 버튼 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
               <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textAlign: "left",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
              >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: chartColors[index] || "#ccc",
                      borderRadius: "50%",
                    }}
                  ></div>
                 <div
                    style={{
                      textAlign: "left",
                      marginRight: "10px",
                      flex: 1,
                    }}
                 >
                    <h3 style={{ margin: 0 }}>{label}</h3>
                    <p style={{ margin: "5px 0 0" }}>
                      {assetData.values[index].toLocaleString()} 원
                    </p>
                  </div>

                  {/* 슬라이드 열기 버튼 */}
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#36A2EB",
                      color: "#fff",
                      cursor: "pointer",
                      marginTop: "10px",
                      alignSelf: "flex-start",
                    }}
                    onClick={() => toggleExpanded(label)}
                  >
                    {expanded === label ? "닫기" : "보기"}
                  </button>
                </div>
              </div>

              {/* 슬라이드 세부 내용 표시 영역 */}
              <div
                style={{
                  maxHeight: expanded === label ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease-in-out",
                  marginTop: "1rem",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  width: "100%",
                }}
              >
                {/* 각 카테고리별 세부 내용 렌더링 */}
                {label === "계좌/현금" && expanded === "계좌/현금" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {cashDetails.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: "#fdfdfd",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                          border: "1px solid #eee",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{item.bank}</span>
                        <span>{item.amount.toLocaleString()} 원</span>
                      </div>
                    ))}
                  </div>
                )}

              {label === "주식" && expanded === "주식" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {stockDetails.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: "#fdfdfd",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                          border: "1px solid #eee",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{item.stock}</span>
                        <span>{item.amount.toLocaleString()} 원</span>
                      </div>
                    ))}
                  </div>
              )}

                {label === "용돈" && expanded === "용돈" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {globalConfig
                      .filter((item) => item.type === "income" && item.category === "용돈")
                      .map((item, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: "#fdfdfd",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                            border: "1px solid #eee",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
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
    </div>
  );
}