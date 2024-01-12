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
import { Grid, ListItem, Stack } from '@mui/material';
import DataGridDemo from './WorkerGridComponent';
import { useParams } from 'react-router-dom';
import { useClient } from '../hooks/client';

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
export interface IFishFarmData {
  fishfarmId : number |null
  workersIdList : number[]
}

export default function CustomizedDialogs({ id, open, setOpen }: dialogBoxProps) {
  const { clientId } = useParams();
  const { handleClientFishFarm } = useClient();
  const [fid, setFId] = React.useState(id)
  const [fishFarmWorker, setFishFarmWorker] = React.useState<IFishFarmData>({fishfarmId : null,workersIdList : []})
  const handleClose = () => {
    setOpen(false);
  };
  // React.useEffect(() => {
  //   setFishFarmWorker()
  // },[id])
  const handleSave = () => {
    console.log({id}) 
    handleClientFishFarm({id : Number(clientId), fishFarmData : {...fishFarmWorker,fishfarmId : id}})
    console.log(fishFarmWorker)
    setOpen(false)
  }
  return (
    <React.Fragment>

      <BootstrapDialog
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, paddingRight: 50 }} id="customized-dialog-title">
          {/* <Typography>{id}</Typography> */}
          <Grid container direction='row' spacing={12}>
            <Grid item spacing={6}>
              <Typography sx={{ flex: '1 1 100%' }} variant="h5"><b>Workers</b></Typography>
            </Grid>
            
          </Grid>
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
          <DataGridDemo fishFarmId={id} fishFarmWorker={fishFarmWorker} setFishFarmWorker={setFishFarmWorker} />

        </DialogContent>
        <DialogActions>
        <Grid item spacing={6} paddingBottom={3}>
              <Button onClick={handleSave} variant="contained">Save</Button>
            </Grid>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}