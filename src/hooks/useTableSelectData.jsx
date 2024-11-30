import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

const useTableSelectData = () => {
  const [tableSelectorData, setTableSelectorData] = useState({});

  const { userProjects = [] } = useSelector(state => state?.userDetails);
  const {
    assetStatus,
    makes,
    itemTypes,
    warehouses,
    locations,
    models,
    loads,
    workOrderList,
    saleOrderStatuses,
    saleOrderTypes,
  } = useSelector(state => state.lists)

  useEffect(() => {
    const makesArr = makes?.map(item => item?.value);
    const modelsArr = models?.map(item => item?.value);
    const itemTypesArr = itemTypes?.map(item => item?.value);
    const projectsArr = userProjects?.map(item => item?.value);
    const warehousesArr = warehouses?.map(item => item?.value);
    const locationsArr = locations?.map(item => item?.value);
    const assetStatusArr = assetStatus?.map(item => item?.value);
    const loadsArr = loads?.map(item => item?.value);
    const workOrderListArr = workOrderList?.map(item => item?.value);
    const saleOrderStatusesArr = saleOrderStatuses?.map(item => item?.value);
    const saleOrderTypesArr = saleOrderTypes?.map(item => item?.value);

    const selectorDataObj = {
      makes: makesArr,
      models: modelsArr,
      itemTypes: itemTypesArr,
      projects: projectsArr,
      warehouses: warehousesArr,
      locations: locationsArr,
      assetStatus: assetStatusArr,
      loads: loadsArr,
      workOrderList: workOrderListArr,
      saleOrderStatuses: saleOrderStatusesArr,
      saleOrderTypes: saleOrderTypesArr,
    }
    setTableSelectorData(selectorDataObj);

  }, [
    makes,
    models,
    itemTypes,
    userProjects,
    warehouses,
    locations,
    assetStatus,
    loads,
    workOrderList,
    saleOrderStatuses,
    saleOrderTypes,
  ]);

  return tableSelectorData;
}

export default useTableSelectData;
