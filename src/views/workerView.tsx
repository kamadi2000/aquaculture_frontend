import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OuterFrame } from '../components/OuterFrameComponent';
import { Breadcrumbs, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { workers } from '../utils/constants';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useWorker } from '../hooks/worker';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import { ViewWorker } from '../components/ViewWorkerDialog';
import profileImage from '../assets/images/profileImage.png'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Worker {
    id: number,
    name: string,
    age: number,
    imageSrc: string,
    imageName: string | null
}
export default function WorkerTable() {
    const confirm = useConfirm();
    const { clientId } = useParams();
    const [open, setOpen] = useState(false);
    const [workerId, setWorkerId] = useState<number | null>(null);
    const { handleGetWorker, handleDelWorker } = useWorker();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { data, isLoading, isError, error } = useQuery(workers, () => handleGetWorker(Number(clientId)));

    const handleDelete = (id: number) => {
        confirm({ description: `This will permanently delete worker.` })
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
            
            <Grid container direction='row' spacing={6}>
                    <Grid item xs={6}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="text.primary">Clients</Typography>
                        <Typography color="text.primary">{state}</Typography>
                        <Typography color="text.primary">Workers</Typography>
                    </Breadcrumbs>
                    </Grid>
                    <Grid item xs={6} paddingBottom={6} sx={{display: 'flex',justifyContent : 'right'}}>
                        
                    <Button
                        style={{ justifyItems: 'right' }}
                        variant="contained"
                        onClick={() => navigate(`/workerView/${clientId}/workerform`, { state: state })}>
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
                            <TableCell align="right">
                                <b>Actions</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data?.data)?.length == 0 ?
                            (
                                <Typography sx={{ m: 3, textAlign: 'center' }} >No workers at the moment</Typography>
                            )
                            :
                            ((data?.data)?.map((worker: Worker) => (
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
                                    <TableCell align="right">
                                        <Stack direction='row' spacing={2} justifyContent={'right'} alignItems={'center'}>
                                            <Tooltip title="View" onClick={() => handleView(worker.id)}>
                                                <VisibilityIcon/>
                                            </Tooltip>
                                            
                                            <Tooltip title="Edit" onClick={() => navigate(`/workerView/${worker.id}/editWorkerform`)}>
                                                <EditIcon/>
                                            </Tooltip>
                                            
                                            <Tooltip title="Delete" onClick={() => handleDelete(worker.id)}>
                                                <DeleteOutlineIcon />
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>

                                </TableRow>
                            )))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </OuterFrame>
    );
}