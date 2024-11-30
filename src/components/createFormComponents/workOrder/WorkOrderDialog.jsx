import React, { useState, useEffect } from 'react';

import WOInfo from './WOInfo';
import ServiceItem from 'components/serviceCreator/ServiceItem';
import WOServices from './WOServices';
import WOAssets from './WOAssets';
import WODocuments from './WODocuments';

import PaperBox from 'common/ui/PaperBox';
import TabsMenu from 'common/dataDisplay/Tabs/TabsMenu';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import DetailsDrawer from 'components/detailsDrawer/DetailsDrawer';

import useReactForm from 'hooks/useReactForm';
import { useDispatch } from 'react-redux';
import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

import _ from 'lodash';

import {
  uploadAttachmentsWO,
  getWorkOrderById,
} from 'api/orderApis';

import { addWorkOrder, updateWorkValue } from 'redux/slices/actionSlice/orderSlice';

import { useParams } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { isEqualCommonData } from 'utils/helperFunctions';

const WorkOrderDialog = ({
  openDialog = false,
  onCloseDialog = () => {},
  openDrawer = false,
  setOpenDrawer = () => {},
}) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);

  const [serviceItems, setServiceItems] = useState([{component: ServiceItem, id: 0, data: {}}]);
  const [serviceCalculatedValues, setServiceCalculatedValues] = useState({});
  const [serviceFormTrigger, setServiceFormTrigger] = useState(0);
  const [serviceChanged, setServiceChanged] = useState(false);

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [apiFormData, setApiFormData] = useState([]);
  const [docsFetched, setDocsFetched] = useState(false);

  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedAssetIndexes, setSelectedAssetIndexes] = useState([]);

  const [allFetchedData, setAllFetchedData] = useState({});

  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formChanged, setFormChanged] = useState(false);

  const {
    formData,
    reset,
    handleSubmit,
    setError,
  } = useReactForm({});

  const { id } = useParams();
  useEffect(() => {
    reset({});

    if (_.isNil(id)) {
      setSelectedOrderId(null);
      setSelectedOrderNumber(null);
      setLoading(false);
      openDrawer && setOpenDrawer(false);
      reset({});
      setServiceItems([{component: ServiceItem, id: 0, data: {}}]);
      setServiceCalculatedValues({});
      setSelectedAssets([]);
      setAcceptedFiles([]);
      setIsUpdate(false);
      return;
    };

    setSelectedOrderId(id);
    setDocsFetched(false);
    setLoading(true);
    setIsUpdate(true);
    setOpenDrawer(true);
  }, [id]);

  const resetToFetchedData = (fetchedData = null) => {
    const data = fetchedData || allFetchedData;
    const {
      assets,
      workOrderItems,
      associatedOrders = [],
      workOrderNo
    } = data;

    const ordersData = associatedOrders?.map(item => ({
      fK_DealId: item?.fK_DealId,
      fK_LeadId: item?.fK_LeadId,
      fK_QuoteId: item?.fK_QuoteId,
      fK_TaskId: item?.fK_TaskId,
    }));

    reset({
      discount: data?.discount || 0,
      ...data,
      ...ordersData,
    });

    const fetchedServiceItems = workOrderItems?.map((itemData, key) => (
      {
        component: ServiceItem,
        id: key,
        data: {
          ...itemData,
          serviceCategory: itemData?.workOrderServiceItem,
          serviceDescription: itemData?.workOrderItemDescription,
        }
      }
    ));
    setServiceItems(fetchedServiceItems);
    setSelectedOrderNumber(workOrderNo);
    setSelectedAssets(assets);
    setServiceChanged(false);
  }

  //fetch by id
  useEffect(() => {
    if (_.isNil(selectedOrderId)) return;

    getWorkOrderById(selectedOrderId)
      ?.then(res => {
        resetToFetchedData(res);
        setAllFetchedData(res);
      })
      ?.finally(() => setLoading(false));
  }, [selectedOrderId]);


  const onSubmit = (fieldData) => {
    //info tab validation
    const requiredInfoTabFields = [
      'customerId',
      'projectId',
      'workOrderType',
      'workOrderStartDate',
    ];
    const invalidInfoTab = _.some(requiredInfoTabFields, prop => !_.get(fieldData, prop));

    if (invalidInfoTab) {
      if (tabValue !== 0) {
        setTabValue(0);
        requiredInfoTabFields?.forEach(field => setError(field));
      }
      return;
    }
    //

    //service tab validation
    const serviceItemData = serviceItems?.map(item => {
      if (_.isEmpty(item?.data)) return null;
      const { itemId, ...rest } = item.data;
      return rest
    }).filter(item => !!item);

    const hasInvalidItems = serviceItemData.some(item => {
      if (_.isEmpty(item)) return false;

      if ((!item?.serviceCategory && !item?.unitPrice && !item?.quantity)) {
        setServiceFormTrigger(prev => prev + 1);
        if (tabValue !== 1) {
          setTabValue(1);
        }
        return true;
      }
      return false;
    });

    if (hasInvalidItems) return;
    //

    setLoading(true);

    const {
      fK_DealId,
      fK_LeadId,
      fK_QuoteId,
      fK_TaskId,
      ...modifiedPayload
    } = fieldData;

    const selectedAssetIds = selectedAssets?.map((item) => item?.assetID);

    const payloadData = {
      ...modifiedPayload,
      contactPerson: fieldData?.contactPerson || '',
      severity: fieldData?.severity || '',
      workOrderEndDate: fieldData?.workOrderEndDate || fieldData?.workOrderStartDate,
      workOrderServiceItems: serviceItemData,
      workOrderAssociatedOrders: {
        fK_DealId,
        fK_LeadId,
        fK_QuoteId,
        fK_TaskId,
      },
      assets: { assets: selectedAssetIds || [] }
    }

    if (isUpdate) {
      dispatch(updateWorkValue({...payloadData, workOrderID: selectedOrderId})).unwrap()
        ?.then(res => {
          setLoading(false);
          dispatch(setSnackBar({
            open: true,
            message: 'Work order updated successfully!'
          }));
          setServiceChanged(false);
        })
        .catch(() => {
          setLoading(false);
          dispatch(setErrorDialogText('Server error occured while updating work order, please try again later.'))
        });
      return;
    }

    dispatch(addWorkOrder(payloadData)).unwrap()
      ?.then(res => {
        dispatch(setSnackBar({
          open: true,
          message: 'Work order created successfully!'
        }));

        if (_.isEmpty(acceptedFiles)) {
          setLoading(false);
          onCloseDialog();
          return
        };

        uploadAttachmentsWO(apiFormData, selectedOrderId)
          ?.finally(() => {
            setLoading(false);
            onCloseDialog();
          })
      })
      .catch(() => {
        setLoading(false);
        dispatch(setErrorDialogText('Server error occured while creating work order, please try again later.'))
      });
  }

  const currentValues = formData?.watch();
  useEffect(() => {
    const defaultValues = formData.defaultValues || {};
    setFormChanged(!isEqualCommonData(currentValues, defaultValues));
  }, [currentValues, formData?.defaultValues]);

  const tabContent = [
    <WOInfo formData={formData}/>,
    <WOServices
      serviceItems={serviceItems}
      setServiceItems={data => {
        setServiceItems(data);
        setServiceChanged(true);
      }}
      triggerValidation={serviceFormTrigger}
      calculatedValues={serviceCalculatedValues}
      setCalculatedValues={setServiceCalculatedValues}
      formData={formData}
    />,
    <WODocuments
      acceptedFiles={acceptedFiles}
      setAcceptedFiles={setAcceptedFiles}
      selectedOrderNumber={selectedOrderNumber}
      isUpdate={isUpdate}
      workOrderId={selectedOrderId}
      setFileApiFormData={setApiFormData}
      docsFetched={docsFetched}
      onDocsFetch={() => setDocsFetched(true)}
    />,
    <WOAssets
      selectedAssets={selectedAssets}
      setSelectedAssets={setSelectedAssets}
      selectedAssetIndexes={selectedAssetIndexes}
      setSelectedAssetIndexes={setSelectedAssetIndexes}
      selectedOrderId={selectedOrderId}
      isUpdate={isUpdate}
    />,
  ];

  const content = (
    <>
    <PaperBox sx={{px: 2}}>
      <Box mb={2}>
        <TabsMenu
          tabValue={tabValue}
          setTabValue={setTabValue}
          tabHeaders={[
            'WORK ORDER INFO',
            'SERVICE ITEMS',
            'DOCUMENTS',
            'ASSETS',
          ]}
          isSmall={openDrawer}
        />
      </Box>

        {tabContent?.[tabValue] || ''}
      </PaperBox>
    </>
  )

  return <>
    <DialogBox
      open={openDialog}
      title='Create Work Order'
      handleClose={onCloseDialog}
      loading={loading}
      maxWidth='lg'
      disableSubmitNew
      footerItems={
        <Button
          variant='contained'
          sx={{width: '140px'}}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Submit
        </Button>
      }
    >
      {content}
    </DialogBox>

    <DetailsDrawer
      open={openDrawer}
      drawerLabel={`Work Order ${selectedOrderNumber || ''}`}
      drawerLoading={loading}
      onClose={() => setOpenDrawer(false)}
    >
      {content}

      <Box display='flex' justifyContent='right' alignItems='center' gap={1} mt={1}>
        {tabValue <= 1 &&
          <>
            {(formChanged || serviceChanged) &&
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => resetToFetchedData()}
                sx={{minWidth: '120px'}}
              >
                Cancel
              </Button
            >}

            <Button
              variant='contained'
              onClick={() => handleSubmit(onSubmit)()}
              sx={{width: '120px'}}
              disabled={!formChanged && !serviceChanged}
            >
              Update
            </Button>
          </>
        }
      </Box>
    </DetailsDrawer>
  </>;
}

export default WorkOrderDialog;
