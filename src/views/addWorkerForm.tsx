import { useWorker } from "../hooks/worker";
import profileImage from '../assets/images/profileImage.png'
import { useCallback, useState } from "react"
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { WorkerFormData, WorkerFormDataProps } from "../components/WorkerSchemaComponent";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type AddWorkerProps = {
    clientId: string
    open: boolean,
    setOpen: (r: boolean) => void
}
export const WorkerForm = ({ clientId, open, setOpen }: AddWorkerProps) => {
    
    const { handleSubmit, control, setValue,reset, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            name: "",
            email: "",
            age: 0,
            position: 0,
            image : {},
            imageName : ""
        },
        resolver: zodResolver(WorkerFormData)
    })
    const handleClose = () => {
        setOpen(false);
        reset()
    };

    const { handleAddWorker } = useWorker();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let files = event.target.files[0]            
            setValue("image", event.target.files)
            setValue("imageName",files.name)
            console.log(event.target.files)
        } 
    }

    const onSubmit = useCallback((values: WorkerFormDataProps) => {
        const Worker = { 
            clientId: clientId, 
            name: values.name, 
            email: values.email, 
            age: values.age, 
            imageFile: values.image[0], 
            imageName: values.imageName, 
            position: values.position }
        handleAddWorker(Worker)
        setOpen(false)
        reset()
    }, [])

    console.log({ errors })

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
                    <Typography sx={{ paddingBottom: 5 }} variant='h6'><b>Add Worker</b></Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: "15px",
                            marginBottom: '15px'
                        }}>
                        
                            <Controller
                                name='image'
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="file"
                                        accept="image/*"                                        
                                        onChange={handleImageUpload}
                            />
                                )}
                                
                            />
                            {!!errors.image && <FormHelperText>{errors.image.message}</FormHelperText> }
                            <Controller
                                name='name'
                                control={control}
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                                name='age'
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField
                                        id="age"
                                        label="Age"
                                        error={!!errors.age}
                                        size="small"
                                        type="number"
                                        helperText={errors.age?.message}
                                        onChange={(e) => {
                                            setValue("age", parseInt(e.target.value))
                                        }}
                                        value={value}

                                    />
                                )}
                            />

                            <Controller
                                name='position'
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="Position">Position</InputLabel>
                                        <Select
                                            labelId="Position"
                                            id="Position"
                                            label="Position"
                                            size="small"
                                            variant='outlined'
                                            {...field}
                                        >
                                            <MenuItem value={0}>CEO</MenuItem>
                                            <MenuItem value={1}>Worker</MenuItem>
                                            <MenuItem value={2}>Captain</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />

                        </Box>
                        <Button sx={{ marginTop: 3 }} type='submit' variant="contained" color="primary">Add</Button>
                        <Button sx={{marginTop : 3, marginLeft : 2}} onClick={handleClose} variant="outlined" color="primary">Cancel</Button>

                    </form>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}