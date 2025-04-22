// ItemRow.js
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const ItemRow = ({ 
  text, 
  index, 
  assetList, 
  setAssetList, 
  isLast,
}) => {
  // 수정 로직
  const handleEdit = () => {
    // 예: 프롬프트를 사용하여 간단히 구현
    const newValue = prompt("수정할 값을 입력하세요:", text);
    if (newValue && newValue.trim() !== "") {
      const updatedList = [...assetList];
      updatedList[index] = newValue;
      setAssetList(updatedList);
    }
  };

  // 삭제 로직
  const handleDelete = () => {
    const updatedList = assetList.filter((_, i) => i !== index);
    setAssetList(updatedList);
  };

  return (
    <Box 
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f8b8af",
        padding: "1.5% 3%",
        borderRadius: 0,
        color: "#fff",
        width: "94%",
        minHeight: "40px",
        margin: 0, // margin 제거
        // borderBottom: isLast ? "1px solid #fff" : "none", // 마지막 행만 border 없음
        // borderTop: "1px solid #fff",
        borderBottom: isLast ? "1px solid #fff" : "none",
        borderTop: "1px solid #fff",
      }}
    >
      <IconButton
        size="small"
        sx={{ color: "#f44336", mr: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        <RemoveCircleIcon />
      </IconButton>
      <Typography sx={{ flex: 1, fontWeight: 500 }}>{text}</Typography>
      <IconButton
        size="small"
        sx={{ color: "#FFF" }}
        onClick={(e) => {
          e.stopPropagation();
          handleEdit();
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton size="small" sx={{ color: "#FFF", ml: 1 }}>
        <DragHandleIcon />
      </IconButton>
    </Box>
  );
};

export default ItemRow;
