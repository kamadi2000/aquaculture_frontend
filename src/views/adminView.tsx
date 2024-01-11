import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { admins } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/admin';
import AdminNavBar from '../components/AdminNavBarComponent';
import { useConfirm } from 'material-ui-confirm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { EditAdmin } from './editAdmin';
import { AdminForm } from './addAdminForm';

export interface User {
    id: number,
    name: string,
    email: string,
    role: string
}
export default function AdminTable() {
    const confirm = useConfirm();
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openAdminForm, setOpenAdminForm] = useState(false)
    const { handleDelUser } = useAdmin()
    const { handleGetUsers } = useAdmin()
    const [adminId, setAdminId] = useState<number|null>()
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useQuery(admins, handleGetUsers);
    console.log(data)
    const handleAdd = () => {
        // navigate('/adminView/addAdminForm')
        setOpenAdminForm(true)
    }
    const handleDelete = (id: number) => {
        confirm({ description: `This will permanently delete client admin.` })
            .then(() => handleDelUser(id))
            .catch(() => console.log("Deletion cancelled."))
    }
    const handleEdit = (id : number) => {
        setAdminId(id);
        setOpenEditDialog(true)
    }

    return (
        <>
            <AdminForm open={openAdminForm} setOpen={setOpenAdminForm}/>
            {adminId && <EditAdmin id={adminId} open={openEditDialog} setOpen={setOpenEditDialog}/>}
            <AdminNavBar />
            <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 5, paddingRight: 5, paddingTop: 3 }}>
                <Grid container direction='row' spacing={6}>
                    <Grid item xs={6}>
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h5"
                        >
                            <b>Admins</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} paddingBottom={6} sx={{ display: 'flex', justifyContent: 'right' }}>

                        <Button
                            style={{ justifyItems: 'right' }}
                            variant="contained"
                            onClick={handleAdd}>
                            Add
                        </Button>


                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b>Name</b></TableCell>
                                <TableCell align="center"><b>Email</b></TableCell>
                                <TableCell align="center"><b>Role</b></TableCell>
                                <TableCell align="right">
                                    <b>Actions</b>
                                </TableCell>
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
                                    <TableCell align="center">{admin.role}</TableCell>
                                    <TableCell align='right'>
                                        <Stack direction='row' spacing={2} justifyContent={'right'} alignItems={'center'}>
                                            <Tooltip title="Edit" onClick={() => handleEdit(admin.id)}>
                                                <IconButton>
                                                <EditIcon />
                                                </IconButton>
                                                
                                            </Tooltip>
                                            <Tooltip title="Delete" onClick={() => handleDelete(admin.id)}>
                                                <IconButton>
                                                <DeleteOutlineIcon />
                                                </IconButton>
                                                
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}