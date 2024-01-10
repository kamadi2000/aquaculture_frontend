import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useClient } from '../hooks/client';

type FormDialogProps = {
    open: boolean,
    setOpen: (r: boolean) => void
}
export default function FormDialog({ open, setOpen }: FormDialogProps) {
    const email = localStorage.getItem("email")
    const { handleAddClient } = useClient();
    const [clientEmail, setClientEmail] = React.useState('')
    const [name, setName] = React.useState('');
    const handleAdd = () => {
        const client = { userEmail: email, name: name, clientEmail : clientEmail }
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Client email"
                        fullWidth
                        variant="standard"
                        value={clientEmail}
                        onChange={(event) => setClientEmail(event.target.value)}
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