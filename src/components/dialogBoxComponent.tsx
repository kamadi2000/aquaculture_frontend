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

export default function CustomizedDialogs({ id, open, setOpen }: dialogBoxProps) {
  const data = { id: 1, name: "Negombo", barge: true, "cages": 4, longitude: 7.154696182201173, latitude: 79.82769246817494 }

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
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {data.name}
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
        <Typography gutterBottom>
            {data.barge ? "This fish farm has a barge." : "This fish farm does not have a barge."}
            The fish farm consists of 3 cages.
          </Typography>
          <Typography gutterBottom>
            The GPS location is {data.longitude}, {data.latitude}.
          </Typography>
          <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126670.33644594673!2d79.77585073436786!3d7.189611414426807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f39db11564ad%3A0xd21cb7b1950901f3!2sDungalpitiya%20Beach!5e0!3m2!1sen!2slk!4v1703581046661!5m2!1sen!2slk"
           width="400" 
           height="300" 
           style={{ border :'0'}}
           allowFullScreen={false} 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade">

           </iframe>
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