import React, { Suspense } from "react";
import InputAssets from "./InputAssets";

export default function InputAssetsPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <InputAssets />
    </Suspense>
  );
}