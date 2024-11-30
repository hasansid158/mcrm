import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { isEmpty, keys, values } from "lodash";

import useReactForm from "hooks/useReactForm";
import PaperBox from "common/ui/PaperBox";
import useScreenSize from "hooks/useScreenSize";
import DrawerHeader from "./DrawerHeader";
import formComponentsEnum from "enum/formComponentsEnum";
import TabsMenu from "common/dataDisplay/Tabs/TabsMenu";

import Drawer from "@mui/material/Drawer";
import {Box, Typography, IconButton } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { isEqualCommonData } from "utils/helperFunctions";
import { setErrorDialogText } from "redux/slices/commonSlice/commonSlice";

import UpdateForm from "components/createFormComponents/UpdateForm";

import { transitions } from "core/animations";

import SpinLoader from "common/dataDisplay/spinLoader/SpinLoader";

import DialogBox from "common/dataDisplay/dialogBox/DialogBox";

const DetailsDrawer = ({
  anchor = "right",
  open = false,
  onClose = () => {},
  data = {},
  primaryName,
  subName,
  formKey = "",
  drawerLabel,
  handleUpdate = () => {},
  replaceUpdate,
  drawerLoading = false,
  drawerFetchApiTrigger = null,
  children = null,
  contentOnTop,
  listChildren = {},
  drawerZIndex = 1200,
  sx = {},
  getCurrentTabValue = () => {},
  isDialog = false,
  dialogProps,
  ...props
}) => {
  const { isTablet } = useScreenSize();

  const [dataChanged, setDataChanged] = useState(false);
  const [currentData, setCurrentData] = useState(data);
  const [tabValue, setTabValue] = useState(0);

  const [tabContent, setTabContent] = useState([]);
  const [tabHeader, setTabHeaders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isExpended, setIsExpended] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentTabValue(tabValue);
  }, [tabValue]);

  useEffect(() => {
    setLoading(drawerLoading);
  }, [drawerLoading]);

  useEffect(() => {
    if (isEmpty(listChildren)) return;

    setTabHeaders(keys(listChildren));

    setTabContent([
      <UpdateForm
        formKey={formKey}
        data={values(listChildren)?.[0] || currentData}
        handleUpdate={handleUpdate}
        replaceUpdate={replaceUpdate}
        isUpdate={open}
      />,
      ...values(listChildren)?.slice(1),
    ]);
  }, [listChildren]);

  useEffect(() => {
    if (!open) {
      setTabValue(0);
      setCurrentData({});
      return;
    }

    if (!drawerFetchApiTrigger) return;

    const fetchCall = async () => {
      setLoading(true);
      const apiRes = await drawerFetchApiTrigger(data);
      setLoading(false);

      if (apiRes === false) {
        dispatch(setErrorDialogText('Error fetching data, please try again later.'));
        onClose();
      }
    }

    fetchCall();
  }, [open]);

  const {
    formData,
    reset,
    useWatch,
  } = useReactForm();

  useEffect(() => {
    if (isEmpty(data) || !open) return;

    reset(open ? data : {});
    setCurrentData(open ? data : {});
  }, [data, open]);

  const watchedData = useWatch({control: formData.control})

  useEffect(() => {
    !dataChanged && setDataChanged(!isEqualCommonData(currentData, watchedData))
  }, [watchedData]);

  if (isDialog) return (
    <DialogBox
      open={open}
      handleClose={onClose}
      loading={loading}
      disableFormFooter
      title={drawerLabel}
    >
      <PaperBox sx={{ px: 1 }}>
        <UpdateForm
          formKey={formKey}
          data={currentData}
          handleUpdate={handleUpdate}
          replaceUpdate={replaceUpdate}
          isUpdate={open}
        />
      </PaperBox>
    </DialogBox>
  )

  const DrawerTopLabel = () => (
    <Box mb={2} display='flex' alignItems='center' justifyContent='space-between' columnGap={1}>
      {drawerLabel &&
        <Box
          sx={{
            backgroundColor: 'common.backgroundDarkBlue',
            width: '100%',
            minHeight: '46px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            p: '12px',
          }}
        >
          <Typography variant='pb' color='white'>
            {drawerLabel}
          </Typography>
        </Box>
      }

      <Box display='flex' alignItems='center' columnGap={1}>
        <IconButton
          size='small'
          onClick={() => setIsExpended(!isExpended)}
          color='secondary'
        >
          <OpenInFullIcon sx={{width: '22px', height: '22px'}}/>
        </IconButton>
        <IconButton
          size='small'
          onClick={onClose}
          color='primary'
        >
          <CloseRoundedIcon sx={{width: '24px', height: '24px'}}/>
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={anchor}
      sx={{
        zIndex: drawerZIndex,
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          width: isExpended ? '100vw' : isTablet ? '80vw' : '60vw',
          background: 'white',
          py: 3,
          px: 2,
          transition: transitions().short,
          position: 'relative',
        }}
      >
        <SpinLoader loading={loading} />

        {isEmpty(listChildren)
        ?
          <>
            <DrawerTopLabel/>

            {children && children}

            <UpdateForm
              formKey={formKey}
              data={currentData}
              handleUpdate={handleUpdate}
              replaceUpdate={replaceUpdate}
              isUpdate={open}
            />
          </>

        :

          <>
            <Box
              position='fixed'
              top={0}
              right={0}
              width='inherit'
              px={2}
              pt={1}
              zIndex={2}
              backgroundColor='white'
            >
              <DrawerTopLabel/>

              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                mb={1}
              >
                {!!tabHeader?.length &&
                  <TabsMenu
                    tabHeaders={tabHeader}
                    setTabValue={setTabValue}
                    tabValue={tabValue}
                    isSmall
                  />
                }
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: 'common.backgroundGrey',
                mt: 11,
                p: 2,
                border: '1px solid #A9ABB1',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: contentOnTop ? 'column-reverse' : 'column',
              }}
            >
              <Box>{tabContent?.[tabValue]}</Box>

              {/* <Content
                selectedId={selectedId}
                setTabHeaders={setTabHeaders}
                tabHeaders={tabHeaders}
                tabValue={tabValue}
              /> */}
            </Box>
          </>
        }
      </Box>
    </Drawer>
  );
};

export default DetailsDrawer;
