import React from 'react';

import * as XLSX from 'xlsx';

import SimCardDownloadRoundedIcon from '@mui/icons-material/SimCardDownloadRounded';
import Box from '@mui/material/Box';

import MenuButton from './MenuButton';

const ExportXlsx = ({
  columns = [],
  rows = [],
  isButton,
  name,
  buttonProps,
  exportAsCsv = true,
}) => {

  const handleDownload = () => {
    // Prepare the data for the worksheet
    const data = rows?.map((row) => {
      const newRow = {};
      columns.forEach((col) => {
        newRow[col.headerName || col] = row[col.field || col];
      });
      return newRow;
    });

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    if (exportAsCsv) {
      // Export as CSV
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name ? `${name}.csv` : 'table_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Export as XLSX
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, name ? `${name}.xlsx` : 'table_data.xlsx');
    }
  };

  return (
    <MenuButton
      onClick={handleDownload}
      isButton={isButton}
      icon={<SimCardDownloadRoundedIcon/>}
      label='Export'
      outlined
      {...buttonProps}
    />
  );
}

export default ExportXlsx;
