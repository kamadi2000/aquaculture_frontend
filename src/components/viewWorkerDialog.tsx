import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useWorker } from '../hooks/worker';
import { useQuery } from 'react-query';
import { positionEnumMap, workers } from '../utils/constants';
import { Card, CardActions, CardContent } from '@mui/material';
import profileImage from '../assets/images/profileImage.png'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type ViewWorkerProps = {
    id: number,
    open: boolean,
    setOpen: (r: boolean) => void
}

export const ViewWorker = ({ id, open, setOpen }: ViewWorkerProps) => {
    const { handleGetWorkerById } = useWorker();
    const { data, isLoading } = useQuery([workers, id], () => handleGetWorkerById(id))

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent sx={{ display : 'flex',flexDirection : 'column',alignItems: 'center', justifyContent: 'center' }}>
                        {data?.data.imageName ?
                            (<img style={{ borderRadius: '50%', height: 100, width: 100, alignSelf: 'center' }} src={data?.data.imageSrc} />)
                            :
                            (<img style={{ borderRadius: '50%', height: 100, width: 100, alignSelf: 'center' }} src={profileImage} />)}
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {data?.data?.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14  }} color="text.secondary" gutterBottom>
                            {data?.data?.email}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {data?.data?.age} years old
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {positionEnumMap[data?.data?.position]}
                        </Typography>

                    </CardContent>

                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Done
                        </Button>
                    </DialogActions>

                </Card>
            </BootstrapDialog>
        </React.Fragment>
    );
}