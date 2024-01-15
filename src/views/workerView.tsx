import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OuterFrame } from '../components/OuterFrameComponent';
import { Breadcrumbs, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
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
import { WorkerForm } from './addWorkerForm';
import { EditWorkerForm } from './editWorkerForm';

interface Worker {
    id: number,
    name: string,
    age: number,
    imageSrc: string,
    imageName: string | null,
    fishFarmId : number
}
export default function WorkerTable() {
    const confirm = useConfirm();
    const { clientId } = useParams();
    const [editWorkerId, setEditWorkerId] = useState<number|null>()
    const [openViewWorker, setOpenViewWorker] = useState(false);
    const [openAddWorker, setOpenAddWorker] = useState(false);
    const [openEditWorker, setOpenEditWorker] = useState(false)
    const [workerId, setWorkerId] = useState<number | null>(null);
    const { handleGetWorker, handleDelWorker } = useWorker();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { data, isLoading, isError, error } = useQuery(workers, () => handleGetWorker(Number(clientId)));
    console.log(data)
    const handleDelete = (id: number,fishFarmId : number) => {
        confirm((fishFarmId == null) ? {description: `This will permanently delete worker.`} :{ description : `This person is already working in a fishfarm.`})
            .then(() => handleDelWorker(id))
            .catch(() => console.log("Deletion cancelled."))
    }
    const handleView = (id: number) => {
        setWorkerId(id)
        setOpenViewWorker(true)
    }
    const handleAdd = () => {
        setOpenAddWorker(true)
    }
    const handleEdit = (id : number) => {
        setEditWorkerId(id)
        setOpenEditWorker(true)
    }
    if (isLoading) {
        return (
            <h1>Loading..</h1>
        )
    }
    

    return (
        <OuterFrame>
            {workerId && <ViewWorker id={workerId} open={openViewWorker} setOpen={setOpenViewWorker} />}
            {clientId && <WorkerForm clientId={clientId} open={openAddWorker} setOpen={setOpenAddWorker}/>}
            {editWorkerId && <EditWorkerForm workerId={editWorkerId} open={openEditWorker} setOpen={setOpenEditWorker}/>}
            <Grid container direction='row' spacing={6}>
                <Grid item xs={6}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="text.inherit">Clients</Typography>
                        <Typography color="text.inherit">{state}</Typography>
                        <Typography color="text.primary">Workers</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>

                    <Button
                        style={{ justifyItems: 'right' }}
                        variant="contained"
                        onClick={handleAdd}>
                        Add
                    </Button>


                </Grid>
            </Grid>
            <Typography sx={{ flex: '1 1 100%', paddingBottom: 3 }} variant="h5"><b>Client Workers</b></Typography>
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
                                                <IconButton>
                                                    <VisibilityIcon />
                                                </IconButton>

                                            </Tooltip>

                                            <Tooltip title="Edit" onClick={() => handleEdit(worker.id)}>
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>

                                            </Tooltip>

                                            <Tooltip title="Delete" onClick={() => handleDelete(worker.id, worker.fishFarmId)}>
                                                <IconButton>
                                                    <DeleteOutlineIcon />
                                                </IconButton>

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