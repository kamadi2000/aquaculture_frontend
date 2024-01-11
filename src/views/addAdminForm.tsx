import * as EmailValidator from 'email-validator';
import { useState } from "react"
import { useAuth } from "../hooks/auth";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type AddAdminProps = {
    open: boolean,
    setOpen: (r: boolean) => void
}

export const AdminForm = ({ open, setOpen }: AddAdminProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');
    const [role, setRole] = useState('')
    const [error, setError] = useState(false)
    const { handleSignIn } = useAuth()

    const handleAddAdmin = () => {
        if (password === rPassword && password.length > 0) {
            if (email.length > 0 && EmailValidator.validate(email)) {
                setError(false)
                const Admin = { name: name, email: email, password: password, role: role }
                handleSignIn(Admin)
                setOpen(false)
            } else {

                setError(true)
            }
        }
    }
    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    };
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 5, paddingRight: 5, paddingTop: 3 }}>
                        <Stack
                            component="form"
                            spacing={2}
                            noValidate
                            autoComplete="off"
                        >
                            <h1>Add Admin</h1>

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
                            <TextField
                                required
                                id="password"
                                label="Password"
                                size="small"
                                type="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                            <TextField
                                required
                                id="RPassword"
                                label="Re-enter password"
                                size="small"
                                type="password"
                                value={rPassword}
                                onChange={(event) => {
                                    setRPassword(event.target.value);
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


                            <Button onClick={handleAddAdmin} variant="contained" color="primary">Add</Button>

                        </Stack>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}