"use client";
import Link from "next/link";
import { useData } from "../../contexts/DataContext";
import React, { useState } from "react";
export default function SetRevenu() {
  const [selectedRevenu, setSelectedRevenu] = useState("");
  const [newRevenu, setNewRevenu] = useState("");
  const { revenuList, setRevenuList } = useData();

  // 수정 중인 revenu의 인덱스와 값
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const selectRevenu = (revenu) => {
    setSelectedRevenu(revenu);
  };

  const addRevenu = () => {
    if (newRevenu.trim() === "") return;
    setRevenuList([...revenuList, newRevenu]);
    setNewRevenu("");
  };

  const handleInputChange = (e) => {
    setNewRevenu(e.target.value);
  };

  // 삭제 함수
  const deletERevenu = (idx) => {
    setRevenuList(revenuList.filter((_, i) => i !== idx));
  };

  // 수정 시작
  const startEdit = (idx, revenu) => {
    setEditIndex(idx);
    setEditValue(revenu);
  };

  // 수정 값 변경
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  // 수정 저장
  const saveEdit = (idx) => {
    if (editValue.trim() === "") return;
    const updated = [...revenuList];
    updated[idx] = editValue;
    setRevenuList(updated);
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
      <h2>수입 설정 페이지</h2>
      <div>
        <span>수입</span>
        <input type="text" value={selectedRevenu} readOnly />
      </div>
      <div>
        <h2>수입 수정</h2>
        <div>
          <input type="text" value={newRevenu} onChange={handleInputChange} />
          <button onClick={addRevenu}>수입 추가</button>
        </div>
      </div>
      <div>
        <h2>수입 목록</h2>
      </div>
      <div className="category-buttons">
        {revenuList.map((revenu, idx) => (
          <div
            key={revenu}
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
                  onClick={() => selectRevenu(revenu)}
                  style={{ marginRight: 8 }}
                >
                  {revenu}
                </button>
                <button
                  onClick={() => startEdit(idx, revenu)}
                  style={{ marginRight: 4 }}
                >
                  수정
                </button>
                <button
                  onClick={() => deletERevenu(idx)}
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
