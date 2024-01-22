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
    FormControlLabel,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { FishfarmFormData, FishfarmFormDataProps } from "../components/FishfarmSchemaComponent";
import { useFishfarm } from "../hooks/fishfarm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type AddFishfarmProps = {
    clientId : number,
    open: boolean,
    setOpen: (r: boolean) => void
}
export const FishfarmForm = ({clientId, open, setOpen }: AddFishfarmProps) => {

    const { handleSubmit, control, setValue,reset, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues: {
            name: "",
            latitude : 0,
            longitude : 0,
            cages : 0,
            barge : false,
            image : {},
            imageName : ""
        },
        resolver: zodResolver(FishfarmFormData)
    })
    const handleClose = () => {
        setOpen(false);
    };

    const { handleAddFishfarm } = useFishfarm();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files[0]) {
                    let files = event.target.files[0]
                    setValue("image", event.target.files)
                    setValue("imageName",files.name)
                    console.log(event.target.files)
                }
            }
    
    const onSubmit = useCallback((values: FishfarmFormDataProps) => {
        const Fishfarm = { clientId: clientId, 
            name: values.name,
            latitude : values.latitude, 
            longitude : values.longitude,
            num_of_cages: values.cages, 
            has_barge: values.barge,  
            imageFile: values.image[0], 
            imageName: values.imageName }
        handleAddFishfarm(Fishfarm) 
        console.log({Fishfarm})
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
                    <Typography sx={{ paddingBottom: 5 }} variant='h6'><b>Add Fishfarm</b></Typography>
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
                            {!!errors.image && errors.image.message}
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
                                name='latitude'
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField
                                        id="latitude"
                                        label="Latitude"
                                        size="small"
                                        type="number"
                                        helperText={errors.latitude?.message}
                                        onChange={(e) => {
                                            setValue("latitude", parseFloat(e.target.value))
                                        }}
                                        value={value}

                                    />
                                )}
                            />
                            <Controller
                                name='longitude'
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField
                                        id="longitude"
                                        label="Longitude"
                                        size="small"
                                        type="number"
                                        helperText={errors.longitude?.message}
                                        onChange={(e) => {
                                            setValue("longitude", parseFloat(e.target.value))
                                        }}
                                        value={value}

                                    />
                                )}
                            />
                            <Controller
                                name='cages'
                                control={control}
                                render={({ field: { value } }) => (
                                    <TextField
                                        id="cages"
                                        label="Cages"
                                        size="small"
                                        type="number"
                                        helperText={errors.cages?.message}
                                        onChange={(e) => {
                                            setValue("cages", parseInt(e.target.value))
                                        }}
                                        value={value}

                                    />
                                )}
                            />

                            <Controller
                                name='barge'
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch inputProps={{ 'aria-label': 'controlled' }}/>
                                            }
                                        label="Does fish farm has a barge ?"
                                        labelPlacement="start"
                                        {...field}
                            />
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
