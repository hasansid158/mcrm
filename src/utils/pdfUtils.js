import React from 'react';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import { Box } from '@mui/material';

// Generate PDF Blob from a template
export const generatePdfBlob = async (template) => {
  if (!template) return null;
  return await pdf(template).toBlob();
};

// Download PDF
export const downloadPdf = async (template, fileName = 'download') => {
  const pdfBlob = await generatePdfBlob(template);
  if (!pdfBlob) return;

  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
};

const alertPopup = (action = '') => {
  alert(
    `Pop-up blocked! Please allow pop-ups in your browser settings to enable ${action}.`,
  );
};

// Open PDF in a new tab
export const openPdf = async (template) => {
  const pdfBlob = await generatePdfBlob(template);
  if (!pdfBlob) return;

  const url = URL.createObjectURL(pdfBlob);

  const newWindow = window.open(url, '_blank');

  if (!newWindow) {
    alertPopup('PDF viewing');
  }
};

// Print PDF
export const printPdf = async (template) => {
  const pdfBlob = await generatePdfBlob(template);
  if (!pdfBlob) return;

  const url = URL.createObjectURL(pdfBlob);
  const printWindow = window.open(url, '_blank');

  if (!printWindow) {
    alertPopup('PDF printing');
  }

  printWindow.onload = () => {
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };
};

// React component to view PDF
export const ViewPdf = ({ template }) => (
  <Box width="100%" height="100%">
    <PDFViewer width="100%" height="100%">
      {template}
    </PDFViewer>
  </Box>
);
