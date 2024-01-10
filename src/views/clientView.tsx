import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OuterFrame } from '../components/OuterFrameComponent';
import { Button, CircularProgress, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useClient } from '../hooks/client';
import { useQuery } from 'react-query';
import { clients } from '../utils/constants';
import FormDialog from '../components/AddClientDialogComponent';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { Loading } from '../components/LoadingComponent';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SailingIcon from '@mui/icons-material/Sailing';

interface User {
    id: number,
    name: string,
    clientEmail : string
}
export default function ClientTable() {
    const email = localStorage.getItem("email")
    const confirm = useConfirm()
    const [open, setOpen] = useState(false)
    const { handleDelClient, handleGetClient } = useClient();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useQuery(clients,() =>  handleGetClient(email));
    console.log(data)
    const handleAddClientClick = () => {
        setOpen(true)
    }
    const handleDelete = (id: number) => {
        confirm({ description: `This will permanently delete client.` })
            .then(() => handleDelClient(id))
            .catch(() => console.log("Deletion cancelled."))
    }
    if (isLoading){
        return(
            <Loading/>
        )
    }
    return (
        <OuterFrame>
            <FormDialog open={open} setOpen={setOpen} />
            <Grid container direction='row' spacing={6}>
                <Grid item xs={6}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h5"><b>Clients</b></Typography>
                </Grid>
                <Grid item xs={6} paddingBottom={6} sx={{display: 'flex',justifyContent : 'right'}}>
                    
                    <Button
                        style={{ justifyItems: 'right', }}
                        variant="contained"
                        onClick={handleAddClientClick}>
                        Add
                    </Button>
                    
                    
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"><b>Name</b></TableCell>
                            <TableCell align="right"><b>Email</b></TableCell>
                            <TableCell align="right">
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
                                <TableCell align="right">{client.clientEmail}</TableCell>
                                <TableCell align="right">
                                    <Stack direction='row' spacing={2} justifyContent={'right'} alignItems={'center'}>
                                        <Tooltip title="Manage fishfarms" onClick={() => navigate(`/clientView/${client.id}/fishfarm`,{state : client.name})}>
                                            <SailingIcon/>
                                        </Tooltip>
                                        <Tooltip title="Manage Workers" onClick={() => navigate(`/workerView/${client.id}`,{state : client.name})}>
                                            <EngineeringIcon/>
                                        </Tooltip>
                                        <Tooltip title="Delete" onClick={() => handleDelete(client.id)}>
                                        <DeleteOutlineIcon/>
                                        </Tooltip>
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