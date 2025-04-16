//오늘 일단 페이지에서 레이아웃만 어떻게 구현되는지 확인하는 느낌으로 만들었구 
//css는 따로 styles에 빼서 코드 가독성 좋게할 예정 
//슬라이드 박스 안에 내용이 먼가 부족한 느낌
"use client";
import React, { useState } from "react";
import DonutChart from "./components/donutchart"; // DonutChart 컴포넌트 임포트
import { useRouter } from "next/navigation";

export default function MyAssetsPage() {
  // 일단 자산 데이터를 어떻게 해야할지 생각이 안나서 임의로 데이터를 만들어서 어떻게 구현되는지 알아보기 위해서 만들어 봤습니다
  // 자산 데이터 (계좌/현금, 주식, 용돈, 코인)
  const assetData = {
    labels: ["계좌/현금", "주식", "용돈", "코인"],
    values: [400000, 120000, 80000, 20000],
  };

  const router = useRouter();
  // 페이지 이동 함수
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



  // 여기도 일단 임의 데이터를 집어넣어 만들어봤습니다
  // 계좌/현금 세부 정보 (각 은행의 금액)
  const cashDetails = [
    { bank: "농협", amount: 100000 },
    { bank: "카카오뱅크", amount: 150000 },
    { bank: "토스뱅크", amount: 150000 },
  ];

  // 주식 세부 정보 (각 종목의 금액)
  const stockDetails = [
    { stock: "삼성전자", amount: 50000 },
    { stock: "카카오", amount: 30000 },
    { stock: "네이버", amount: 20000 },
  ];

  // 세부 정보 표시 상태를 토글하는 함수
  const toggleExpanded = (label) => {
    if (expanded === label) {
      setExpanded(null); // 이미 열려있으면 닫음
    } else {
      setExpanded(label); // 열려 있지 않으면 열기
    }
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
          {/* 👇 카테고리 버튼 추가 👇 */}
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
          {assetData.labels.map((label, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                border: "2px solid #ccc",
                padding: "1rem",
                width: "100%", // 모바일에서 적절한 크기로 설정
                maxWidth: "400px", // 최대 너비 제한
                borderRadius: "20px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column", // 세로로 배치
                alignItems: "center",
              }}
            >
              {/* 색상 + 라벨 + 금액 표시 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap", // 모바일에서는 텍스트 줄 바꿈
                }}
              >
                {/* 색상 원, 라벨 및 금액 표시 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textAlign: "left",
                    width: "100%",
                    justifyContent: "space-between", // 버튼과 텍스트가 양 끝으로 배치
                  }}
                >
                  {/* 색상 원 */}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: chartColors[index] || "#ccc", // 차트에서 색상 가져오기
                      borderRadius: "50%",
                    }}
                  ></div>
                  {/* 자산 라벨과 금액 */}
                  <div
                    style={{
                      textAlign: "left",
                      marginRight: "10px",
                      flex: 1, // 텍스트 영역이 남은 공간을 차지하도록
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{label}</h3>
                    <p style={{ margin: "5px 0 0" }}>
                      {assetData.values[index].toLocaleString()} 원
                    </p>
                  </div>

                  {/* 오른쪽: '보기' 버튼 */}
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#36A2EB",
                      color: "#fff",
                      cursor: "pointer",
                      marginTop: "10px",
                      alignSelf: "flex-start", // 오른쪽 정렬
                    }}
                    onClick={() => toggleExpanded(label)} // 클릭 시 슬라이드 열림/닫힘
                  >
                    {expanded === label ? "닫기" : "보기"}
                  </button>
                </div>
              </div>

              {/* 세부 정보 슬라이드 (보기 버튼을 누르면 나타나는 항목들) */}
              <div
                style={{
                  maxHeight: expanded === label ? "500px" : "0", // 슬라이드 효과
                  overflow: "hidden",
                  transition: "max-height 0.3s ease-in-out", // 애니메이션
                  marginTop: "1rem",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  width: "100%",
                }}
              >
                {/* 계좌/현금 항목의 세부 정보 */}
                {label === "계좌/현금" && expanded === "계좌/현금" && (
                  <ul>
                    {cashDetails.map((item, index) => (
                      <li key={index} style={{ textAlign: "left" }}>
                        {item.bank}: {item.amount.toLocaleString()} 원
                      </li>
                    ))}
                  </ul>
                )}

                {/* 주식 항목의 세부 정보 */}
                {label === "주식" && expanded === "주식" && (
                  <ul>
                    {stockDetails.map((item, index) => (
                      <li key={index} style={{ textAlign: "left" }}>
                        {item.stock}: {item.amount.toLocaleString()} 원
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
