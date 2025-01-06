import React, { useState, useEffect, memo, useCallback } from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Selector from 'common/input/Selector';
import { arrayToValueLabel } from 'utils/helperFunctions';

import SpinLoader from '../spinLoader/SpinLoader';

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      page={page + 1}
      variant="outlined"
      size="small"
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      sx={{
        // mt: 2,
        '& .MuiPaginationItem-root': {
          bgcolor: '#F8F9FB',
          height: { lg: '40px' },
          width: { lg: '40px' },
          borderRadius: '50%',
        },
        '& .Mui-selected': {
          bgcolor: 'primary.main',
          color: 'white',
        },
      }}
    />
  );
}

function CustomFooter({ paginationModel, setPaginationModel }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'space-between' },
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        flexWrap: 'wrap',
        width: '100%',
        gap: 2,
        mt: 2,
        px: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography
          sx={{ width: '95px' }}
          variant="description"
          fontWeight="600"
        >
          Rows per page
        </Typography>
        <Selector
          sx={{ width: '70px' }}
          isSmallHeight
          value={paginationModel.pageSize}
          onChange={(name, value) => {
            setPaginationModel((prev) => ({
              ...prev,
              pageSize: value,
            }));
          }}
          required
          disableStar
          selectorData={arrayToValueLabel(PAGE_SIZE_OPTIONS)}
        />
      </Box>

      <CustomPagination />
    </Box>
  );
}

const DataTable = ({
  density = 'compact',
  height = 'calc(100dvh - 200px)',
  maxHeight = 'unset',
  minHeight = 'unset',
  hideFooter = false,
  columns = [],
  rowData,
  fullBorder = false,
  autoHeight = false,
  sx,
  showPageSize = false,
  initialState,
  isFullTable = false,
  invisibleColumns = {},
  slots = {},
  width = '100%',
  defaultPageSize = 20,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const [rows, setRows] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: defaultPageSize,
    page: 0,
  });

  useEffect(() => {
    if (!rowData?.id) {
      const rowWithId = rowData?.map((data, idx) => ({
        ...data,
        id: idx,
      }));
      setRows(rowWithId || []);
    } else {
      setRows(rowData);
    }
  }, [rowData]);

  const CustomLoading = useCallback(
    () => (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <SpinLoader loading noBlur />
      </Box>
    ),
    [],
  );

  return (
    <Box
      sx={{
        height: autoHeight ? 'unset' : height,
        maxHeight: maxHeight,
        minHeight: minHeight,
        width: width,
      }}
    >
      <DataGrid
        slots={{
          pagination: () => (
            <CustomFooter
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
          ),
          ...slots,
          loadingOverlay: CustomLoading,
        }}
        rows={rows}
        columns={columns}
        autoHeight={autoHeight}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          columns: {
            columnVisibilityModel: {
              ...invisibleColumns,
              id: false,
            },
          },
          ...initialState,
        }}
        pageSizeOptions={isFullTable || showPageSize ? PAGE_SIZE_OPTIONS : []}
        disableRowSelectionOnClick
        disableSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        hideFooter={hideFooter ? hideFooter : rows?.length <= 10}
        density={isFullTable ? 'standard' : density}
        loading={loading || disabled}
        sx={{
          fontSize: '11px',
          ...(fullBorder
            ? {}
            : {
                border: 'unset',
              }),
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'common.backgroundGrey',
          },
          borderRadius: 'unset',
          '& .MuiDataGrid-footerContainer': {
            border: 'none',
          },
          '& .MuiDataGrid-main': {
            border: 1,
            borderColor: 'common.borderGrey',
            borderRadius: '12px',
          },
          '& .MuiDataGrid-cell': {
            px: 0.5,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            backgroundColor: 'white',
          },
          ...sx,
        }}
        {...rest}
      />
    </Box>
  );
};

export default memo(DataTable);
