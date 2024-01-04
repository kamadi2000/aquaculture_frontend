import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OuterFrame } from '../components/OuterFrameComponent';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { workers } from '../utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorker } from '../hooks/worker';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import { ViewWorker } from '../components/ViewWorkerDialog';
import profileImage from '../assets/images/profileImage.png'

interface Worker {
    id: number,
    name: string,
    age: number,
    imageSrc: string,
    imageName: string | null
}
export default function WorkerTable() {
    const confirm = useConfirm();
    const {clientId} = useParams();
    const [open, setOpen] = useState(false);
    const [workerId, setWorkerId] = useState<number | null>(null);
    const { handleGetWorker, handleDelWorker } = useWorker();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useQuery(workers, () => handleGetWorker(Number(clientId)));
 
    const handleDelete = (id: number) => {
        confirm({ description: `This will permanently delete worker ${id}.` })
            .then(() => handleDelWorker(id))
            .catch(() => console.log("Deletion cancelled."))
    }
    const handleView = (id: number) => {
        setWorkerId(id)
        setOpen(true)
    }
    if (isLoading) {
        return (
            <h1>Loading..</h1>
        )
    }

    return (
        <OuterFrame>
            {workerId && <ViewWorker id={workerId} open={open} setOpen={setOpen} />}
            <Grid container direction='row' spacing={12}>
                <Grid item spacing={6}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6">Client/Workers</Typography>
                </Grid>
                <Grid item spacing={6} paddingBottom={6}>
                    <Button
                        style={{ justifyItems: 'right' }}
                        variant="contained"
                        onClick={() => navigate(`/workerView/${clientId}/workerform`)}>
                        Add Worker
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'><b>Profile picture</b></TableCell>
                            <TableCell align="center"><b>Name</b></TableCell>
                            <TableCell align="center"><b>Age</b></TableCell>
                            <TableCell align="center">
                                <b>Actions</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data.map((worker: Worker) => (
                            <TableRow
                                key={worker.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center'>{worker.imageName ?
                                    (<img style={{ borderRadius: '50%', height: 50, width: 50, alignSelf: 'center' }} src={worker.imageSrc} />)
                                    :
                                    (<img style={{ borderRadius: '50%', height: 50, width: 50, alignSelf: 'center' }} src={profileImage} />)}</TableCell>
                                <TableCell align="center">{worker.name}</TableCell>
                                <TableCell align="center">{worker.age}</TableCell>
                                <TableCell align="center">
                                <Stack direction='row' spacing={2} justifyContent={'center'} alignItems={'center'}>
                                    <Button
                                        onClick={() => handleView(worker.id)}
                                        style={{ justifyItems: 'right' }}
                                        variant="contained">
                                        View
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(worker.id)}
                                        style={{ justifyItems: 'right' }}
                                        variant="contained">
                                        Delete
                                    </Button>

                                    <Button
                                        onClick={() => navigate(`/workerView/${worker.id}/editWorkerform`)}
                                        style={{ justifyItems: 'right' }}
                                        variant="contained">
                                        Edit
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