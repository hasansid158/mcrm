import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// import { fetchAssetTestConditions } from "redux/slices/detailSlice/assetTestSlice";
import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';
// import { postAssetTestConditions } from 'redux/slices/detailSlice/assetTestSlice';

import {
  submitAssetTestConditions,
  submitBulkAssetTestConditions,
  getAssetTestConditions,
  getAssetDetails,
} from 'api/masterApi';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import SwitchToggle from 'common/input/SwitchToggle';
import TabsMenu from 'common/dataDisplay/Tabs/TabsMenu';
import PaperBox from 'common/ui/PaperBox';
import InputField from 'common/input/InputField';

import SpecForm from './SpecForm';
import AssetGrade from './AssetGrade';

import {
  Box,
  Grid,
  Typography,
} from '@mui/material';

import { updateAssetItem } from 'redux/slices/actionSlice/assetSlice';

import _ , { difference, isEmpty, max, clone, includes, filter, mapValues, camelCase, concat } from 'lodash';

export default function AssetTestDialog({
  open = false,
  handleClose = () => {},
  //pass asset data as empty obj from the main compononent to fix rerender issue
  assetData = {},
  assetIds = [],
  isBulk,
  noDialog,
  testValues = [],
  isAssetDetail = false,
  setUpdatedData = () => {},
  submitCallback = () => {},
}) {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedTabs, setCheckedTabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredValues, setFilteredValues] = useState([]);
  const [filteredItemIds, setFilteredItemIds] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [assetTestConditions, setAssetTestConditions] = useState([]);
  const [allPassId, setAllPassId] = useState(null);
  const [isAllPass, setIsAllPass] = useState(false);

  const [isManual, setIsManual] = useState(false);
  const [isSpecsFieldsValid, setIsSpecsFieldsValid] = useState(false);
  const [specsFields, setSpecsFields] = useState([]);

  const [grade, setGrade] = useState('A');
  const [gradeList, setGradeList] = useState(['A']);

  const [testedData, setTestedData] = useState([]);

  useEffect(() => {
    if (isAssetDetail || !open || isBulk) return;

    setLoading(true);
    getAssetDetails(assetData?.ssn)
      .then(res => {
        const splitedValues = mapValues(res?.assetTestResults, value => (
          value
            ?.split(';')
            ?.map(item => item.trim())
            ?.filter(item => item.length > 0)
        ));
        setTestedData(splitedValues);
      });
  }, [assetData, isAssetDetail, open]);

  useEffect(() => {
    isAssetDetail && setTestedData(testValues);
  }, [isAssetDetail, testValues]);

  const specsTabDetails = {
    conditionCategority: 'Input Specs',
    isSpecsTab: true,
  }

  useEffect(() => {
    if (isEmpty(assetData) && !isBulk) return;

    if (open || noDialog) {
      setLoading(true);
      getAssetTestConditions(isBulk ? 0 : assetData?.assetID || assetData?.assetId)
        .then(res => setAssetTestConditions(res))
        .finally(() => setLoading(false));
    } else {
      assetTestConditions?.length && setAssetTestConditions([]);
      isManual && setIsManual(false);
    }
  }, [open, assetData]);

  useEffect(() => {
    if (!isManual) {
      assetTestConditions[tabValue]?.isSpecsTab && setTabValue(tabValue - 1);
      setAssetTestConditions(assetTestConditions.slice(0, -1));
      return;
    }
    setAssetTestConditions([...assetTestConditions, specsTabDetails]);
  }, [isManual]);


  useEffect(() => {
    if (assetTestConditions?.length && !assetTestConditions[tabValue]?.isSpecsTab) {
      const currentTabItems = assetTestConditions?.[tabValue]?.testConditions;
      const currentTabIds = currentTabItems.map(item => item.testConditionID);
      const currentAllPassId = currentTabItems?.find(item => item?.conditionName === 'ALL-PASS')?.testConditionID;

      setFilteredValues(currentTabItems);
      setFilteredItemIds(currentTabIds)
      setSearchValue('');

      setIsAllPass(checkedItems?.includes(currentAllPassId));
      setAllPassId(currentAllPassId);
    }
  }, [assetTestConditions, tabValue, checkedTabs]);


  const handleSwitchToggleClick = (checked, testID, currentGrade) => {
    if (checked) {
      !checkedTabs?.includes(tabValue) && setCheckedTabs([...checkedTabs, tabValue]);

      let newSelectedArr;

      if (testID === allPassId || checkedItems?.includes(allPassId)) {
        const currentTabItemsFiltered = difference(checkedItems, filteredItemIds);
        newSelectedArr = [...currentTabItemsFiltered, testID];

        setCheckedItems(newSelectedArr);
        setIsAllPass(true);

        //Grade logic
        const allTestConditions = assetTestConditions?.[tabValue]?.testConditions;
        const gradeById = filter(allTestConditions, item => (
          includes(checkedItems, item.testConditionID)
        ))?.map(item => item?.grade);

        const gradeListClone = clone(gradeList);

        gradeById.forEach(gradeItem => {
          const index = gradeListClone.indexOf(gradeItem);
          if (index !== -1) {
            gradeListClone.splice(index, 1);
          }
        });

        setGradeList(gradeListClone);
        ![...gradeList, gradeById]?.length && setGradeList(['A']);

        return;
      }

      setIsAllPass(false);

      newSelectedArr = [...checkedItems, testID];
      setCheckedItems(newSelectedArr);

      setGradeList([...gradeList, currentGrade]);

    } else {
      if (testID === allPassId) {
        const removedAllPassed = checkedItems?.filter(item => item !== allPassId);
        setCheckedItems(removedAllPassed);
        setIsAllPass(false);
        return;
      }

      setCheckedItems(checkedItems?.filter(item => item !== testID));
      setCheckedTabs(checkedTabs?.filter(item => item !== tabValue));

      const gradeIndex = gradeList?.indexOf(currentGrade);

      if (gradeIndex !== -1) {
        const clonedGradeList = clone(gradeList);
        clonedGradeList?.splice(gradeIndex, 1);
        clonedGradeList?.length ? setGradeList(clonedGradeList) : setGradeList(['A']);
      }
    }
  }

  //setting fetched values as initial
  useEffect(() => {
    if (!assetTestConditions?.length || isBulk) return;

    setLoading(true);

    let fetchedGrades = ['A'];

    const checkedIds = assetTestConditions?.map((conditionObj, key) => {
      const conditionName = camelCase(conditionObj?.conditionCategority);
      const checkedList = testedData?.[conditionName] || [];

      if (!checkedList?.length) return checkedList;

      // if (checkedList?.includes('ALL-PASS')) {
      //   const match = _.find(conditionObj.testConditions, { conditionName: 'ALL-PASS' });
      //   if (key === 0) {
      //     setIsAllPass(true);
      //     setAllPassId(match.testConditionID);
      //   }
      //   return match.testConditionID;
      // }

      return _(checkedList)
        .map(name => {
          const match = _.find(conditionObj.testConditions, { conditionName: name });
          if (match === undefined || match === null) return null;
          fetchedGrades?.push(match?.grade);
          return match.testConditionID;
        })
        .compact()
        .value();
    });

    const concattedIds = concat(...checkedIds);
    setCheckedTabs(concattedIds);
    setCheckedItems(concattedIds);
    setGradeList(fetchedGrades);
    setLoading(false);
  }, [testedData, assetTestConditions]);

  useEffect(() => {
    setGrade(max(gradeList));
  }, [gradeList]);

  const onClose = () => {
    setTabValue(0);
    handleClose();
    // setCheckedItems([]);
    // setCheckedTabs([]);
  }

  const handleSubmit = async () => {
    const checkTabsLength = isManual ? assetTestConditions.length - 1 : assetTestConditions.length;
    if (checkedTabs?.length < checkTabsLength) {
      dispatch(setErrorDialogText('Please select at least one condition from all the categories.'));
      return;
    }

    if (isManual && !specsFields?.length && !isSpecsFieldsValid) {
      dispatch(setErrorDialogText('Please add at least one spec value for manual testing.'));
      return;
    }

    setLoading(true);
    if (isBulk) {
      submitBulkAssetTestConditions({
        testConditionIds: checkedItems,
        assetIds,
        grade,
      })
        .then(res => {
          dispatch(setSnackBar({
            open: true,
            message: 'Test conditions added sucessfully!',
          }));
          submitCallback(res);
          onClose();
        })
        .catch(err => {
          dispatch(setErrorDialogText('Server error occurred, please try again later.'));
        })
        .finally(() => {
          setLoading(false);
        })

      return;
    }

    submitAssetTestConditions({
      testConditionID: checkedItems,
      assetID: assetData?.assetID || assetData?.assetId,
      grade,
    })
      .then(res => {
        dispatch(setSnackBar({
          open: true,
          message: 'Test conditions added sucessfully!',
        }));

        res?.data && dispatch(updateAssetItem(res?.data));

        isAssetDetail && getAssetDetails(assetData?.ssn)
          .then(res => setUpdatedData(res));

        submitCallback(res);
        onClose();
      })
      .catch(err => {
        dispatch(setErrorDialogText('Server error occurred, please try again later.'));
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleSearch = (value = '') => {
    setSearchValue(value);
    const conditions = assetTestConditions?.[tabValue]?.testConditions;
    const res = conditions?.filter(item => item?.conditionName?.toUpperCase()?.includes(value?.toUpperCase()));
    setFilteredValues(res);
  }

  const testContent = <>
    <Box
      display='flex'
      alignItems='center'
      columnGap={.5}
      mb={2}
    >
      <Typography
        variant='p3'
        fontWeight='500'
        onClick={() => setIsManual(false)}
        sx={{cursor: 'pointer'}}
      >
        Data Erasure
      </Typography>
      <Box width='60px'>
        <SwitchToggle
          size='large'
          labelPlacement='start'
          checked={isManual}
          onChange={(e, checked) => setIsManual(checked)}
          sx={{ m: 0 }}
        />
      </Box>
      <Typography
        variant='p3'
        fontWeight='500'
        onClick={() => setIsManual(true)}
        sx={{cursor: 'pointer'}}
      >
        Manual
      </Typography>
    </Box>

    <Box
      width='100%'
      minHeight='500px'
    >
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='space-between'
        alignItems='center'
      >
        <TabsMenu
          setTabValue={setTabValue}
          tabHeaders={assetTestConditions?.map(item => item?.conditionCategority)}
          tabValue={tabValue}
        />
      </Box>

      <PaperBox
        sx={{ mt: 2 }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          flexWrap='wrap'
          rowGap={1}
        >
          {(!isBulk && !noDialog) &&
            <Box display='flex' alignItems='center' columnGap={1}>
              <Typography fontWeight='bold'>SSN:</Typography>
              <Typography component='span'>{assetData?.ssn}</Typography>
            </Box>
          }

          {!assetTestConditions?.[tabValue]?.isSpecsTab &&
            <Box
              maxWidth='250px'
              width='100%'
            >
              <InputField
                isSmallHeight
                label='Search'
                value={searchValue}
                onChange={(name, value) => handleSearch(value)}
              />
            </Box>
          }

          <AssetGrade grade={grade}/>

        </Box>
      </PaperBox>

      <PaperBox
        sx={{ mt: 1 }}
      >
        {!assetTestConditions[tabValue]?.isSpecsTab
          ?
            <Grid container spacing={2}>
              {filteredValues?.map((item) => (
                <Grid
                  key={item?.testConditionID}
                  item
                  md={3}
                  sm={4}
                  xs={12}
                >
                  <SwitchToggle
                    size='medium'
                    isCheckBox
                    disabled={loading || (isAllPass && item?.testConditionID !== allPassId)}
                    checked={checkedItems?.includes(item?.testConditionID)}
                    onChange={(e, checked) => handleSwitchToggleClick(checked, item?.testConditionID, item?.grade)}
                    label={
                      <Typography
                        variant='description'
                        fontWeight='500'
                        sx={{
                          wordBreak: 'break-word',
                          opacity: (isAllPass && item?.testConditionID !== allPassId) ? .6 : 1,
                        }}
                      >
                        {item?.conditionName?.toUpperCase()}
                      </Typography>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          :
            <SpecForm
              handleSpecChange={(specFields, isValid) => {
                setSpecsFields(specFields);
                setIsSpecsFieldsValid(isValid);
              }}
            />
        }
      </PaperBox>
    </Box>
  </>

  return <>
    {
      noDialog
      ?
        testContent
      :
        <DialogBox
          open={open}
          disableSubmitNew
          title={`Asset ${isBulk ? 'Bulk' : ''} Testing`}
          loading={loading}
          handleClose={onClose}
          handleFormSubmit={handleSubmit}
          sx={{ zIndex: 999999 }}
          maxWidth='lg'
        >
          {testContent}
        </DialogBox>
    }
  </>
}
