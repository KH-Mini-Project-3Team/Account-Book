'use client';
import Link from 'next/link';
import { useData } from '../../contexts/DataContext';
import React, { useState } from "react";

export default function SetAssets() {
  const [selectedAsset, setSelectedAsset] = useState("");
  const [newAsset, setNewAsset] = useState(""); 
  const { assetList, setAssetList } = useData();

  // 수정 중인 asset의 인덱스와 값
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const selectAsset = (asset) => {
    setSelectedAsset(asset);
  };

  const addAsset = () => {
    if (newAsset.trim() === "") return;
    setAssetList([...assetList, newAsset]);
    setNewAsset("");
  };

  const handleInputChange = (e) => {
    setNewAsset(e.target.value);
  };

  // 삭제 함수
  const deleteAsset = (idx) => {
    setAssetList(assetList.filter((_, i) => i !== idx));
  };

  // 수정 시작
  const startEdit = (idx, asset) => {
    setEditIndex(idx);
    setEditValue(asset);
  };

  // 수정 값 변경
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  // 수정 저장
  const saveEdit = (idx) => {
    if (editValue.trim() === "") return;
    const updated = [...assetList];
    updated[idx] = editValue;
    setAssetList(updated);
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
      <h2>자산 설정 페이지</h2>
      <div>
        <span>자산</span>
        <input type="text" value={selectedAsset} readOnly />
      </div>
      <div>
        <h2>자산 수정</h2>
        <div>
          <input type="text" value={newAsset} onChange={handleInputChange} />
          <button onClick={addAsset}>자산 추가</button>
        </div>
      </div>
      <div>
        <h2>자산 목록</h2>
      </div>
      <div className="category-buttons">
        {assetList.map((asset, idx) => (
          <div key={asset} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
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
                <button onClick={() => selectAsset(asset)} style={{ marginRight: 8 }}>
                  {asset}
                </button>
                <button onClick={() => startEdit(idx, asset)} style={{ marginRight: 4 }}>
                  수정
                </button>
                <button onClick={() => deleteAsset(idx)} style={{ color: "red" }}>
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
