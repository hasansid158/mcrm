import _ from 'lodash';

export const updateImportData = async (
  data = [],
  columnMapping,
  chunkDivider = 10,
  onProgress,
) => {
  const updateColumns = (chunkData) => {
    const extraKeys = [
      'accountId',
      'customerId',
      'loadNo',
      'projectId',
      'workOrderNo',
    ];

    const extraValues = _.pick(columnMapping, extraKeys);
    const filteredMapping = _.omit(columnMapping, extraKeys);

    const updatedData = _.map(chunkData, (item) => {
      const mappedData = _.reduce(
        filteredMapping,
        (result, value, key) => {
          result[key] = _.toString(item[value] || '') || '';
          return result;
        },
        {},
      );

      return {
        ...extraValues,
        ...mappedData,
      };
    });

    return updatedData;
  };

  const chunkSize = Math.ceil(data?.length / (chunkDivider || 1));
  const chunks = _.chunk(data, chunkSize);
  const totalChunks = chunks.length;
  let processedData = [];

  for (let i = 0; i < totalChunks; i++) {
    const chunk = chunks[i];
    const updatedChunk = updateColumns(chunk);
    processedData = processedData.concat(updatedChunk);

    if (onProgress) {
      const progress = Math.round(((i + 1) / totalChunks) * 100);
      onProgress(progress);
    }

    // Pause briefly to allow UI updates
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  return processedData;
};
