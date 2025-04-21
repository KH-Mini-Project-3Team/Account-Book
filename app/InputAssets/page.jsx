"use client";

import React, { useState } from "react";
import styles from "./InputAssets.module.css"; // 사용자 정의 스타일 파일
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // react-datepicker 스타일 파일을 import
import { useData } from "../contexts/DataContext";
import Link from "next/link";
import Image from "next/image";
import backImg from "@/public/images/arrow-left-circle.svg";
import CategoryHeader from './CategoryHeader';

export default function InputAssets() {
  // 활성화된 탭 상태
  const [activeTab, setActiveTab] = useState("지출");
  // 상단 텍스트 상태
  const [headerText, setHeaderText] = useState("지출");
  // 공용 데이터
  const { revenuList, setRevenuList } = useData();
  const { expensesList, setExpensesList } = useData();
  const { assetList, setAssetList } = useData();
  // 분류 버튼 목록
  const [categoryList, setCategoryList] = useState(expensesList);
  // 선택된 분류
  const [selectedCategory, setSelectedCategory] = useState("");
  // 선택된 자산 상태
  const [selectedAsset, setSelectedAsset] = useState("");
  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState(new Date());
  // 금액 필드 값 (실제 수식)
  const [amount, setAmount] = useState("");
  // 계산기 입력값
  const [calculatorInput, setCalculatorInput] = useState("");
  // 내용 필드 값
  const [content, setContent] = useState("");
  // 분류 라벨 상태
  const [categoryLabel, setCategoryLabel] = useState("분류");
  // 분류 수정 URL
  const [categoryURL, setCategoryURL] = useState("/Categories/SetExpend");
  // 자산 라벨 상태
  const [assetLabel, setAssetLabel] = useState("자산");
  // 현재 표시 중인 UI 상태 (초기값: 계산기)
  const [visibleUI, setVisibleUI] = useState("calculator");

  // 계산기 로직
  const formatCurrencyWithExpression = (value) => {
    // 값이 없으면 빈 문자열 반환
    if (!value) return "";
    // 숫자에 ',' 추가 및 '원' 붙이기
    return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "원";
  };

  const handleCalculatorClick = (value) => {
    if (value === "=" || value === "확인") {
      calculateResult();
    } else if (value === "C") {
      // 입력 초기화
      setCalculatorInput("");
      // 금액 필드도 초기화
      setAmount("");
    } else {
      // 기존 입력값에 새 값을 추가
      const updatedInput = calculatorInput + value;
      // 계산기 입력값 업데이트
      setCalculatorInput(updatedInput);
      // 금액 필드에도 실시간 반영
      setAmount(updatedInput);
    }
  };

  const calculateResult = () => {
    try {
      // 수식을 안전하게 변환 (x -> *, ÷ -> /)
      const sanitizedInput = calculatorInput
        .replace(/x/g, "*")
        .replace(/÷/g, "/");
      // 수식 계산
      const result = eval(sanitizedInput);
      // 결과를 숫자로 저장
      setAmount(result.toString());
      // 계산기 입력 초기화 후 결과 유지
      setCalculatorInput(result.toString());
      // UI 숨김
      setVisibleUI("");
    } catch (error) {
      alert("잘못된 수식입니다.");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setHeaderText(tab);

    if (tab === "수입") {
      // setCategoryList(["테스트", "금융소득", "월급"]);
      setCategoryList(revenuList);
      setCategoryLabel("분류");
      setCategoryURL("/Categories/SetRevenu");
      setAssetLabel("자산");
    } else if (tab === "지출") {
      setCategoryList(expensesList);
      setCategoryLabel("분류");
      setCategoryURL("/Categories/SetExpend");
      setAssetLabel("자산");
    } else if (tab === "이체") {
      setCategoryList(assetList);
      setCategoryLabel("출금");
      setCategoryURL("/Categories/SetAssets");
      setAssetLabel("입금");
    }

    resetInputs(); // 날짜를 제외한 모든 값 초기화
  };

  const resetInputs = () => {
    setSelectedCategory(""); // 분류 초기화
    setSelectedAsset(""); // 자산 초기화
    setAmount(""); // 금액 초기화
    setCalculatorInput(""); // 계산기 입력값 초기화
    setContent(""); // 내용 초기화 추가
    resetUI(); // UI 숨김 처리
  };

  const resetUI = () => {
    setVisibleUI(""); // 모든 UI 숨김
  };

  const handleCategoryClick = () => {
    resetUI();
    setVisibleUI("category");
  };

  const selectCategory = (category) => {
    setSelectedCategory(category); // 선택된 분류를 업데이트
    resetUI(); // UI를 초기화하여 숨김 처리
  };

  const handleAssetClick = () => {
    resetUI();
    setVisibleUI("asset");
  };

  const selectAsset = (asset) => {
    setSelectedAsset(asset); // 선택된 자산을 업데이트
    resetUI(); // UI를 초기화하여 숨김 처리
  };

  const handleAmountClick = () => {
    resetUI();
    setAmount(""); // 금액 필드 값 초기화
    setCalculatorInput(""); // 계산기 입력값 초기화
    setVisibleUI("calculator"); // 계산기 UI 표시
  };

  const handleDateClick = () => {
    resetUI();
    setVisibleUI("datePicker");
  };

  const handleContentChange = (event) => {
    setContent(event.target.value); // 내용 필드 업데이트
  };

  const handleAmountChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9+\-*/x÷]/g, ""); // 숫자와 연산자만 허용
    if (
      !isNaN(inputValue[inputValue.length - 1]) ||
      /[+\-*/x÷]/.test(inputValue[inputValue.length - 1])
    ) {
      setAmount(inputValue); // 실제 값은 수식으로 저장
      setCalculatorInput(inputValue); // 계산기 입력값도 업데이트
    }
  };

  const handleKeyPressOnAmountField = (event) => {
    if (event.key === "Enter") {
      calculateResult(); // 엔터를 누르면 계산 수행
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span>
          {" "}
          <Link href="/InputAssets">
            <Image src={backImg} alt="arrow" width={30} height={30} />
          </Link>
        </span>
        <span>{headerText}</span>
        <span>별표</span>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {["수입", "지출", "이체"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? styles.active : ""}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Inline Form Section */}
      <div className={styles["form-inline"]}>
        <div>
          <span>날짜</span>
          <input
            type="text"
            value={selectedDate.toLocaleDateString()}
            readOnly
            onClick={handleDateClick}
          />
        </div>
        <div>
          <span>금액</span>
          <input
            type="text"
            value={amount ? formatCurrencyWithExpression(amount) : ""}
            onChange={handleAmountChange}
            onKeyDown={handleKeyPressOnAmountField}
            onClick={handleAmountClick}
          />
        </div>
        <div>
          <span>{categoryLabel}</span>
          <input
            type="text"
            value={selectedCategory}
            readOnly
            onClick={handleCategoryClick}
          />
        </div>
        <div>
          <span>{assetLabel}</span>
          <input
            type="text"
            value={selectedAsset}
            readOnly
            onClick={handleAssetClick}
          />
        </div>
        <div>
          <span>내용</span>
          <input type="text" value={content} onChange={handleContentChange} />
        </div>
        <div>
          <button className={styles["store-btn"]}>저장</button>
        </div>
      </div>

      {/* Conditional Components */}
      {visibleUI === "datePicker" && (
        <div>
          {/* 달력 UI */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              resetUI();
            }}
            inline
          />
        </div>
      )}

      {visibleUI === "category" && (
        <div>
          <div>
            <CategoryHeader
              categoryLabel={categoryLabel}
              categoryURL={categoryURL}
              onClose={() => {
                setVisibleUI("");
              }}
            />
            {/* <Link href={categoryURL}>{categoryLabel} 추가</Link> */}
          </div>
          <div className={styles["category-buttons"]}>
            {categoryList.map((category) => (
              <button key={category} onClick={() => selectCategory(category)}>
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {visibleUI === "asset" && (
        <div>
          <div>
            <Link href="/Categories/SetAssets">추가</Link>
          </div>
          <div className={styles["category-buttons"]}>
            {assetList.map((asset) => (
              <button key={asset} onClick={() => selectAsset(asset)}>
                {asset}
              </button>
            ))}
          </div>
        </div>
      )}

      {(visibleUI === "" || visibleUI === "calculator") && (
        <div className={styles.calculator}>
          {/* 계산기 UI */}
          <div className={styles["calculator-grid"]}>
            {[
              "+",
              "-",
              "x",
              "÷",
              "7",
              "8",
              "9",
              "=",
              "4",
              "5",
              "6",
              ".",
              "1",
              "2",
              "3",
              "C",
              "00",
              "0",
              "000",
              "확인",
            ].map((item) => (
              <button key={item} onClick={() => handleCalculatorClick(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
