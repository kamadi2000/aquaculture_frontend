import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useClient } from '../hooks/client';

type FormDialogProps = {
    open: boolean,
    setOpen: (r: boolean) => void
}
export default function FormDialog({ open, setOpen }: FormDialogProps) {
    const { handleAddClient } = useClient();
    const [name, setName] = React.useState('');
    const handleAdd = () => {
        const client = {name : name}
        handleAddClient(client)
        setOpen(false)
        
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ADD CLIENT</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Client name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}