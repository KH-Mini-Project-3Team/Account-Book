"use client";

import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";
import SetList from "../SetList";
export default function SetExpend() {
  const { expensesList, setExpensesList } = useData();

  return (
    <SetList
      list={expensesList}
      setList={setExpensesList}
      headerText="지출 설정"
      addPromptText="추가할 지출란을 입력하세요:"
    />
  );
}
