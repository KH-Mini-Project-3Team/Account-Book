"use client";

import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";
import ItemRow from "./ItemRow";
import SetHeader from "./SetHeader";

export default function SetAssets() {
  const { assetList, setAssetList } = useData();
  const [selectedAsset, setSelectedAsset] = useState("");

  const selectAsset = (asset) => setSelectedAsset(asset);

  const handleAddAsset = () => {
    const newAsset = prompt("추가할 자산명을 입력하세요:");
    if (newAsset && newAsset.trim() !== "") {
      setAssetList([...assetList, newAsset.trim()]);
    }
  };

  return (
    <div>
      <div>
        <SetHeader onAddAsset={handleAddAsset} />
      </div>
      <div className="asset-list">
        {assetList.map((asset, idx) => (
          <ItemRow
            key={idx}
            text={asset}
            index={idx}
            assetList={assetList}
            setAssetList={setAssetList}
            selected={selectedAsset === asset}
            onSelect={selectAsset}
            isLast={idx === assetList.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
