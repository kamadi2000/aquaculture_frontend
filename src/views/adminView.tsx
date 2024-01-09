import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { admins } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/admin';
import AdminNavBar from '../components/AdminNavBarComponent';

export interface User {
    id: number,
    name: string,
    email : string
}
export default function AdminTable() {
    const [open, setOpen] = useState(false)
    const { handleGetUsers } = useAdmin()
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useQuery(admins, handleGetUsers);

    const handleAdd = () => {
        navigate('/adminView/addAdminForm')
    }

    return (
        <>
            <AdminNavBar />
            <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 5, paddingRight: 5, paddingTop: 3 }}>
                <Grid container direction='row' spacing={12}>
                    <Grid item spacing={6}>
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                        >
                            Client admins
                        </Typography>
                    </Grid>
                    <Grid item spacing={6} paddingBottom={6}>
                        <Button
                            style={{ justifyItems: 'right' }}
                            variant="contained"
                            onClick={handleAdd}>
                            Add Admin
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b>Name</b></TableCell>
                                <TableCell align="center"><b>Email</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.data.map((admin: User) => (
                                <TableRow
                                    key={admin.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{admin.name}</TableCell>
                                    <TableCell align="center">{admin.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}