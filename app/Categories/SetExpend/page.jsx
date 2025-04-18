"use client";
import Link from "next/link";
import { useData } from "../../contexts/DataContext";
import React, { useState } from "react";
export default function SetExpend() {
  const [selectedExpend, setSelectedExpend] = useState("");
  const [newExpenses, setNewExpenses] = useState("");
  const { expensesList, setExpensesList } = useData();

  // 수정 중인 expenses의 인덱스와 값
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const selectExpenses = (expenses) => {
    setSelectedExpend(expenses);
  };

  const addExpenses = () => {
    if (newExpenses.trim() === "") return;
    setExpensesList([...expensesList, newExpenses]);
    setNewExpenses("");
  };

  const handleInputChange = (e) => {
    setNewExpenses(e.target.value);
  };

  // 삭제 함수
  const deletEexpenses = (idx) => {
    setExpensesList(expensesList.filter((_, i) => i !== idx));
  };

  // 수정 시작
  const startEdit = (idx, expenses) => {
    setEditIndex(idx);
    setEditValue(expenses);
  };

  // 수정 값 변경
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  // 수정 저장
  const saveEdit = (idx) => {
    if (editValue.trim() === "") return;
    const updated = [...expensesList];
    updated[idx] = editValue;
    setExpensesList(updated);
    setEditIndex(null);
    setEditValue("");
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div>
      <h2>지출 설정 페이지</h2>
      <div>
        <span>지출</span>
        <input type="text" value={selectedExpend} readOnly />
      </div>
      <div>
        <h2>지출 수정</h2>
        <div>
          <input type="text" value={newExpenses} onChange={handleInputChange} />
          <button onClick={addExpenses}>지출 추가</button>
        </div>
      </div>
      <div>
        <h2>지출 목록</h2>
      </div>
      <div className="category-buttons">
        {expensesList.map((expenses, idx) => (
          <div
            key={expenses}
            style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
          >
            {editIndex === idx ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                  style={{ marginRight: 8 }}
                />
                <button onClick={() => saveEdit(idx)}>저장</button>
                <button onClick={cancelEdit}>취소</button>
              </>
            ) : (
              <>
                <button
                  onClick={() => selectExpenses(expenses)}
                  style={{ marginRight: 8 }}
                >
                  {expenses}
                </button>
                <button
                  onClick={() => startEdit(idx, expenses)}
                  style={{ marginRight: 4 }}
                >
                  수정
                </button>
                <button
                  onClick={() => deletEexpenses(idx)}
                  style={{ color: "red" }}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <Link href="/InputAssets">확인</Link>
      </div>
    </div>
  );
}
