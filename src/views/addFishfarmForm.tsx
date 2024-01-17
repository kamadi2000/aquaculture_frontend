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
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState<object | null>({});
    const [imageSrc, setImageSrc] = useState('')
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
                    // setImageFile(files)
                    // setImageName(files.name)
                    setValue("image", event.target.files)
                    setValue("imageName",files.name)
                    console.log(event.target.files)
                }
            }
    console.log({imageName})
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
                            {/* {imageName ?
                                (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={imageSrc} />)
                                :
                                (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={profileImage} />)} */}
                            
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
                                render={({ field: { onChange, value } }) => (
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
                                render={({ field: { onChange, value } }) => (
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
                                render={({ field: { onChange, value } }) => (
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

                    </form>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}
// import { useEffect, useRef, useState } from "react"
// import { useFishfarm } from "../hooks/fishfarm";
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import {
//     FormControlLabel, 
//     Switch, 
//     Typography,
//     Box,
//     Button,
//     Dialog,
//     DialogContent,
//     Stack,
//     TextField,
//     SelectChangeEvent
// } from '@mui/material';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

// type AddAdminProps = {
//     clientId : number,
//     open: boolean,
//     setOpen: (r: boolean) => void
// }

// export const FishfarmForm = ({clientId, open, setOpen }: AddAdminProps) => {
//     const handleClose = () => {
//         setOpen(false);
//     };
//     const [name, setName] = useState('');
//     const fileInput = useRef<any>();
//     const [latitude, setLatitude] = useState<number | null>(null);
//     const [longitude, setLongitude] = useState<number | null>(null);
//     const [cages, setCages] = useState<number | null>(null);
//     const [barge, setBarge] = useState<boolean>(false);
//     const [imageName, setImageName] = useState('');
//     const [imageFile, setImageFile] = useState<object | null>({});
//     const { handleAddFishfarm } = useFishfarm();
//     const handleAdd = () => {
//         const fishfarm = { clientId: clientId, name: name, longitude: longitude, latitude: latitude, num_of_cages: cages, has_barge: barge, imageFile: imageFile, imageName: imageName }
//         console.log({fishfarm})
//         handleAddFishfarm(fishfarm)        
//         setOpen(false)
        
//     }
//     useEffect(() => {
//         if (open){
//             setBarge(false)
//             setCages(null)
//             setImageFile(null)
//             setImageName('')
//             setLatitude(null)
//             setLongitude(null)
//             setName('')
//         }
//     },[open])
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setBarge(event.target.checked);
//     };
//     const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             let files = event.target.files[0]
//             setImageFile(files)
//             setImageName(files.name)
//             console.log(event.target.files)
//         } else {
//             setImageFile(null)
//             setImageName('')
//         }
//     }
//     return (
//         <>
//             <BootstrapDialog
//                 onClose={handleClose}
//                 aria-labelledby="customized-dialog-title"
//                 open={open}
//             >
//                 <IconButton
//                     aria-label="close"
//                     onClick={handleClose}
//                     sx={{
//                         position: 'absolute',
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 <DialogContent sx={{ padding: 10, width: 400 }}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 5, paddingRight: 5, paddingTop: 3 }}>
                        
//                         <Stack
//                             maxWidth={400}
//                             component="form"
//                             spacing={2}
//                             noValidate
//                             autoComplete="off"
//                         >
//                             <h1>Add fish farm</h1>
//                             <TextField
//                                 id="name"
//                                 label="Name"
//                                 size="small"
//                                 value={name}
//                                 onChange={(event) => {
//                                     setName(event.target.value);
//                                 }}
//                             />
//                             <input
//                                 id="btn-upload"
//                                 name="btn-upload"
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageUpload}
//                             />

//                             <TextField
//                                 id='latitude'
//                                 label="Latitude"
//                                 type="number"
//                                 size="small"
//                                 value={latitude}
//                                 onChange={(event) => {
//                                     setLatitude(parseFloat(event.target.value));
//                                 }}
//                             />

//                             <TextField
//                                 id="longitude"
//                                 label="Longitude"
//                                 size="small"
//                                 type="number"
//                                 value={longitude}
//                                 onChange={(event) => {
//                                     setLongitude(parseFloat(event.target.value));
//                                 }}
//                             />

//                             <TextField
//                                 id="cages"
//                                 label="Cages"
//                                 size="small"
//                                 type="number"
//                                 value={cages}
//                                 onChange={(event) => {
//                                     setCages(parseInt(event.target.value));
//                                 }}
//                             />
//                             <FormControlLabel
//                                 value={false}
//                                 control={
//                                     <Switch
//                                         checked={barge}
//                                         onChange={handleChange}
//                                         inputProps={{ 'aria-label': 'controlled' }}
//                                     />}
//                                 label="Does fish farm has a barge ?"
//                                 labelPlacement="start"
//                             />

//                             <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
//                         </Stack>
//                     </Box>
//                 </DialogContent>
//             </BootstrapDialog>
//         </>
//     );
// }