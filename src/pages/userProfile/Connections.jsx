import { CardContent, Stack, Typography, Box, Switch, Avatar, Link, Button, Paper } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';

const connectionList = [
    {
        logo: 'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/logos/google.png',
        title: 'Google',
        subtitle: 'Calendar and Contacts',
        allow: true,
    },
    {
        logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iIzFmYzBlNyIgZD0iTTEyOC4wMDMgMjU2QzE5OC42OTMgMjU2IDI1NiAxOTguNjg5IDI1NiAxMjhDMjU2IDU3LjMgMTk4LjY5OSAwIDEyOC4wMDMgMFMwIDU3LjMgMCAxMjhjMCA3MC42ODkgNTcuMzA3IDEyOCAxMjguMDAzIDEyOCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im02Mi4zNjcgMTI3Ljk2OGwyMS44LTIxLjkwMmEzLjkxMyAzLjkxMyAwIDAgMC0yLjc4Mi02LjY1NmMtMS4wNTIgMC0yLjAzNi40MS0yLjc3NiAxLjE2Nkw1Ni44MjEgMTIyLjM4bC0yMS44NzQtMjEuODQ1YTMuOSAzLjkgMCAwIDAtMi43Ni0xLjEyNmEzLjkwOCAzLjkwOCAwIDAgMC0yLjczNiA2LjY5NWwyMS44IDIxLjgyOWwtMjEuNzg4IDIxLjg0NWMtLjc2My43NjItMS4xODQgMS43NTItMS4xODQgMi44MDVhMy45MTMgMy45MTMgMCAwIDAgMy45MDkgMy45MTRhMy44NyAzLjg3IDAgMCAwIDIuNzU5LTEuMTM4bDIxLjg0NS0yMS44NTdsMjEuNzYgMjEuNzcxYy43NzQuNzk3IDEuNzY0IDEuMjI0IDIuODMzIDEuMjI0YTMuOTEgMy45MSAwIDAgMCAzLjkwMy0zLjkxNGMwLTEuMDQxLS4zOTgtMi4wMi0xLjEzOC0yLjc2bC0yMS43ODgtMjEuODc5em0xMjkuNTk5LS4wMDZhNy4xMTQgNy4xMTQgMCAwIDAgNy4xMTEgNy4xMTFjMy45MDMgMCA3LjA4OC0zLjE4NiA3LjA4OC03LjExYzAtMy45MjYtMy4xODUtNy4xMTItNy4wOTQtNy4xMTJjLTMuOTA4IDAtNy4wODggMy4xODYtNy4wODggNy4xMTF6bS0xMy40NTQgMGMwLTExLjM1IDkuMjE2LTIwLjU5NCAyMC41Ni0yMC41OTRjMTEuMzIgMCAyMC41NTMgOS4yNDUgMjAuNTUzIDIwLjU5NHMtOS4yMjcgMjAuNTk0LTIwLjU1NCAyMC41OTRjLTExLjMzOCAwLTIwLjU2LTkuMjMzLTIwLjU2LTIwLjU5NG0tOC4wOSAwYzAgMTUuODE1IDEyLjg1NyAyOC42OTUgMjguNjUgMjguNjk1czI4LjY0OS0xMi44NjggMjguNjQ5LTI4LjY5YzAtMTUuODE0LTEyLjg1Ny0yOC42OTQtMjguNjUtMjguNjk0Yy0xNS43OTggMC0yOC42NDkgMTIuODc0LTI4LjY0OSAyOC42OTV6bS0yLjAzLTI4LjJoLTEuMTk2Yy0zLjYxMiAwLTcuMDk0IDEuMTM4LTEwIDMuMzg1Yy0uMzk5LTEuNzQtMS45NjktMy4wNzItMy44MzUtMy4wNzJhMy44NyAzLjg3IDAgMCAwLTMuODY4IDMuODkxbC4wMTEgNDguMzI3YzAgMi4xNDUgMS43NjQgMy44OTIgMy44OTcgMy44OTJhMy45MTQgMy45MTQgMCAwIDAgMy45MDgtMy45MDN2LTI5LjcxOWMwLTkuODk4LjkxLTEzLjkwMyA5LjM3NS0xNC45NjFjLjc5Ny0uMDk3IDEuNjM5LS4wOCAxLjY1LS4wOGMyLjMxLS4wODUgMy45Ni0xLjY4NCAzLjk2LTMuODRhMy45MjMgMy45MjMgMCAwIDAtMy45MjYtMy45MTR6bS03NS4wMTUgMjMuNDg0YzAtLjExNC4wMTItLjIyOC4wMTctLjMzYzIuMjY1LTguOTg4IDEwLjM4OC0xNS42MjcgMjAuMDU0LTE1LjYyN2M5Ljc4NSAwIDE3Ljk3NyA2Ljc5MiAyMC4xMzggMTUuOTRIOTMuMzcyem00OC4yMDItLjc0Yy0xLjY4NC03Ljk4MS02LjA0Ny0xNC41NC0xMi42ODYtMTguNzVjLTkuNzE2LTYuMTc4LTIyLjU0LTUuODM3LTMxLjkxNS44NTNjLTcuNjU3IDUuNDQ0LTEyLjA3NyAxNC4zNjUtMTIuMDc3IDIzLjU1MmMwIDIuMzA0LjI4NCA0LjYzLjg1MyA2LjkyNGMyLjg5IDExLjM3NyAxMi42NjQgMjAuMDAyIDI0LjMxNSAyMS40M2MzLjQ1OC40MiA2LjgyNi4yMjcgMTAuMjk3LS42ODNjMy4wMDMtLjc0IDUuODk5LTEuOTQ2IDguNTY3LTMuNjY0YzIuNzctMS43OCA1LjA4Ni00LjEzNiA3LjMzOS02Ljk1MmMuMDM0LS4wNTYuMDgtLjA5Ni4xMjUtLjE1M2MxLjU1OS0xLjkzNCAxLjI2OC00LjctLjQzOC02LjAwOGMtMS40NDUtMS4xMDktMy44NjktMS41NTgtNS43NjkuODg4Yy0uNDEuNTkyLS44NyAxLjE5NS0xLjM2NSAxLjc5MmMtMS41MTkgMS42NzgtMy40MDIgMy4zLTUuNjU1IDQuNTYyYTIwLjYgMjAuNiAwIDAgMS05LjYxNCAyLjQzYy0xMS4zNjYtLjEzMS0xNy40NDItOC4wNzktMTkuNjEtMTMuNzQ1YTIxIDIxIDAgMCAxLS44Ny0zLjNsLS4wNTctLjU5N2g0MC43OWM1LjU4Ni0uMTI1IDguNTktNC4wNzkgNy43NTktOC41OXoiLz48L3N2Zz4=',
        title: 'Xero',
        subtitle: 'Financial Data Sync ',
        allow: false,
    },
    {
        logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iI2YxNTExYiIgZD0iTTEyMS42NjYgMTIxLjY2NkgwVjBoMTIxLjY2NnoiLz48cGF0aCBmaWxsPSIjODBjYzI4IiBkPSJNMjU2IDEyMS42NjZIMTM0LjMzNVYwSDI1NnoiLz48cGF0aCBmaWxsPSIjMDBhZGVmIiBkPSJNMTIxLjY2MyAyNTYuMDAySDBWMTM0LjMzNmgxMjEuNjYzeiIvPjxwYXRoIGZpbGw9IiNmYmJjMDkiIGQ9Ik0yNTYgMjU2LjAwMkgxMzQuMzM1VjEzNC4zMzZIMjU2eiIvPjwvc3ZnPg==',
        title: 'Microsoft 365',
        subtitle: 'Calendar and Contacts',
        allow: true,
    },
    {
        logo: 'data:image/png;base64,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',
        title: 'Balancco',
        subtitle: 'Management Portal',
        allow: false,
    },
]


const accounts = [
    {
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAABbxJREFUaEPtmftPFFcUx+d/qk2jVSsptqW2tTFpbKyvmlptUdRWqxIT21o01kpBUOrbamOwAgZFUMFYIcpDsSIPecqyy7KLLPtgYWdnZmdO5965O7sze2bAQCI2fpPPT3vOnO/Mzp577l0OVEWEGBwrfwqf7KmBtzKvoczbXAHrDtVB7RMvSZlU4YgEYxHRAK/WmSlx5GJrD9aiZq24eLuPpRulKAB/1fTCkuxbaB5h1YG7UN/xnGVYSx4fB2nIoyOHQuwTTVzR1adoATvmqk/f4Q2zSyR0sPgJGm9m7qYKuPPYw7KMkjxeGN6+ExzzF4Fj3kIDno2ZIPT00DjO7vWw4+T1LnqBuLoHQ2icFUuyq0GW1a8oSTG/H1xLl6UYTsaZ/gGI/Q7gsItOhZ8vPGblNJ2/1YvG2dHpDLJsTf78AtSsmeEdu6Zh/Py/rJym30va0Dg7mrt9LFuTe8Vq1KiZgbTFM2c89/L0jQ8u+ww1ivHa+CtrvOBKBxpnh9m45+tvUJNmXB9/ChzpydhFJ2P/xRZWTlNpnQONs2PIN8GyNY2VXkGNmvEXHAVuzQuumnFK7vazcpoCYQEWfVeFxmJsyL3HMpMky/B89x7UbBzP+o2g8Dxw1c1u9MJ2fLj7FkzwEquW0D8tHpifdR3NSWapuui5TU9bl2o+XFEJw9u2w9DqdTreTVsgVPw3KIJAw+iQ9ce1TrQAxvs7b0K7I0CTMZFR4NClVsjMr4eNefcNZBU2wJmqbjpwTVfUOBExQxaRH44/gB0I2aeb4UJ1L4xNTL/oTEg3/qrp/2E8pL4GDeqsTH5kZtr6AynT3MsUNU4MHSnroLsc7AcZh4zATZ0jNNFOfNMDGM3NA9++/QYCJ07RkXQmRI3nlbajRjFIu+tyGcdRXeoWaGRfDtp/ddQNAml3dop134To5bXAn0gD/vg7lGjxCpBaLqmfat86NzoWpTsazKQVpMtgGrtSjps1syANJKeLZRklNR6HSMEblgg1P9I4rq7Vi5qzg/RyTGRrhRpFCJ4+y7ISUoJOiBS+iRpORnY1AVdR70TN2fHu9ipWyqgXme58OQdYVkJSSzFq1IxYe/glGld/rGaJk7wmcYTqva+NU03XuPTwLGrUjHgnB7jKRhdqzg4r4+6Va1CTGP4jhSwrIdn9CDVqJva0AjiyoGDm7CALESb/0SLUJAb/4CHLMkoo34yajRO9uFxt9KJ2BJe+4wZq0Ipf1bEVkxwOg/vzlajRZLDXRJc4Qd9hrC0K17aAMjFKw+jKWdU0iBrEIE+bLFpWImd8ZGtFbsD5XkaCjI9g6MuvYKykjG4WJpPCh0D2PAF58CHIQ49BGTeOGvqQdb99GOy2cQu3VsLec49gJMizjJcrw3RIJMWUlONhcmQ825Ri/FVRivGYbxSE7h4D4rNndGc9m6QbFx0D4NnwLdoFCAOL0sGfXwiKOIv2nOQpu5YsRQ2b8f2SOhwZpMggtV4G4epmiJat1xHKN4HU/KdaTDtemExK0EUXGqmtDGKdlaD4jec41Hig6ARq0gqrWZpIqNqV0n+TITcBss1/QeqNi3cPqrFzUnKFG7vV7qG9stS4N2sbatCK8ZvVNNksebA5pRhGrOsGy0jVZPOKcPsnGqcZz8xCDVoRvo5vvaTmc2gxM2LdYZaRKv5UOpqTYI7aKAIza3yqY6lY+xvLMEqJ+NF4M2QlnV3GQ2403gwZA2aXcSGMxptRRvs048Nbv0cNWjFec5sWMktqLUULmREbilhGqqKXVqE5cfizGbTzUOPB8xdQgygL0iA2gh8KKRM+iBS9jRbUUcdV2af9yYpJ9raq15hnmRvru0PjqHElEpnSHE0InDpDE60U66+lBzho4WNzIdZxlUVaSx7pAqFiG/An0/S8aMk6kJ2NLIIZJ5KDQXpk4FycgRp2L/+CHvhMScK4egN11KSO+qRIG5sZAfwHYoQcTGofEgsAAAAASUVORK5CYII=',
        title: 'Balancco',
        connected: true,
    },
    {
        logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iIzFmYzBlNyIgZD0iTTEyOC4wMDMgMjU2QzE5OC42OTMgMjU2IDI1NiAxOTguNjg5IDI1NiAxMjhDMjU2IDU3LjMgMTk4LjY5OSAwIDEyOC4wMDMgMFMwIDU3LjMgMCAxMjhjMCA3MC42ODkgNTcuMzA3IDEyOCAxMjguMDAzIDEyOCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im02Mi4zNjcgMTI3Ljk2OGwyMS44LTIxLjkwMmEzLjkxMyAzLjkxMyAwIDAgMC0yLjc4Mi02LjY1NmMtMS4wNTIgMC0yLjAzNi40MS0yLjc3NiAxLjE2Nkw1Ni44MjEgMTIyLjM4bC0yMS44NzQtMjEuODQ1YTMuOSAzLjkgMCAwIDAtMi43Ni0xLjEyNmEzLjkwOCAzLjkwOCAwIDAgMC0yLjczNiA2LjY5NWwyMS44IDIxLjgyOWwtMjEuNzg4IDIxLjg0NWMtLjc2My43NjItMS4xODQgMS43NTItMS4xODQgMi44MDVhMy45MTMgMy45MTMgMCAwIDAgMy45MDkgMy45MTRhMy44NyAzLjg3IDAgMCAwIDIuNzU5LTEuMTM4bDIxLjg0NS0yMS44NTdsMjEuNzYgMjEuNzcxYy43NzQuNzk3IDEuNzY0IDEuMjI0IDIuODMzIDEuMjI0YTMuOTEgMy45MSAwIDAgMCAzLjkwMy0zLjkxNGMwLTEuMDQxLS4zOTgtMi4wMi0xLjEzOC0yLjc2bC0yMS43ODgtMjEuODc5em0xMjkuNTk5LS4wMDZhNy4xMTQgNy4xMTQgMCAwIDAgNy4xMTEgNy4xMTFjMy45MDMgMCA3LjA4OC0zLjE4NiA3LjA4OC03LjExYzAtMy45MjYtMy4xODUtNy4xMTItNy4wOTQtNy4xMTJjLTMuOTA4IDAtNy4wODggMy4xODYtNy4wODggNy4xMTF6bS0xMy40NTQgMGMwLTExLjM1IDkuMjE2LTIwLjU5NCAyMC41Ni0yMC41OTRjMTEuMzIgMCAyMC41NTMgOS4yNDUgMjAuNTUzIDIwLjU5NHMtOS4yMjcgMjAuNTk0LTIwLjU1NCAyMC41OTRjLTExLjMzOCAwLTIwLjU2LTkuMjMzLTIwLjU2LTIwLjU5NG0tOC4wOSAwYzAgMTUuODE1IDEyLjg1NyAyOC42OTUgMjguNjUgMjguNjk1czI4LjY0OS0xMi44NjggMjguNjQ5LTI4LjY5YzAtMTUuODE0LTEyLjg1Ny0yOC42OTQtMjguNjUtMjguNjk0Yy0xNS43OTggMC0yOC42NDkgMTIuODc0LTI4LjY0OSAyOC42OTV6bS0yLjAzLTI4LjJoLTEuMTk2Yy0zLjYxMiAwLTcuMDk0IDEuMTM4LTEwIDMuMzg1Yy0uMzk5LTEuNzQtMS45NjktMy4wNzItMy44MzUtMy4wNzJhMy44NyAzLjg3IDAgMCAwLTMuODY4IDMuODkxbC4wMTEgNDguMzI3YzAgMi4xNDUgMS43NjQgMy44OTIgMy44OTcgMy44OTJhMy45MTQgMy45MTQgMCAwIDAgMy45MDgtMy45MDN2LTI5LjcxOWMwLTkuODk4LjkxLTEzLjkwMyA5LjM3NS0xNC45NjFjLjc5Ny0uMDk3IDEuNjM5LS4wOCAxLjY1LS4wOGMyLjMxLS4wODUgMy45Ni0xLjY4NCAzLjk2LTMuODRhMy45MjMgMy45MjMgMCAwIDAtMy45MjYtMy45MTR6bS03NS4wMTUgMjMuNDg0YzAtLjExNC4wMTItLjIyOC4wMTctLjMzYzIuMjY1LTguOTg4IDEwLjM4OC0xNS42MjcgMjAuMDU0LTE1LjYyN2M5Ljc4NSAwIDE3Ljk3NyA2Ljc5MiAyMC4xMzggMTUuOTRIOTMuMzcyem00OC4yMDItLjc0Yy0xLjY4NC03Ljk4MS02LjA0Ny0xNC41NC0xMi42ODYtMTguNzVjLTkuNzE2LTYuMTc4LTIyLjU0LTUuODM3LTMxLjkxNS44NTNjLTcuNjU3IDUuNDQ0LTEyLjA3NyAxNC4zNjUtMTIuMDc3IDIzLjU1MmMwIDIuMzA0LjI4NCA0LjYzLjg1MyA2LjkyNGMyLjg5IDExLjM3NyAxMi42NjQgMjAuMDAyIDI0LjMxNSAyMS40M2MzLjQ1OC40MiA2LjgyNi4yMjcgMTAuMjk3LS42ODNjMy4wMDMtLjc0IDUuODk5LTEuOTQ2IDguNTY3LTMuNjY0YzIuNzctMS43OCA1LjA4Ni00LjEzNiA3LjMzOS02Ljk1MmMuMDM0LS4wNTYuMDgtLjA5Ni4xMjUtLjE1M2MxLjU1OS0xLjkzNCAxLjI2OC00LjctLjQzOC02LjAwOGMtMS40NDUtMS4xMDktMy44NjktMS41NTgtNS43NjkuODg4Yy0uNDEuNTkyLS44NyAxLjE5NS0xLjM2NSAxLjc5MmMtMS41MTkgMS42NzgtMy40MDIgMy4zLTUuNjU1IDQuNTYyYTIwLjYgMjAuNiAwIDAgMS05LjYxNCAyLjQzYy0xMS4zNjYtLjEzMS0xNy40NDItOC4wNzktMTkuNjEtMTMuNzQ1YTIxIDIxIDAgMCAxLS44Ny0zLjNsLS4wNTctLjU5N2g0MC43OWM1LjU4Ni0uMTI1IDguNTktNC4wNzkgNy43NTktOC41OXoiLz48L3N2Zz4=',
        title: 'Xero',
        connected: true,
    },
]

const Connections = () => {
    return (
        <Stack spacing={2}>
            <Paper>
                <CardContent>
                    <Stack>
                        <Typography variant='h6' fontWeight={500}>Intigration Accounts</Typography>
                    </Stack>
                    <Stack my={2} mt={3} spacing={3}>
                        {connectionList.map((item, index) =>
                            <Stack key={index} direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
                                    <Avatar alt={item.title} size='small' src={item.logo} sx={{ width: '36px', height: '36px' }} />
                                    <Stack>
                                        <Typography variant='h6' lineHeight={'1'}>{item.title}</Typography>
                                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>{item.subtitle}</Typography>
                                    </Stack>
                                </Stack>
                                <Switch defaultChecked={item.allow} />
                            </Stack>
                        )}
                    </Stack>
                </CardContent>
            </Paper>
            <Paper>
                <CardContent>
                    <Stack>
                        <Typography variant='h6' fontWeight={500}>Connected Accounts</Typography>
                    </Stack>
                    <Stack my={2} mt={3} spacing={3}>
                        {accounts.map((item, index) =>
                            <Stack key={index} direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
                                    <Stack width={'45px'}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: '25px' }}>
                                            <img src={item.logo} alt='' height={25} />
                                        </Box>
                                    </Stack>
                                    <Stack>
                                        <Typography variant='h6' lineHeight={'1'}>{item.title}</Typography>
                                        {item.connected === true ?
                                            <Typography variant='body2' sx={{ color: 'text.secondary' }}>connected</Typography>
                                            :
                                            <Typography variant='body2' sx={{ color: 'text.secondary' }}>Not connected</Typography>
                                        }
                                    </Stack>
                                </Stack>
                                {item.connected === true ?
                                    <Button variant='outlined' color='secondary'>
                                        <DeleteIcon />
                                    </Button>
                                    :
                                    <Button variant='outlined' color='secondary'>
                                        <LinkIcon />
                                    </Button>
                                }
                            </Stack>
                        )}
                    </Stack>
                </CardContent>
            </Paper>
        </Stack>
    )
}

export default Connections