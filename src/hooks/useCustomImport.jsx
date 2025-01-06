import React from 'react'
import _ from 'lodash';

export default function useCustomImport({
  data,
  columnMapping,
  chunkSize,
  onProgress,
}) {

  const updateColumns = (data) => {
    return _.map(data, (obj) =>
      _.mapKeys(obj, (value, key) => columnMapping[key] || key),
    );
  };

  const chunks = _.chunk(data, chunkSize); // Break the array into chunks
  const totalChunks = chunks.length; // Get the total number of chunks
  let processedData = []; // Initialize the result array

  for (let i = 0; i < totalChunks; i++) {
    const chunk = chunks[i]; // Process each chunk
    const renamedChunk = updateColumns(chunk);
    processedData = processedData.concat(renamedChunk);

    // Update progress
    if (onProgress) {
      const progress = ((i + 1) / totalChunks) * 100;
      onProgress(progress);
    }

    // Pause briefly to allow UI updates
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  return processedData;
  
}
