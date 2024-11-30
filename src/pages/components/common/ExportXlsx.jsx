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

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate and download the file
    XLSX.writeFile(workbook, name ? name+'.xlsx' : 'table_data.xlsx');
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
