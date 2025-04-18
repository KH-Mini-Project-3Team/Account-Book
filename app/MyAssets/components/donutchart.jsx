//chart만들어주는 패키지가 있다고 그래서 그거 참조해서 만들어봤습니다
//npm install react-chartjs-2 chart.js

import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js 필수 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, onColors }) => {
  useEffect(() => {
    // 색상 배열을 부모 컴포넌트로 전달 (한 번만 실행)
    const chartColors = ["#4BC0C0", "#36A2EB", "#FFCE56", "#FF6384"];
    if (onColors) {
      onColors(chartColors);
    }
  }, [onColors]); // onColors가 변경되지 않으면 다시 실행되지 않음

  if (!data || !data.values || !data.labels) {
    return <div>데이터가 없습니다.</div>;
  }

  // 차트 데이터
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["#4BC0C0", "#36A2EB", "#FFCE56", "#FF6384"], // 차트 색상
        borderWidth: 1,
      },
    ],
  };

  // 차트 옵션
  const options = {
    responsive: true, // 반응형 설정
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.raw.toLocaleString() + " 원"; // 원 단위 추가
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1, // 테두리 두께
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DonutChart;
