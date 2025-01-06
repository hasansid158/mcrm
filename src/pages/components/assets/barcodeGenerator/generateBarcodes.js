import JsBarcode from 'jsbarcode';

// Function to Generate Barcodes
export const generateBarcodes = (
  data = [],
  key = '',
  labelSize = { width: 1, height: 1 },
) => {
  return data.map((item) => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, item?.[key], {
      format: 'CODE128',
      displayValue: false,
      width: labelSize.width * 2, // Adjust width scaling for barcode
      height: labelSize.height * 96, // Convert inches to pixels
    });
    const barcode = {
      ...item,
      barcode: canvas.toDataURL('image/png'), // Base64 image
    };
    return barcode;
  });
};
