import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const predefinedColumns = {
  SSN: { dataType: 'string', required: true },
  Name: { dataType: 'string', required: true },
  Age: { dataType: 'number', required: true, min: 0 },
  Email: { dataType: 'string', required: false },
  IsActive: { dataType: 'boolean', required: false },
};

function validateAndTransformRow(row, mappedColumns) {
  const transformedRow = {};
  for (const [key, config] of Object.entries(predefinedColumns)) {
      const sourceColumn = mappedColumns[key];
      const value = row[sourceColumn];

      // Validation
      if (config.required && (value === undefined || value === null || value === '')) {
          throw new Error(`Missing required field: ${key}`);
      }

      // Data Type Validation
      if (value !== undefined) {
          switch (config.dataType) {
              case 'string':
                  transformedRow[key] = String(value);
                  break;
              case 'number':
                  if (isNaN(value)) throw new Error(`Invalid number for field: ${key}`);
                  transformedRow[key] = Number(value);
                  break;
              case 'boolean':
                  transformedRow[key] = value === 'true' || value === true;
                  break;
              default:
                  transformedRow[key] = value;
          }
      }
  }
  return transformedRow;
}


const CustomImport = () => {
    const [fileData, setFileData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [mappedColumns, setMappedColumns] = useState({});
    const [errors, setErrors] = useState([]);

    const predefinedColumns = {
        SSN: { dataType: 'string', required: true },
        Name: { dataType: 'string', required: true },
        Age: { dataType: 'number', required: true },
        Email: { dataType: 'string', required: false },
        IsActive: { dataType: 'boolean', required: false },
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            setHeaders(jsonData[0]); // First row as headers
            setFileData(jsonData.slice(1)); // Remaining rows as data
        };
        reader.readAsBinaryString(file);
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        handleFileUpload(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const validateAndMapData = () => {
        try {
            const mappedData = fileData.map((row) => {
                return validateAndTransformRow(
                    Object.fromEntries(headers.map((header, i) => [header, row[i]])),
                    mappedColumns
                );
            });
            console.log('Mapped Data:', mappedData);
            setErrors([]);
        } catch (error) {
            setErrors([...errors, error.message]);
        }
    };

    return (
        <div>
            <div>
                <h3>Upload File</h3>
                <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px' }}>
                    <input {...getInputProps()} />
                    Drag & drop a file here, or click to select one
                </div>
            </div>
            {headers.length > 0 && (
                <div>
                    <h3>Map Columns</h3>
                    {Object.keys(predefinedColumns).map((col) => (
                        <div key={col}>
                            <label>{col}:</label>
                            <select
                                onChange={(e) =>
                                    setMappedColumns({ ...mappedColumns, [col]: e.target.value })
                                }
                            >
                                <option value="">Select column</option>
                                {headers.map((header, index) => (
                                    <option key={index} value={header}>
                                        {header}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            )}
            {fileData.length > 0 && (
                <div>
                    <button onClick={validateAndMapData}>Validate & Map</button>
                </div>
            )}
            {errors.length > 0 && (
                <div>
                    <h4>Errors:</h4>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomImport;
