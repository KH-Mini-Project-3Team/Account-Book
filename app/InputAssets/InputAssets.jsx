"use client";

import React, { useState, useEffect } from "react";
import styles from "./InputAssets.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useData } from "../contexts/DataContext";
import Link from "next/link";
import Image from "next/image";
import backImg from "@/public/images/arrow-left-circle.svg";
import CategoryHeader from "./CategoryHeader";
import { useRouter, useSearchParams } from "next/navigation";

// 날짜를 yyyy-mm-dd 형식으로 변환하는 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0~11이므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function InputAssets() {
  // Next.js 라우터 및 쿼리 파라미터(id)
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");


  
  // Context Data
  const {
    data,
    updateItem,
    deleteItem,
    insertItem,
    revenuList,
    expensesList,
    assetList,
  } = useData();

  
  // id가 있으면 해당 요소 찾기
  const initialData = id ? data.find((item) => item.id === Number(id)) : null;

  // 상태 정의
  const [activeTab, setActiveTab] = useState(
    initialData
      ? initialData.type === "income"
        ? "수입"
        : initialData.type === "expend"
        ? "지출"
        : "이체"
      : "지출"
  );
  const [headerText, setHeaderText] = useState(
    initialData
      ? initialData.type === "income"
        ? "수입"
        : initialData.type === "expend"
        ? "지출"
        : "이체"
      : "지출"
  );
  const [categoryList, setCategoryList] = useState(
    initialData
      ? initialData.type === "income"
        ? revenuList
        : initialData.type === "expend"
        ? expensesList
        : assetList
      : expensesList
  );
  const [categoryLabel, setCategoryLabel] = useState(
    activeTab === "이체" ? "출금" : "분류"
  );
  const [categoryURL, setCategoryURL] = useState(
    activeTab === "수입"
      ? "/Categories/SetRevenu"
      : activeTab === "지출"
      ? "/Categories/SetExpend"
      : "/Categories/SetAssets"
  );
  const [assetLabel, setAssetLabel] = useState(
    activeTab === "이체" ? "입금" : "자산"
  );
  const [assetURL, setAssetURL] = useState("/Categories/SetAssets");
  const [selectedCategory, setSelectedCategory] = useState(
    initialData ? initialData.category : ""
  );
  const [selectedAsset, setSelectedAsset] = useState(
    initialData ? initialData.asset : ""
  );
  const [selectedDate, setSelectedDate] = useState(
    initialData ? new Date(initialData.date) : new Date()
  );
  const [amount, setAmount] = useState(
    initialData ? initialData.price.toString() : ""
  );
  const [calculatorInput, setCalculatorInput] = useState(
    initialData ? initialData.price.toString() : ""
  );
  const [content, setContent] = useState(initialData ? initialData.memo : "");
  const [visibleUI, setVisibleUI] = useState("calculator");

  // initialData나 id가 바뀔 때 상태 초기화
  useEffect(() => {
    if (initialData) {
      setSelectedDate(new Date(initialData.date));
      setAmount(initialData.price.toString());
      setCalculatorInput(initialData.price.toString());
      setSelectedCategory(initialData.category);
      setSelectedAsset(initialData.asset);
      setContent(initialData.memo);
      if (initialData.type === "income") {
        setActiveTab("수입");
        setHeaderText("수입");
        setCategoryList(revenuList);
        setCategoryLabel("분류");
        setCategoryURL("/Categories/SetRevenu");
        setAssetLabel("자산");
      } else if (initialData.type === "expend") {
        setActiveTab("지출");
        setHeaderText("지출");
        setCategoryList(expensesList);
        setCategoryLabel("분류");
        setCategoryURL("/Categories/SetExpend");
        setAssetLabel("자산");
      } else {
        // 이체
        setActiveTab("이체");
        setHeaderText("이체");
        setCategoryList(assetList);
        setCategoryLabel("출금");
        setCategoryURL("/Categories/SetAssets");
        setAssetLabel("입금");
      }
    } else {
      setSelectedDate(new Date());
      setAmount("");
      setCalculatorInput("");
      setSelectedCategory("");
      setSelectedAsset("");
      setContent("");
      setActiveTab("지출");
      setHeaderText("지출");
      setCategoryList(expensesList);
      setCategoryLabel("분류");
      setCategoryURL("/Categories/SetExpend");
      setAssetLabel("자산");
    }
    // eslint-disable-next-line
  }, [id, data]);

  // 탭 변경 핸들러 (이체는 기존 코드 유지)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setHeaderText(tab);

    if (tab === "수입") {
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

    resetInputs();
  };

  // 입력값 초기화 (날짜 제외)
  const resetInputs = () => {
    setSelectedCategory("");
    setSelectedAsset("");
    setAmount("");
    setCalculatorInput("");
    setContent("");
    setVisibleUI("");
  };

  // 계산기 로직
  const formatCurrencyWithExpression = (value) => {
    if (!value) return "";
    return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "원";
  };

  const handleCalculatorClick = (value) => {
    if (value === "=" || value === "확인") {
      calculateResult();
    } else if (value === "C") {
      setCalculatorInput("");
      setAmount("");
    } else {
      const updatedInput = calculatorInput + value;
      setCalculatorInput(updatedInput);
      setAmount(updatedInput);
    }
  };

  const calculateResult = () => {
    try {
      const sanitizedInput = calculatorInput
        .replace(/x/g, "*")
        .replace(/÷/g, "/");
      const result = eval(sanitizedInput);
      setAmount(result.toString());
      setCalculatorInput(result.toString());
      setVisibleUI("");
    } catch (error) {
      alert("잘못된 수식입니다.");
    }
  };

  // 저장/수정/삭제
  const handleSave = () => {
    if (!amount || !selectedCategory || !selectedAsset) {
      alert("필수 항목을 입력하세요.");
      return;
    }
    if (initialData) {
      // 수정
      updateItem(initialData.id, {
        ...initialData,
        date: formatDate(selectedDate),
        price: Number(amount),
        category: selectedCategory,
        asset: selectedAsset,
        memo: content,
        type:
          activeTab === "수입"
            ? "income"
            : activeTab === "지출"
            ? "expend"
            : initialData.type,
      });
    } else {
      // 새로 저장
      const newId =
        data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      insertItem({
        id: newId,
        date: formatDate(selectedDate),
        price: Number(amount),
        category: selectedCategory,
        asset: selectedAsset,
        memo: content,
        type:
          activeTab === "수입"
            ? "income"
            : activeTab === "지출"
            ? "expend"
            : "transfer", // 이체는 기존 코드 유지
      });
    }
    router.push("/"); // 저장 후 메인으로 이동
  };

  const handleDelete = () => {
    if (initialData) {
      deleteItem(initialData.id);
      router.push("/");
    }
  };

  // 필드별 입력 핸들러
  const handleCategoryClick = () => setVisibleUI("category");
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setVisibleUI("");
  };
  const handleAssetClick = () => setVisibleUI("asset");
  const selectAsset = (asset) => {
    setSelectedAsset(asset);
    setVisibleUI("");
  };
  const handleAmountClick = () => {
    setAmount("");
    setCalculatorInput("");
    setVisibleUI("calculator");
  };
  const handleDateClick = () => setVisibleUI("datePicker");
  const handleContentChange = (event) => setContent(event.target.value);
  const handleAmountChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9+\-*/x÷]/g, "");
    setAmount(inputValue);
    setCalculatorInput(inputValue);
  };
  const handleKeyPressOnAmountField = (event) => {
    if (event.key === "Enter") calculateResult();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      {/* <div className={styles.header}>
        <span>
          <Link href="/">
            <Image src={backImg} alt="arrow" width={30} height={30} />
          </Link>
        </span>
        <span>{headerText}</span>
        <span>별표</span>
      </div> */}

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

      {/* Form Section */}
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
          {/* 버튼 조건부 렌더링 */}
          {initialData && (activeTab === "수입" || activeTab === "지출") ? (
            <div className={styles["button-row"]}>
              <button className={styles["half-btn"]} onClick={handleSave}>
                수정
              </button>
              <button
                className={`${styles["half-btn"]} ${styles["delete-btn"]}`}
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          ) : (
            <button className={styles["store-btn"]} onClick={handleSave}>
              저장
            </button>
          )}
        </div>
      </div>

      {/* DatePicker */}
      {visibleUI === "datePicker" && (
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setVisibleUI("");
            }}
            inline
          />
        </div>
      )}

      {/* Category 선택 */}
      {visibleUI === "category" && (
        <div>
          <CategoryHeader
            categoryLabel={categoryLabel}
            categoryURL={categoryURL}
            onClose={() => setVisibleUI("")}
          />
          <div className={styles["category-buttons"]}>
            {categoryList.map((category) => (
              <button key={category} onClick={() => selectCategory(category)}>
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Asset 선택 */}
      {visibleUI === "asset" && (
        <div>
          <CategoryHeader
            categoryLabel={assetLabel}
            categoryURL={assetURL}
            onClose={() => setVisibleUI("")}
          />
          <div className={styles["category-buttons"]}>
            {assetList.map((asset) => (
              <button key={asset} onClick={() => selectAsset(asset)}>
                {asset}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 계산기 UI */}
      {(visibleUI === "" || visibleUI === "calculator") && (
        <div className={styles.calculator}>
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
