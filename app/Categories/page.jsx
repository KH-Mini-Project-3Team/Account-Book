'use client';
import Link from 'next/link';
import { useData } from '../contexts/DataContext';
import React, { useState } from "react";
export default function Categorys(){
  const [selectedAsset, setSelectedAsset] = useState("");
  const [newAsset, setNewAsset] = useState(""); 
  const {assetList, setAssetList} = useData();

  const selectAsset = (asset) => {
    setSelectedAsset(asset); // 선택된 자산을 업데이트
  };
  const addAsset = () => {
    setAssetList([...assetList, newAsset]);
    setNewAsset("");
  }
  const handleInputChange = (e) => {
    setNewAsset(e.target.value);
  }

  return (
    <div>
      <h2>자산 설정 페이지</h2>
      <div>
        <span>자산</span>
        <input type="text" value={selectedAsset} readOnly/>
      </div>
      <div>
        <h2>자산 수정</h2>
        <div>
          <input type="text" value={newAsset} onChange={handleInputChange}/>
          <button onClick={addAsset}>자산 추가</button>
        </div>
      </div>
      <div>
        <h2>카테고리 목록</h2>
      </div>
      <div className="category-buttons">
        {assetList.map((asset) => (
          <button key={asset} onClick={() => selectAsset(asset)}>
            {asset}
          </button>
        ))}
      </div>
      <div>
        <Link href="/InputAssets">확인</Link>
      </div>
    </div>
  )
}