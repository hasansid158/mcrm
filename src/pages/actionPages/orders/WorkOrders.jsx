import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { detailColumn } from "enum/tableColumnEnum";
import { workorderColumns } from "components/tableColumns/workorderColumns";
import ActionPageMain from "pages/components/ActionPageMain";
import createFormEnum from "enum/createFormEnum";

import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import Assets from "../inventory/Assets";

import { useDispatch } from "react-redux";
import { fetchWorkOrder } from "redux/slices/actionSlice/orderSlice";

import TableFilters from "pages/components/TableFilters";

import useReactForm from "hooks/useReactForm";
import useTableSelectData from "hooks/useTableSelectData";

import WorkOrderDialog from "components/createFormComponents/workOrder/WorkOrderDialog";

import { isDate, isEmpty } from "lodash";

import { useParams, useNavigate } from 'react-router-dom';

import { crmRoutes } from "enum/routesEnum";

import { fetchWorkOrderStatus } from "redux/slices/listSlice/listSlice";

const WorkOrders = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { work } = useSelector(state => state.actions.orders);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // const tableSelectorData = useTableSelectData();
  const { formData, reset } = useReactForm();

  const { list } = useSelector(state => state.lists.userList);
  const { userProjects = [] } = useSelector(state => state?.userDetails);
  const {
    contactList,
    workOrderStatus,
  } = useSelector(state => state.lists);

  const columns = workorderColumns();

  const filterSelectorEnum = [
    {
      name: 'global',
      label: 'Global search',
      placeholder: 'Search work order...',
      isInput: true,
    },
    {
      name: "workOrderType",
      label: "Work Order Type",
      data: [
        {value: 'Collection', label: 'Collection'},
        {value: 'On Site Job', label: 'On Site Job'},
        {value: 'Delivery', label: 'Delivery'},
        {value: 'Technical Issue Help', label: 'Technical Issue Help'},
      ],
      multiple: true,
    },
    {
      name: "assignedUser",
      label: "Assigned User",
      data: list,
      multiple: true,
    },
    {
      name: "workOrderStatus",
      label: "Work Order Status",
      data: workOrderStatus,
      multiple: true,
    },
    {
      name: "projectId",
      label: "Project",
      data: userProjects,
      multiple: true,
    },
    {
      name: "workOrderStartDate",
      label: "Start Date",
      startDate: true,
    },
    {
      name: "workOrderEndDate",
      label: "End Date",
      endDate: true,
    },
    // {
    //   name: "orderType",
    //   label: "Type",
    //   data: saleOrderTypes,
    //   multiple: true,
    // },
  ];

  useEffect(() => {
    if (!isEmpty(workOrderStatus)) return;

    dispatch(fetchWorkOrderStatus());
  }, [workOrderStatus]);

  return <>
    <WorkOrderDialog
      openDialog={isDialogOpen}
      openDrawer={isDrawerOpen}
      onCloseDialog={() => setIsDialogOpen(false)}
      setOpenDrawer={(open) => {
        setIsDrawerOpen(open);
        !open && nav(`/crm/${crmRoutes.WORK_ORDERS_PATH}`);
      }}
    />

    <ActionPageMain
      rows={filteredOrders}
      columns={columns}
      label='Work Orders'
      fetchApi={fetchWorkOrder}
      clickRowData={row => {
        setIsDrawerOpen(true);
        nav(`/crm/${crmRoutes.WORK_ORDERS_PATH}/${row?.workOrderID}`);
      }}
      drawerProps={{
        open: false,
      }}
      removeCreateButton
    >
      <TableFilters
        filterSelectorEnum={filterSelectorEnum}
        data={work}
        formData={formData}
        resetFields={() => reset({})}
        handleChange={(filteredData, values) => {
          setFilteredOrders(filteredData);
        }}
      />

      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={() => setIsDialogOpen(true)}
        startIcon={<AddIcon/>}
        sx={{minWidth: '140px'}}
      >
        Add WO
      </Button>
    </ActionPageMain>

    {/* <AssetToDialog
      open={dialogOpen}
      handleClose={() => setDialogOpen(false)}
      onSubmit={handleAssetToOrder}
      title={`Add Assets To work order ${selectedOrderId}`}
    /> */}
  </>;
};

export default WorkOrders;
