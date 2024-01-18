import { useCallback, useEffect } from "react"
import { useAuth } from "../hooks/auth";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AdminFormData as formData, AdminFormDataProps as FormDataProps } from "../components/AdminSchemaComponent";

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
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        mode: 'all',
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rPassword: "",
            role: ""
        },
        resolver: zodResolver(formData)
    })
    const handleClose = () => {
        setOpen(false);
    };
    
    
    const { handleSignIn } = useAuth()

    const onSubmit = useCallback((values: FormDataProps) => {
        const Admin = { name: values.name, email: values.email, password: values.password, role: values.role }
        handleSignIn(Admin)
        setOpen(false)
        reset()
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
                    <Typography sx={{paddingBottom : 5}} variant='h6'><b>Add user</b></Typography>
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
                            <Controller
                                name='password'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        error={!!errors.password}
                                        label='Password'
                                        type='password' 
                                        size="small"
                                        variant='outlined'
                                        helperText={errors.password?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='rPassword'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        error={!!errors.rPassword}
                                        label='Confirm password'
                                        type='password'
                                        size="small"
                                        variant='outlined'
                                        helperText={errors.rPassword?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='role'
                                control={control}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="role">Role</InputLabel>
                                        <Select
                                            labelId="role"
                                            id="role"
                                            label='Role'
                                            size="small"
                                            variant='outlined'
                                            error={!!errors.role}
                                            {...field}
                                        >
                                            <MenuItem value={"ClientAdmin"}>ClientAdmin</MenuItem>
                                            <MenuItem value={"Admin"}>Admin</MenuItem>

                                        </Select>
                                        {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
                                    </FormControl>
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