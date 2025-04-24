"use client";
// pages/SetAssets.js
import { useData } from "../contexts/DataContext";
import SetList from "./SetList";

export default function Categories() {
  const { assetList, setAssetList } = useData();

  return (
    <SetList
      list={assetList}
      setList={setAssetList}
      headerText="자산 설정"
      addPromptText="추가할 자산명을 입력하세요:"
    />
  );
}
