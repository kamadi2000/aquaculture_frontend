import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OuterFrame } from '../components/outerFrameComponent';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useClient } from '../hooks/client';
import { useQuery } from 'react-query';
import { clients } from '../utils/constants';
import FormDialog from '../components/addClientDialogComponent';

interface User {
    id : number,
    name : string
}
export default function ClientTable() {
    const [ open, setOpen] = useState(false)
    const { handleGetClient } = useClient();
    const { data, isLoading,isError, error } = useQuery(clients, handleGetClient);
    const handleAddClientClick = () => {
        setOpen(true)
    }
    return (
        <OuterFrame>
            <FormDialog open={open} setOpen={setOpen}/>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
            >
                Clients
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">
                                <Button 
                                style={{ justifyItems: 'right' }} 
                                variant="contained"
                                onClick={handleAddClientClick}>
                                    Add Client
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data.map((client : User) => (
                            <TableRow
                                key={client.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {client.id}
                                </TableCell>
                                <TableCell align="right">{client.name}</TableCell>
                                <TableCell align="right"><Button style={{ justifyItems: 'right' }} variant="contained">View</Button></TableCell>
                                <TableCell align="right"><Button style={{ justifyItems: 'right' }} variant="contained">Add fishfarm</Button></TableCell>
                                <TableCell align="right"><Button style={{ justifyItems: 'right' }} variant="contained">Delete</Button></TableCell>
                                <TableCell align="right"><Button style={{ justifyItems: 'right' }} variant="contained">Edit</Button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </OuterFrame>
    );
}