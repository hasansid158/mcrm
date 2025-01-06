import React, { useEffect, useState } from 'react';

import { Button, MenuItem, Typography, Box } from '@mui/material';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import SearchSelect from 'common/input/SearchSelect';

import { getLoadsList } from 'api/listApis';
import { useSelector, useDispatch } from 'react-redux';

import useReactForm from 'hooks/useReactForm';
import { map, find } from 'lodash';

import { attachAssetToLoad } from 'api/masterApi';

import {
  setErrorDialogText,
  setSnackBar,
} from 'redux/slices/commonSlice/commonSlice';
import { fetchAllAssets } from 'redux/slices/actionSlice/assetSlice';

import CreateDialog from 'components/createFormComponents/createForms/CreateDialog';
import createFormEnum from 'enum/createFormEnum';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const AddToLoad = ({
  selectedAssets = [],
  setTableLoading = () => {},
  buttonLabel = 'Add to load',
  buttonProps,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loadList, setLoadList] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { userProjects = [] } = useSelector((state) => state?.userDetails);
  const { assets } = useSelector((state) => state.actions);

  const dispatch = useDispatch();

  const { formData, handleSubmit, reset } = useReactForm({});

  useEffect(() => {
    if (!open) return;
    reset();
    setLoadList(null);

    if (!selectedAssets?.length) {
      dispatch(
        setErrorDialogText('Please select at least one asset to proceed.'),
      );
      setOpen(false);
      return;
    }
  }, [selectedAssets, open]);

  const handleProjectChange = async (name, value) => {
    if (!value) return;
    setLoading(true);

    getLoadsList([value])
      .then((res) => setLoadList(res))
      .catch((err) => {
        console.log(err);
        dispatch(
          setErrorDialogText('Error fetching loads, please try again later.'),
        );
        setOpen(false);
      })
      .finally(() => setLoading(false));
  };

  const handleAttach = (data) => {
    setLoading(true);

    attachAssetToLoad({
      loadId: data?.loadId,
      assetIds: selectedAssets,
    })
      .then(() => {
        const loadObject = find(loadList, {
          id: formData?.getValues?.('loadId'),
        });
        const loadValue = loadObject?.value || null;

        dispatch(
          setSnackBar({
            open: true,
            message: `Assets successfully added to load ${loadValue}`,
          }),
        );
        //resync assets
        setTableLoading(true);
        dispatch(fetchAllAssets()).finally(() => setTableLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setErrorDialogText('Error attaching loads, please try again later.'),
        );
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <>
      <Box onClick={() => setOpen(true)} display="flex" alignItems="center">
        <AddCircleRoundedIcon />
        {buttonLabel}
      </Box>

      <DialogBox
        open={open}
        handleClose={() => setOpen(false)}
        title="Attach assets to Load"
        maxWidth="xs"
        loading={isLoading}
        footerItems={
          <Button
            variant="contained"
            onClick={() => handleSubmit(handleAttach)()}
          >
            Attach
          </Button>
        }
      >
        <Box
          p={2}
          display="flex"
          flexDirection="column"
          rowGap={3}
          sx={{
            backgroundColor: 'common.backgroundGrey',
            borderRadius: 1,
          }}
        >
          <SearchSelect
            searchSelectData={userProjects}
            label="Select Project"
            name="projectId"
            required
            formData={formData}
            onChange={handleProjectChange}
          />

          {!!loadList && (
            <Box
              display="flex"
              columnGap={2}
              rowGap={2}
              flexWrap="wrap"
              alignItems="center"
            >
              <Box width="100%" flex={1}>
                <SearchSelect
                  searchSelectData={loadList}
                  label="Select Load"
                  name="loadId"
                  formData={formData}
                  required
                />
              </Box>

              <Button
                sx={{
                  maxWidth: '128px',
                }}
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setIsCreateOpen(true);
                  reset();
                  setLoadList(null);
                }}
              >
                Add new Load
              </Button>
            </Box>
          )}
        </Box>
      </DialogBox>

      <CreateDialog
        isDialogOpen={isCreateOpen}
        handleClose={() => setIsCreateOpen(false)}
        formKey={createFormEnum.loads}
        title={'Create Load'}
        label="Loads"
      />
    </>
  );
};

export default AddToLoad;
