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
import { useNavigate } from 'react-router-dom';

interface User {
    id : number,
    name : string,
    fishfarmId : number
}
export default function WorkerTable() {
    const [ open, setOpen] = useState(false)
    const { handleGetClient } = useClient();
    const navigate = useNavigate();
    const { data, isLoading,isError, error } = useQuery(clients, handleGetClient);
    const handleAddClientClick = () => {
        setOpen(true)
    }
    const worker = [
        {id : 1, name : 'mary',fishfarmId : 2},
        {id : 2, name : 'ann',fishfarmId : 1},
        {id : 3, name : 'john',fishfarmId : 2}]
    return (
        <OuterFrame>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
            >
                Workers
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">
                                <Button 
                                style={{ justifyItems: 'right' }} 
                                variant="contained"
                                onClick={() => navigate('/workerView/workerform')}>
                                    Add Worker
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {worker.map((worker: User) => (
                            <TableRow
                                key={worker.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {worker.id}
                                </TableCell>
                                <TableCell align="right">{worker.name}</TableCell>
                                <TableCell align="right">{worker.fishfarmId}</TableCell>
                                <TableCell align="right"><Button style={{ justifyItems: 'right' }} variant="contained">View</Button></TableCell>
                                {/* <TableCell align="right"><Button style={{ justifyItems: 'right' }} variant="contained"></Button></TableCell> */}
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