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
import { admins, positionEnumMap, workers } from '../utils/constants';
import { Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import profileImage from '../assets/images/profileImage.png'
import { useEffect, useState } from 'react';
import { useAdmin } from '../hooks/admin';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type EditAdminProps = {
    id: number,
    open: boolean,
    setOpen: (r: boolean) => void
}

export const EditAdmin = ({ id, open, setOpen }: EditAdminProps) => {
    const { handleGetUserById, handleEditUser } = useAdmin()
    const { data } = useQuery([admins, id], () => handleGetUserById(id))
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('')
    const [error, setError] = useState(false)
    console.log(data?.data)
    useEffect(() => {
        setName(data?.data?.name)
        setEmail(data?.data?.email)
        setRole(data?.data?.role)
    }, [data])



    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        const user = {id : id, name: name, email: email, role: role }
        handleEditUser(user)
        setOpen(false)

    }

    return (
        <>
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
                <DialogContent sx={{ padding: 10, width: 400 }}>
                    <Stack
                        component="form"
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >
                        <h1>Edit</h1>

                        <TextField
                            required
                            id="name"
                            label="Name"
                            size="small"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <TextField
                            required
                            error={error}
                            helperText={error && "Invalid email"}
                            id="email"
                            label="Email"
                            size="small"
                            value={email}
                            onChange={(event) => {
                                setError(false)
                                setEmail(event.target.value);
                            }}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Role"
                                size="small"
                                onChange={handleChange}
                            >
                                <MenuItem value={"ClientAdmin"}>ClientAdmin</MenuItem>
                                <MenuItem value={"Admin"}>Admin</MenuItem>

                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>


            </BootstrapDialog>
        </>
    );
}