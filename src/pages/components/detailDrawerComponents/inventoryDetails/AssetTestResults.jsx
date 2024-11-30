import React, { useState, useEffect } from 'react';

import { keys, values, mapValues } from 'lodash';

import PaperBox from 'common/ui/PaperBox';
import { Typography, Box, Grid, Chip, Button } from '@mui/material';
import { camelCaseToSpace } from 'utils/textFormatUtils';

import AssetTestDialog from 'pages/components/assets/testComponents/AssetTestDialog';
import AssetGrade from 'pages/components/assets/testComponents/AssetGrade';

const AssetTestResults = ({
  testData = [],
  assetData,
}) => {
  const [labels, setLabels] = useState([]);
  const [testValues, setTestValues] = useState([]);
  const [testDialogValues, setTestDialogValues] = useState([]);
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [assetGrade, setAssetGrade] = useState('');

  const splitValues = (data) => (
    mapValues(data, value => (
      value
        ?.split(';')
        ?.map(item => item.trim())
        ?.filter(item => item.length > 0)
    ))
  )

  useEffect(() => {
    setAssetGrade(assetData?.grade);
  }, [assetData]);

  useEffect(() => {
    setLabels(keys(testData));
    setTestValues(values(testData));
    setTestDialogValues(splitValues(testData));
  }, [testData]);

  return <>
    <Box
      mb={2}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
    >
      <Button
        variant='contained'
        onClick={() => setOpenTestDialog(true)}
        sx={{minWidth: '140px'}}
      >
        {!!assetGrade ? 'Re-test' : 'Test'}
      </Button>
      <Box>
        {assetGrade && <AssetGrade grade={assetGrade}/>}
      </Box>
    </Box>

    <AssetTestDialog
      open={openTestDialog}
      assetData={assetData}
      testValues={testDialogValues}
      handleClose={() => setOpenTestDialog(false)}
      isAssetDetail
      setUpdatedData={updatedTestData => {
        const {
          assetTestResults,
          assetInfo: { grade },
        } = updatedTestData;

        setLabels(keys(assetTestResults));
        setTestValues(values(assetTestResults));
        setAssetGrade(grade);
        setTestDialogValues(splitValues(assetTestResults));
      }}
    />

    <Grid rowSpacing={1} columnSpacing={1} container>
      {!assetGrade
      ?
        <Grid
          item
          xs={12}
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='200px'
        >
          <Typography variant='h5' fontWeight='400'>
            Asset <Box component='span' fontWeight='500'>{assetData?.ssn}</Box> is not tested yet
          </Typography>
        </Grid>
      :
        labels?.map((label, key) => (
          <Grid
            key={key}
            item
            sm={6}
            xs={12}
          >
            <PaperBox
              sx={{
                height: '100%',
                minHeight: '120px',
                p: {md: 2, lg: '20px'},
                background: 'white',
              }}
            >
              <Box mb={2}>
                <Typography variant='pb'>
                  {camelCaseToSpace(label)}
                </Typography>
              </Box>
              <Box
                display='flex'
                flexWrap='wrap'
                gap={1}
              >
                {testValues?.[key]?.split(';')
                  ?.slice(0, -1)?.map((test, idx) => (
                    <Chip
                      key={idx}
                      label={
                        <Typography key={idx} variant='p3' color='secondary.main'>
                          {test}
                        </Typography>
                      }
                      sx={{
                        height: 'auto',
                        '& .MuiChip-label': {
                          display: 'block',
                          whiteSpace: 'normal',
                        },
                        p: .5,
                        background: theme =>
                          test?.toLowerCase() === 'all-pass'
                            ? theme.palette.common.highGreen
                            : '#FF55381A',
                      }}
                      size='small'
                    />
                ))}
              </Box>
            </PaperBox>
          </Grid>
        ))
      }
    </Grid>
  </>;
}

export default AssetTestResults;
