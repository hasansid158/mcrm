
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CardContent, CardHeader, Chip, Link, TextField } from '@mui/material';
import { Avatar, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import PieChartIcon from '@mui/icons-material/PieChart';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';




const rows = [
    { id: 4987, status: 'paid', total: '$3428', issue: '13 May 2023' },
    { id: 4988, status: 'downloaded', total: '$5219', issue: '17 May 2023' },
    { id: 4989, status: 'paid', total: '$3719', issue: '19 May 2023' },
    { id: 4990, status: 'sent', total: '$4749', issue: '06 May 2023' },
    { id: 4991, status: 'draft', total: '$4056', issue: '08 May 2023' },
    { id: 4992, status: 'partial_payment', total: '$4056', issue: '08 May 2023' },
    { id: 4993, status: 'paid', total: '$3428', issue: '13 May 2023' },
    { id: 4994, status: 'downloaded', total: '$5219', issue: '17 May 2023' },
    { id: 4995, status: 'paid', total: '$3719', issue: '19 May 2023' },
    { id: 4996, status: 'sent', total: '$47499', issue: '06 May 2023' },
    { id: 4997, status: 'draft', total: '$4056', issue: '08 May 2023' },
    { id: 4998, status: 'partial_payment', total: '$4056', issue: '08 May 2023' },
];

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 130,
        renderCell: (params) => {
            return <Link>#{params.row.id}</Link>
        },
    },
    {
        field: 'status',
        headerName: 'STATUS',
        flex: 1,
        // width: 150,
        renderCell: (params) => {
            if (params.row.status === 'paid')
                return <Box sx={{ borderRadius: '50%', width: '28px', height: '28px', p: '2px', bgcolor: '#afcdb173', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ fontSize: '14px', color: '#2e7d32' }} /></Box>
            else if (params.row.status === 'downloaded')
                return <Box sx={{ borderRadius: '50%', width: '28px', height: '28px', p: '2px', bgcolor: 'rgba(22, 177, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowDownwardIcon sx={{ fontSize: '14px', color: 'rgb(22, 177, 255)' }} /></Box>
            else if (params.row.status === 'sent')
                return <Box sx={{ borderRadius: '50%', width: '28px', height: '28px', p: '2px', bgcolor: 'rgba(138, 141, 147, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SendIcon sx={{ fontSize: '14px', color: 'rgb(138, 141, 147)' }} /></Box>
            else if (params.row.status === 'draft')
                return <Box sx={{ borderRadius: '50%', width: '28px', height: '28px', p: '2px', bgcolor: 'rgba(145, 85, 253, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SaveIcon sx={{ fontSize: '14px', color: 'rgb(145, 85, 253)' }} /></Box>
            else if (params.row.status === 'partial_payment')
                return <Box sx={{ borderRadius: '50%', width: '28px', height: '28px', p: '2px', bgcolor: 'rgba(255, 180, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PieChartIcon sx={{ fontSize: '14px', color: 'rgb(255, 180, 0)' }} /></Box>
            return <>{params.row.status}</>
        },
        renderHeader: (params) => {
            return <ShowChartIcon />
        }
    },
    {
        field: 'total',
        headerName: 'TOTAL',
        flex: 1
        // width: 150,
    },
    {
        field: 'issue',
        headerName: 'ISSUE DATE',
        flex: 1
        // width: 150,
    },
    {
        field: 'action',
        headerName: 'ACTION',
        width: 110,
        renderCell: (params) => {
            return <Stack direction="row" alignItems="center" spacing={'2px'}>
                <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                    <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </Stack>
        }
    }
];

export default function InvoiceList() {
    return (
        <Box>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <CardHeader
                    titleTypographyProps={{ fontWeight: 400 }}
                    title='Invoice List'
                    sx={{p: '18px'}}
                >
                </CardHeader>
                <Stack mr={2} my={2}>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button variant="contained" {...bindTrigger(popupState)} endIcon={<KeyboardArrowDownIcon />}>
                                    Export
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={popupState.close}>PDF</MenuItem>
                                    <MenuItem onClick={popupState.close}>CSV</MenuItem>
                                    <MenuItem onClick={popupState.close}>XLSL</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </Stack>
            </Stack>
            <Box sx={{ height: 422, width: '100%' }}>
                <DataGrid
                    sx={{
                        borderRadius: 0,
                        borderTop: 0,
                        '& .MuiDataGrid-columnHeaders': { backgroundColor: "rgb(249, 250, 252)" },
                        "& .MuiDataGrid-row:hover": { backgroundColor: "rgb(249, 250, 252)" }
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 6,
                            },
                        },
                    }}
                    pageSizeOptions={[6]}
                />
            </Box>
        </Box>
    );
}