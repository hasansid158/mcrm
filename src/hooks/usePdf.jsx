import { useState, useEffect } from 'react';
import { pdf, PDFViewer } from '@react-pdf/renderer';

import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';
import { Box } from '@mui/material';

const usePdf = (template) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pdf(template).toBlob().then(() => setLoading(false));
  }, [template]);

  const downloadPdf = async (fileName = 'download') => {
    const pdfBlob = await pdf(template).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const openPdf = async () => {
    const pdfBlob = await pdf(template).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
  };

  const ViewPdf = () => (
    <Box width='100%' height='100%'>
      <SpinLoader loading={loading}/>
      <PDFViewer width="100%" height="100%">
        {template}
      </PDFViewer>
    </Box>
  );

  return { downloadPdf, openPdf, ViewPdf };
};

export default usePdf;