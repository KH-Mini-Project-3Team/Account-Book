"use client";

import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";
import SetList from "../SetList";
export default function SetRevenu() {
  const { revenuList, setRevenuList } = useData();

  return (
    <SetList
      list={revenuList}
      setList={setRevenuList}
      headerText="수익 설정"
      addPromptText="추가할 수익란을 입력하세요:"
    />
  );
}
