import { isEmpty } from 'lodash';

import { getAssetDetails } from 'api/masterApi';

import AssetTestResults from './AssetTestResults';
import AssetOrders from './AssetOrders';
import AssetHistory from './AssetHistory';
import AssetDataReport from './AssetDataReport';

const assetDetailContent = async (
  selectedId,
) => {

  if (isEmpty(selectedId)) return;

  let detailData = {};

  await getAssetDetails(selectedId).then(res => {
    detailData = res;
  }).catch(err => {
    console.log(err);
  });

  return {
    'Asset Info': detailData?.assetInfo,
    'Asset Test Results': <AssetTestResults
      testData={detailData?.assetTestResults}
      assetData={detailData?.assetInfo}
    />,
    'Asset Orders': <AssetOrders orderData={detailData?.assetOrders} />,
    'Asset History': <AssetHistory historyData={detailData?.assetHistory} />,
    'Data Sanitization Report Dto': <AssetDataReport reportData={detailData?.dataSanitizationReportDto} />,
  };
}

export default assetDetailContent;
