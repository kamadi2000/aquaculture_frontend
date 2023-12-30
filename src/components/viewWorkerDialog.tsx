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
import { workers } from '../utils/constants';

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
                {!isLoading ? 
                <>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        id : {data?.data?.id}
                    </Typography>
                    <Typography gutterBottom>
                        name : {data?.data?.name}
                    </Typography>
                    <Typography gutterBottom>
                        Email : {data?.data?.email}
                    </Typography>
                    <Typography gutterBottom>
                        Age : {data?.data?.age}
                    </Typography>
                    <Typography gutterBottom>
                        Position : {data?.data?.position}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Done
                    </Button>
                </DialogActions>
                </>
                : ''}
            </BootstrapDialog>
        </React.Fragment>
    );
}