// components/SetList.js
"use client";

import React, { useState } from "react";
import ItemRow from "./ItemRow";
import SetHeader from "./SetHeader";

export default function SetList({
  list,           // 리스트 데이터 (자산, 수입, 지출 등)
  setList,        // 리스트 업데이트 함수
  headerText,     // 상단 헤더 텍스트
  addPromptText,  // 추가할 때 prompt에 표시할 텍스트
}) {
  const [selected, setSelected] = useState("");

  const selectItem = (item) => setSelected(item);

  const handleAdd = () => {
    const newItem = prompt(addPromptText);
    if (newItem && newItem.trim() !== "") {
      setList([...list, newItem.trim()]);
    }
  };

  return (
    <div>
      <div>
        <SetHeader onAdd={handleAdd} headerText={headerText} />
      </div>
      <div className="asset-list">
        {list.map((item, idx) => (
          <ItemRow
            key={idx}
            text={item}
            index={idx}
            assetList={list}
            setAssetList={setList}
            selected={selected === item}
            onSelect={selectItem}
            isLast={idx === list.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
