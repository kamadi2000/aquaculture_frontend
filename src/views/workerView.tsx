import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OuterFrame } from '../components/outerFrameComponent';
import { Button, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { workers } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useWorker } from '../hooks/worker';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import { ViewWorker } from '../components/viewWorkerDialog';

interface Worker {
    id: number,
    name: string,
    age: number
}
export default function WorkerTable() {
    const confirm = useConfirm();
    const [open, setOpen] = useState(false);
    const [workerId, setWorkerId] = useState<number|null>(null);
    const { handleGetWorker, handleDelWorker } = useWorker();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useQuery(workers, handleGetWorker);

    const handleDelete = (id: number) => {
        confirm({ description: `This will permanently delete worker ${id}.` })
            .then(() => handleDelWorker(id))
            .catch(() => console.log("Deletion cancelled."));
        ;
    }
    const handleView = (id : number) => {
        setWorkerId(id)
        setOpen(true)
    }
    if (isLoading){
        return(
            <h1>Loading..</h1>
        )
    }

    return (
        <OuterFrame>
            {workerId && <ViewWorker id={workerId} open={open} setOpen={setOpen}/> }           
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
                        {data?.data.map((worker: Worker) => (
                            <TableRow
                                key={worker.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {worker.id}
                                </TableCell>
                                <TableCell align="right">{worker.name}</TableCell>
                                <TableCell align="right">{worker.age}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleView(worker.id)} style={{ justifyItems: 'right' }} variant="contained">View</Button></TableCell>
                                <TableCell align="right"><Button onClick={() => handleDelete(worker.id)} style={{ justifyItems: 'right' }} variant="contained">Delete</Button></TableCell>
                                <TableCell align="right"><Button style={{ justifyItems: 'right' }} variant="contained">Edit</Button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </OuterFrame>
    );
}