import { useClient } from '../hooks/client';
import { useCallback } from "react"
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    TextField,
    Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { ClientFormData, ClientFormDataProps } from './ClientSchemaComponent';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type FormDialogProps = {
    open: boolean,
    setOpen: (r: boolean) => void
}

export default function FormDialog({ open, setOpen }: FormDialogProps) {
    const { handleAddClient } = useClient();
    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            name: "",
            email: "",
        },
        resolver: zodResolver(ClientFormData)
    })
    const handleClose = () => {
        setOpen(false);
    };
    
    
    const email = localStorage.getItem("email")
    const onSubmit = useCallback((values: ClientFormDataProps) => {
        const client = { userEmail: email, name: values.name, clientEmail : values.email }
        handleAddClient(client)
        setOpen(false)
    }, [])
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
                    <Typography sx={{paddingBottom : 5}} variant='h6'><b>Add admin</b></Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: "15px",
                            marginBottom: '15px'
                        }}>
                            <Controller
                                name='name'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        error={!!errors.name}
                                        label='Name'
                                        type='text'
                                        variant='outlined'
                                        size="small"
                                        helperText={errors.name?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='email'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        error={!!errors.email}
                                        label='Email'
                                        type='text'
                                        size="small"
                                        variant='outlined'
                                        helperText={errors.email?.message}
                                        {...field}
                                    />
                                )}
                            />
                        </Box>
                        <Button sx={{marginTop : 3}} type='submit' variant="contained" color="primary">Add</Button>

                    </form>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}