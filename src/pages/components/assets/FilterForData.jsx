import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, InputBase } from "@mui/material";

const containsTextInKeyOrValue = (obj, text) => {
  if (typeof obj === "string") {
    return obj.toLowerCase().includes(text.toLowerCase());
  }
  if (Array.isArray(obj)) {
    return obj
      .map((item) => containsTextInKeyOrValue(item, text))
      .filter(Boolean);
  }
  if (typeof obj === "object" && obj !== null) {
    let filteredObj = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (
        key.toLowerCase().includes(text.toLowerCase()) ||
        containsTextInKeyOrValue(value, text)
      ) {
        filteredObj[key] = value;
      }
    });
    return Object.keys(filteredObj).length > 0 ? filteredObj : null;
  }
  return false;
};

const FilterForData = ({ data, onFilter }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const filtered = data
      .map((item) =>
        Array.isArray(item)
          ? item
              .map((subItem) => containsTextInKeyOrValue(subItem, inputValue))
              .filter(Boolean)
          : containsTextInKeyOrValue(item, inputValue)
          ? containsTextInKeyOrValue(item, inputValue)
          : null
      )
      .filter(Boolean);

    onFilter(filtered);
  }, [inputValue]);

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <InputBase
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{
          width: 300,
          border: "1px solid #ccc",
          borderRadius: "4px",
          px: 1,
          py: 0.5,
        }}
      />
      {inputValue.trim() && (
        <Button
          variant="outlined"
          onClick={() => setInputValue("")}
          sx={{ ml: 1, height: "40px" }}
        >
          Clear Filters
        </Button>
      )}
    </Box>
  );
};

export default FilterForData;
