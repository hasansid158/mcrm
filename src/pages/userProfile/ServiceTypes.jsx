import React, { useState, useEffect } from "react";
import { createServiceItems, updateServiceItems , deleteServiceItems } from "api/profileApis";
import { Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
// import { fetchAllServiceItems } from "redux/slices/listSlice/listSlice";
import { getAllServiceItems } from "api/profileApis";

import StatusForm from "./componenets/forms/StatusForm";
import { statusColumn } from "./componenets/tableColumns/statusColumn";
import ProfileTable from "./componenets/ProfileTable";

import Selector from "common/input/Selector";

import { keys, isEmpty, mapValues, map, assign } from "lodash";

import { arrayToValueLabel } from "utils/helperFunctions";
import { ServiceColumn } from "./componenets/tableColumns/ServiceColumn";
import ServiceFrom from "./componenets/forms/ServiceForm";

import { setErrorDialogText } from "redux/slices/commonSlice/commonSlice";

const ServiceTypes = () => {
  const dispatch = useDispatch();
  const [allServiceItems, setAllServiceItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [serviceData, setServiceData] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    getAllServiceItems()
      .then(res => setAllServiceItems(res))
      .catch(() => dispatch(setErrorDialogText('Error fetching service items, please try again later.')))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!isEmpty(serviceData)) return;
    fetchData();
  }, []);

  useEffect(() => {
    if (isEmpty(allServiceItems)) return;

    const modifiedServices = mapValues(allServiceItems, (services, key) =>
      map(services, (service) =>
        assign({}, service, { serviceType: key })
      )
    );

    setServiceData(modifiedServices);

    const serviceKeys = keys(allServiceItems || {}) || [];
    setServiceList(serviceKeys);
    setSelectedService(isEmpty(selectedService) ? keys(allServiceItems || {})?.[0] : selectedService);

  }, [allServiceItems]);

  return (
    <ProfileTable
      fetchedData={serviceData?.[selectedService] || []}
      fetchOnUpdate={async () => { await fetchData() }}

      createApi={createServiceItems}
      updateApi={updateServiceItems}
      columns={ServiceColumn}
      deleteApi={deleteServiceItems}

      replaceCreateProperties={data => ({...data, isActive: true})}

      title='Service Types'
      buttonLabel='Service Type'

      CreateForm={ServiceFrom}
      formProps={{ listData: allServiceItems }}

      updateReplaceObjectKey='serviceID'

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search",
          placeholder: "Search services...",
        },
        {
          name: "serviceDescription",
          label: "Service Description",
          isInput: true,
        },
        {
          name: "serviceCategory",
          label: "Service Category",
          isInput: true,
        },
        {
          name: "unitPrice",
          label: "Unit Price",
          isInput: true,
        },
        {
          name: "gst",
          label: "GST",
          isInput: true,
        },
      ]}
      dialogSize='xs'

      actionComponents={
        <Box maxWidth='200px' width='100%'>
          <Selector
            label='Service Type'
            selectorData={arrayToValueLabel(serviceList)}
            size='large'
            required
            disableStar
            value={selectedService}
            onChange={(name, value) => {
              setSelectedService(value)
            }}
          />
        </Box>
      }

      defaultCreateValues={() => ({serviceType: selectedService})}

      isloading={loading}
    />
  );
};

export default ServiceTypes;
