'use client';
import Link from 'next/link';
import { useData } from '../../contexts/DataContext';
import React, { useState } from "react";
export default function SetExpend(){
  const [selectedExpenses, setSelectedExpenses] = useState("");
  const [newExpenses, setNewExpenses] = useState(""); 
  const {expensesList, setExpensesList} = useData();

  const selectExpenses = (expenses) => {
    setSelectedExpenses(expenses); // 선택된 지출을 업데이트
  };
  const addExpenses = () => {
    setExpensesList([...expensesList, newExpenses]);
    setNewExpenses("");
  }
  const handleInputChange = (e) => {
    setNewExpenses(e.target.value);
  }

  return (
    <div>
      <h2>지출 설정 페이지</h2>
      <div>
        <span>지출</span>
        <input type="text" value={selectedExpenses} readOnly/>
      </div>
      <div>
        <h2>지출 수정</h2>
        <div>
          <input type="text" value={newExpenses} onChange={handleInputChange}/>
          <button onClick={addExpenses}>지출 추가</button>
        </div>
      </div>
      <div>
        <h2>카테고리 목록</h2>
      </div>
      <div className="category-buttons">
        {expensesList.map((expenses) => (
          <button key={expenses} onClick={() => selectExpenses(expenses)}>
            {expenses}
          </button>
        ))}
      </div>
      <div>
        <Link href="/InputAssets">확인</Link>
      </div>
    </div>
  )
}