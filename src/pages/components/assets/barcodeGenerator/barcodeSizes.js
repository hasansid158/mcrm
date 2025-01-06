export const barcodeSizes = [
  {
    value: 'Small Label',
    id: { width: 2, height: 1, fontSize: 8 },
  },
  {
    value: 'Medium Label',
    id: { width: 3, height: 2, fontSize: 10 },
  },
  {
    value: 'Shipping Label (Standard)',
    id: { width: 4, height: 6, fontSize: 14 },
  },
  {
    value: 'Large Label',
    id: { width: 6, height: 4, fontSize: 16 },
  },
];

export const defaultSize = barcodeSizes[1].id;
