import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Paper,
  Typography,
  Skeleton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import PaperBox from 'common/ui/PaperBox';
import DataTable from 'common/dataDisplay/table/DataTable';
import DetailsDrawer from 'components/detailsDrawer/DetailsDrawer';

// import { detailColumn, homeColumns } from 'enum/tableColumnEnum';
import { homeColumns } from 'components/tableColumns/homeColumns';
import { graColumns } from 'pages/components/gra/graColumnEnum';
import createFormEnum from 'enum/createFormEnum';

import { camelCaseToSpace } from 'utils/textFormatUtils';

import { isEmpty, keys, times } from 'lodash';

import { fetchHomepageData } from 'redux/slices/actionSlice/homeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const {
    home,
    loads,
    products,
    assets,
    graList,
  } = useSelector(state => state.actions);

  const [formKey, setFormKey] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [labelKeys, setLabelKeys] = useState([]);

  useEffect(() => {
    if (!isEmpty(home)) {
      setLabelKeys(keys(home));
      return;
    };

    setLoading(true);
    dispatch(fetchHomepageData()).then(() => {
      setLoading(false);
    });


  }, [home]);

  const smallBoxes = [
    // { heading: 'Loads', color: '#07CCD2', count: loads?.length || 0 },
    // { heading: 'Assets', color: '#F76A63', count: assets?.length || 0 },
    // { heading: 'Products', color: '#46C79E', count: products?.length || 0 },
    // { heading: 'GRAs', color: '#FFCB5B', count: graList?.length || 0 },
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

      {/* <Box mb={1}>
        <Typography variant="h4">Home</Typography>
      </Box> */}

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
                // className={`${styles.greyText} poppins-font`}
              >{item.heading}</Typography>
              <Typography
                variant='h3'
                // className={`${styles.darkText} outfit-font`}
              >
                ${item.count}
              </Typography>
            </Box>
          </Grid>
        ))}

        {isEmpty(labelKeys) &&
          <Box
            display='flex'
            flexDirection='column'
            width='100%'
            mt={3}
            mb={2}
            pl={2}
            rowGap={2}
          >
            {times(4, (index) => (
              <Skeleton
                key={index}
                animation="wave"
                variant="rounded"
                width='100%'
                height={480}
              />
            ))}
          </Box>
        }

        {labelKeys?.map((label, key) => (
          <Grid item xs={12} key={key}>
            <Paper
              sx={{
                px: { xs: 1, sm: 2, md: 2, lg: 4 }, py: { xs: 1, sm: 2, md: 2 }, pl: 2,
                '& .status': {
                  color: '#34B86D',
                },
              }}
            >
              <Typography
                // className={`lora-font ${styles.darkText}`}
                variant='h4'
                sx={{
                  mb: 1,
                  '&:hover': {
                    width: 'fit-content',
                    textDecoration: 'underline',
                    color: 'primary.main',
                    cursor: 'pointer',
                  }
                }}
              >
                {camelCaseToSpace(label)}
              </Typography>
              <DataTable
                rowData={home?.[label]}
                columns={homeColumns?.[label]}
                onRowClick={(data) => handleRowClick(data, createFormEnum?.[label])}
                loading={loading}
                height={'416px'}
              />
            </Paper>
          </Grid>
        ))
        }
      </Grid>
    </Box>
  );
}

export default Home;
