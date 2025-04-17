'use client';
import Link from 'next/link';
import { useData } from '../../contexts/DataContext';
import React, { useState } from "react";
export default function SetRevenu(){
  const [selectedRevenu, setSelectedRevenu] = useState("");
  const [newRevenu, setNewRevenu] = useState(""); 
  const {revenuList, setRevenuList} = useData();

  const selectRevenu = (Revenu) => {
    setSelectedRevenu(Revenu); // 선택된 자산을 업데이트
  };
  const addRevenu = () => {
    setRevenuList([...revenuList, newRevenu]);
    setNewRevenu("");
  }
  const handleInputChange = (e) => {
    setNewRevenu(e.target.value);
  }

  return (
    <div>
      <h2>수입 설정 페이지</h2>
      <div>
        <span>수입</span>
        <input type="text" value={selectedRevenu} readOnly/>
      </div>
      <div>
        <h2>수입 수정</h2>
        <div>
          <input type="text" value={newRevenu} onChange={handleInputChange}/>
          <button onClick={addRevenu}>수입 추가</button>
        </div>
      </div>
      <div>
        <h2>카테고리 목록</h2>
      </div>
      <div className="category-buttons">
        {revenuList.map((Revenu) => (
          <button key={Revenu} onClick={() => selectRevenu(Revenu)}>
            {Revenu}
          </button>
        ))}
      </div>
      <div>
        <Link href="/InputAssets">확인</Link>
      </div>
    </div>
  )
}