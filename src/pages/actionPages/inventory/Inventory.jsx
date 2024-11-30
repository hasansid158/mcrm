import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import PaperBox from 'common/ui/PaperBox';
import DataTable from 'common/dataDisplay/table/DataTable';
import DetailsDrawer from 'components/detailsDrawer/DetailsDrawer';

import { detailColumn, homeColumns } from 'enum/tableColumnEnum';
import { graColumns } from 'pages/components/gra/graColumnEnum';
import createFormEnum from 'enum/createFormEnum';

import { fetchAllLoads } from "redux/slices/actionSlice/LoadsSlice";
import { fetchAllProducts } from 'redux/slices/actionSlice/productsSlice';
import { fetchAllAssets } from 'redux/slices/actionSlice/assetSlice';
import { fetchGraList } from 'redux/slices/detailSlice/graListSlice';
import styles from './index.module.scss'

import { loadsColumns } from "components/tableColumns/loadsColumns";
import { assetsColumns } from 'components/tableColumns/assetsColumns';
import { productsColumns } from 'components/tableColumns/productsColumns';

const Inventory = () => {
  const dispatch = useDispatch();
  const {
    loads,
    products,
    assets,
    graList,
  } = useSelector(state => state.actions);

  const [formKey, setFormKey] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const apisToCall = [];

    !loads?.length && apisToCall.push(dispatch(fetchAllLoads()));
    !products?.length && apisToCall.push(dispatch(fetchAllProducts()));
    !assets?.length && apisToCall.push(dispatch(fetchAllAssets()));
    !graList?.length && apisToCall.push(dispatch(fetchGraList()));

    const callFetch = async () => {
      await Promise.all(apisToCall)
      setLoading(false);
    }
    callFetch();

  }, []);

  const smallBoxes = [
    { heading: 'Loads', color: '#07CCD2', count: loads?.length || 0 },
    { heading: 'Assets', color: '#F76A63', count: assets?.length || 0 },
    { heading: 'Products', color: '#46C79E', count: products?.length || 0 },
    { heading: 'GRAs', color: '#FFCB5B', count: graList?.length || 0 },
  ];

  const handleRowClick = (data, key) => {
    setDetailData(data.row)
    setFormKey(key);
    //check for selected table to pass name
  };

  return (
    <Box>
      <DetailsDrawer
        open={!!formKey}
        onClose={() => setFormKey(null)}
        data={detailData}
        formKey={formKey}
        createLabel={`Create ${formKey}`}
      />

      <Box mb={1}>
        <Typography variant="h4">Inventory</Typography>
      </Box>

      <Grid container spacing={2}>
        {smallBoxes?.map((item, key) => (
          <Grid item md={3} sm={6} xs={12} key={key}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              bgcolor: item.color,
              borderRadius: 1,
              px: 2,
              py: 3
            }}>
              <Typography
                variant='subtitle1'
                className={`${styles.greyText} poppins-font`}
              >{item.heading}</Typography>
              <Typography
                variant='h3'
                className={`${styles.darkText} outfit-font`}
              >
                ${item.count}
              </Typography>
            </Box>
          </Grid>
        ))}


        <Grid item xs={12}>
          {/* <PaperBox label="Loads"> */}
          <Paper
            sx={{
              px: { xs: 1, sm: 2, md: 2, lg: 4 }, py: { xs: 1, sm: 2, md: 2 }, pl: 2,
              '& .status': {
                color: '#34B86D',
              },
            }}
          >
            <Typography
              className={`lora-font ${styles.darkText}`}
              sx={{mb: 1}}
              variant='h4'
            >
              Loads
            </Typography>
            <DataTable
              rowData={loads}
              columns={loadsColumns()}
              onRowClick={(data) => handleRowClick(data, createFormEnum.loads)}
              loading={loading}
              height={'416px'}
            />
          </Paper>
          {/* </PaperBox> */}
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              px: { xs: 1, sm: 2, md: 2, lg: 4 }, py: { xs: 1, sm: 2, md: 2 }, pl: 2,
              '& .status': {
                color: '#34B86D',
              },
            }}
          >
            <Typography
              className={`lora-font ${styles.darkText}`}
              variant='h4'
              sx={{mb: 1}}
            >
              Assets
            </Typography>
            <DataTable
              rowData={assets}
              columns={assetsColumns()}
              onRowClick={(data) => handleRowClick(data, createFormEnum.assets)}
              loading={loading}
              height={'416px'}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              px: { xs: 1, sm: 2, md: 2, lg: 4 }, py: { xs: 1, sm: 2, md: 2 }, pl: 2,
            }}
          >
            <Typography
              className={`lora-font ${styles.darkText}`}
              variant='h4'
              sx={{mb: 1}}
            >
              Products
            </Typography>
            <DataTable
              rowData={products}
              columns={productsColumns()}
              onRowClick={(data) => handleRowClick(data, createFormEnum.products)}
              loading={loading}
              height={'416px'}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              px: { xs: 1, sm: 2, md: 2, lg: 4 }, py: { xs: 1, sm: 2, md: 2 }, pl: 2,
            }}
          >
            <Typography
              className={`lora-font ${styles.darkText}`}
              variant='h4'
              sx={{mb: 1}}
            >
              GRAs
            </Typography>
            <DataTable
              rowData={graList}
              columns={graColumns}
              // onRowClick={(data) => handleRowClick(data, createFormEnum.deals)}
              loading={loading}
              height={'416px'}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Inventory;
