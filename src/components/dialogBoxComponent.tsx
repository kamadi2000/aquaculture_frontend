import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useFishfarm } from '../hooks/fishfarm';
import { useQuery } from 'react-query';
import { fishfarms } from '../utils/constants';
import { ListItem, Stack } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type dialogBoxProps = {
  id: number;
  open: boolean;
  setOpen: (R: boolean) => void
}
type WorkerProps = {
  id : number;
  name : string
}

export default function CustomizedDialogs({ id, open, setOpen }: dialogBoxProps) {
  const { handleGetByFishfarmId } = useFishfarm();
  
  const { data, isLoading } = useQuery([fishfarms, id], () => handleGetByFishfarmId(id))
  console.log(data?.data.workers)
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      
      <BootstrapDialog
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, paddingRight: 50 }} id="customized-dialog-title">
          {data?.data.name}
        </DialogTitle>
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
        <DialogContent dividers>
          {(data?.data.workers).length === 0 ? 
          <Typography>
            No workers in the fish farm
          </Typography>
          :
          (data?.data.workers).map((worker : WorkerProps) => 
          <Stack direction='row' spacing={3}>
            <Typography>
            {worker.id}
          </Typography>
          <Typography>
            {worker.name}
          </Typography>
          </Stack>)}
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}