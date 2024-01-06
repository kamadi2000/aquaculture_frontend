import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OuterFrame } from '../components/OuterFrameComponent';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useClient } from '../hooks/client';
import { useQuery } from 'react-query';
import { clients } from '../utils/constants';
import FormDialog from '../components/AddClientDialogComponent';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';

interface User {
    id: number,
    name: string
}
export default function ClientTable() {
    const email = localStorage.getItem("email")
    const confirm = useConfirm()
    const [open, setOpen] = useState(false)
    const { handleDelClient, handleGetClient } = useClient();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useQuery(clients,() =>  handleGetClient(email));
    const handleAddClientClick = () => {
        setOpen(true)
    }
    const handleDelete = (id: number) => {
        confirm({ description: `This will permanently delete client ${id}.` })
            .then(() => handleDelClient(id))
            .catch(() => console.log("Deletion cancelled."))
    }
    return (
        <OuterFrame>
            <FormDialog open={open} setOpen={setOpen} />
            <Grid container direction='row' spacing={12}>
                <Grid item spacing={6}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6">Clients</Typography>
                </Grid>
                <Grid item spacing={6} paddingBottom={6}>
                    <Button
                        style={{ justifyItems: 'right' }}
                        variant="contained"
                        onClick={handleAddClientClick}>
                        Add Client
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"><b>Name</b></TableCell>
                            <TableCell align="center">
                                <b>Actions</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data.map((client: User) => (
                            <TableRow
                                key={client.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{client.name}</TableCell>
                                <TableCell align="center">
                                    <Stack direction='row' spacing={2} justifyContent={'center'} alignItems={'center'}>
                                        <Button
                                            onClick={() => navigate(`/clientView/${client.id}/fishfarm`)}
                                            style={{ justifyItems: 'right' }}
                                            variant="contained">
                                            Manage fishfarms
                                        </Button>
                                        <Button
                                            style={{ justifyItems: 'right' }}
                                            variant="contained"
                                            onClick={() => navigate(`/workerView/${client.id}`)}>
                                            Manage Workers
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(client.id)}
                                            style={{ justifyItems: 'right' }}
                                            variant="contained">
                                            Delete
                                        </Button>
                                    </Stack>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </OuterFrame>
    );
}