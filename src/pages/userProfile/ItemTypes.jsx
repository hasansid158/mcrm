import React, { useState, useEffect } from "react";

import { itemTypesColumn } from "./componenets/tableColumns/itemTypesColumn";
import ProfileTable from "./componenets/ProfileTable";

import MakeForm from "./componenets/forms/productType/MakeForm";
import ModelForm from "./componenets/forms/productType/ModelForm";
import ProductTypeForm from "./componenets/forms/productType/ProductTypeForm";

import { getAllModels } from "api/profileApis";

import { useDispatch, useSelector } from "react-redux";

import PopperMenu from "common/navigation/popperMenu/PopperMenu";
import { MenuItem, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import DialogBox from "common/dataDisplay/dialogBox/DialogBox";

import useReactForm from "hooks/useReactForm";

import { camelCaseToSpace } from "utils/textFormatUtils";

import PaperBox from "common/ui/PaperBox";

import { createModel, createItemType } from "api/profileApis";
import { fetchItemTypes, fetchMakes } from "redux/slices/listSlice/listSlice";
import { setErrorDialogText, setSnackBar } from "redux/slices/commonSlice/commonSlice";

const ItemTypes = () => {
  const dispatch = useDispatch();
  const [buttonAnchor, setButtonAnchor] = useState(null);
  const [loading, setLoading] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formType, setFormType] = useState('make');

  const { accountId } = useSelector(state => state.userDetails);

  const {
    formData,
    reset,
    handleSubmit,
  } = useReactForm();

  const formTypeMap = {
    make: 'make',
    model: 'model',
    productType: 'productType',
  }

  const productFormMap = {
    'make': <MakeForm formData={formData}/>,
    'model': <ModelForm formData={formData}/>,
    'productType': <ProductTypeForm formData={formData}/>,
  }

  const onCreateSubmit = async (data) => {
    setLoading(true);

    switch (formType) {
      case formTypeMap.make:
        // after api success fetch makes and set loading false
        setLoading(false);
        console.log(data);

        break;

      case formTypeMap.model:
        createModel(data)
          ?.then(res => {
            dispatch(setSnackBar({
              open: true,
              message: `Model has been created sucessfully`,
            }));
          })
          ?.catch(() => setErrorDialogText('Server error occurred, please try again later.'))
          ?.finally(() => {
            setLoading(false);
            setDialogOpen(false);
          });
        break;

      case formTypeMap.productType:
        createItemType({...data, accountId })
        ?.then(async () => {
          await dispatch(fetchItemTypes());
          dispatch(setSnackBar({
            open: true,
            message: `Product Type has been created sucessfully`,
          }));
        })
        ?.catch(() => setErrorDialogText('Server error occurred, please try again later.'))
        ?.finally(() => {
          setLoading(false);
          setDialogOpen(false);
        });

        break;

      default:
        break;
    }
  }

  return <>
    <ProfileTable
      getApi={getAllModels}
      // createApi={createWarehouse}
      // updateApi={updateWarehouse}
      columns={itemTypesColumn}

      title='Item Types'

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search",
          placeholder: "Search item type...",
        }
      ]}
      onlyGlobalFilter

      dialogSize='xs'

      replaceCreateButton={
        <Button
          variant='contained'
          onClick={e => setButtonAnchor(e?.currentTarget)}
          startIcon={<AddIcon/>}
          sx={{ minWidth: 140 }}
        >
          Create
        </Button>
      }
      noEditCol
      isloading={loading}
    />

    <PopperMenu
      open={!!buttonAnchor}
      anchorEl={buttonAnchor}
      onClickAway={() => setButtonAnchor(null)}
      placement='bottom'
    >
      <MenuItem onClick={() => {
        setFormType(formTypeMap.make);
        setDialogOpen(true);
      }}>
        <Box>
          <AddIcon/> Make
        </Box>
      </MenuItem>
      <MenuItem onClick={() => {
        setFormType(formTypeMap.model);
        setDialogOpen(true);
      }}>
        <Box>
          <AddIcon/> Model
        </Box>
      </MenuItem>
      <MenuItem onClick={() => {
        setFormType(formTypeMap.productType);
        setDialogOpen(true);
      }}>
        <Box>
          <AddIcon/> Item Type
        </Box>
      </MenuItem>
    </PopperMenu>

    <DialogBox
      title={`Create ${camelCaseToSpace(formType || '')}`}
      maxWidth='xs'
      open={dialogOpen}
      handleClose={() => {
        setDialogOpen(false);
        reset({});
      }}
      disableSubmitNew
      handleFormSubmit={() => handleSubmit(onCreateSubmit)()}
      loading={loading}
    >
      <PaperBox>
        {productFormMap?.[formType] || ''}
      </PaperBox>
    </DialogBox>
  </>;
}

export default ItemTypes;
