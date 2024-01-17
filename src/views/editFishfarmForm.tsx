// import profileImage from '../assets/images/profileImage.png'
// import { useCallback, useEffect, useState } from "react"
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { zodResolver } from '@hookform/resolvers/zod'
// import {
//     Box,
//     Button,
//     Dialog,
//     DialogContent,
//     FormControlLabel,
//     Switch,
//     TextField,
//     Typography
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import { FishfarmFormData, FishfarmFormDataProps } from "../components/FishfarmSchemaComponent";
// import { useFishfarm } from "../hooks/fishfarm";
// import { useQuery } from 'react-query';
// import { fishfarms } from '../utils/constants';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

// type EditFishfarmProps = {
//     fishfarmId : number,
//     open: boolean,
//     setOpen: (r: boolean) => void
// }
// export const EditFishfarmForm = ({fishfarmId, open, setOpen }: EditFishfarmProps) => {
//     const [imageName, setImageName] = useState('');
//     const [imageFile, setImageFile] = useState<object | null>({});
//     const [imageSrc, setImageSrc] = useState('')
//     const { handleSubmit, control, setValue,reset, formState: { errors },getValues } = useForm({
//         mode: 'all',
//         defaultValues: {
//             name: "",
//             latitude : 0,
//             longitude : 0,
//             cages : 0,
//             barge : false,
//             image : {},
//             imageName : ""
//         },
//         resolver: zodResolver(FishfarmFormData)
//     })
//     const handleClose = () => {
//         setOpen(false);
//     };

//     const { handleEditFishfarm, handleGetByFishfarmId } = useFishfarm();
//     const { data, isLoading } = useQuery([fishfarms, Number(fishfarmId)], () => handleGetByFishfarmId(Number(fishfarmId)))

//     const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//                 if (event.target.files && event.target.files[0]) {
//                     let files = event.target.files[0]
//                     // console.log('event',event)
//                     setImageFile(files)
//                     setValue("imageName",files.name)
//                 } else {
//                     setImageFile(null)
//                     setImageName('')
//                 }
//             }
//     useEffect(() => {
//         if (data) {
//             setValue('name', data.data.name)
//             setValue('latitude', data.data.latitude)
//             setValue('longitude', data.data.longitude)
//             setValue('barge', data.data.has_barge)
//             setValue('cages', data.data.num_of_cages)
//             setValue('imageName',data.data.imageName)
//             setValue('image',data.data.imageFile)
//             setImageSrc(data.data.imageSrc)
//         }
//     }, [data])
//     const onSubmit = useCallback((values: FishfarmFormDataProps) => {
//         const blob = new Blob([JSON.stringify(imageFile)]);
          
//         var form = new FormData()
//         form.append("name",values.name)
//         form.append("latitude", values.latitude.toString())
//         form.append("longitude" , values.longitude.toString())
//         form.append("num_of_cages", values.cages.toString())
//         form.append("has_barge", JSON.stringify(values.barge))
//         form.append("imageFile" , blob)
//         form.append("imageName", values.imageName)
//         form.append( "id" , fishfarmId.toString())
//         handleEditFishfarm(form)
//         console.log({form})
//         setOpen(false)
//         reset()
//     }, [])
//     console.log({ errors })
//     console.log(getValues())

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
//                     <Typography sx={{ paddingBottom: 5 }} variant='h6'><b>Edit Fishfarm</b></Typography>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <Box sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             gap: "15px",
//                             marginBottom: '15px'
//                         }}>
//                             {/* {imageName ?
//                                 (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={imageSrc} />)
//                                 :
//                                 (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={profileImage} />)} */}
//                             <Controller
//                                 name='image'
//                                 control={control}
//                                 render={({ field }) => (
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleImageUpload}
//                             />
//                                 )}
//                             />
                            
//                             <Controller
//                                 name='name'
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField
//                                         error={!!errors.name}
//                                         label='Name'
//                                         type='text'
//                                         variant='outlined'
//                                         size="small"
//                                         helperText={errors.name?.message}
//                                         {...field}
//                                     />
//                                 )}
//                             />
                            
//                             <Controller
//                                 name='latitude'
//                                 control={control}
//                                 render={({ field: { onChange, value } }) => (
//                                     <TextField
//                                         id="latitude"
//                                         label="Latitude"
//                                         size="small"
//                                         type="number"
//                                         helperText={errors.latitude?.message}
//                                         onChange={(e) => {
//                                             setValue("latitude", parseFloat(e.target.value))
//                                         }}
//                                         value={value}

//                                     />
//                                 )}
//                             />
//                             <Controller
//                                 name='longitude'
//                                 control={control}
//                                 render={({ field: { onChange, value } }) => (
//                                     <TextField
//                                         id="longitude"
//                                         label="Longitude"
//                                         size="small"
//                                         type="number"
//                                         helperText={errors.longitude?.message}
//                                         onChange={(e) => {
//                                             setValue("longitude", parseFloat(e.target.value))
//                                         }}
//                                         value={value}

//                                     />
//                                 )}
//                             />
//                             <Controller
//                                 name='cages'
//                                 control={control}
//                                 render={({ field: { onChange, value } }) => (
//                                     <TextField
//                                         id="cages"
//                                         label="Cages"
//                                         size="small"
//                                         type="number"
//                                         helperText={errors.cages?.message}
//                                         onChange={(e) => {
//                                             setValue("cages", parseInt(e.target.value))
//                                         }}
//                                         value={value}

//                                     />
//                                 )}
//                             />

//                             <Controller
//                                 name='barge'
//                                 control={control}
//                                 render={({ field }) => (
//                                     <FormControlLabel
//                                         control={
//                                             <Switch inputProps={{ 'aria-label': 'controlled' }}/>
//                                             }
//                                         label="Does fish farm has a barge ?"
//                                         labelPlacement="start"
//                                         {...field}
//                             />
//                                 )}
//                             />

//                         </Box>
//                         <Button sx={{ marginTop: 3 }} type='submit' variant="contained" color="primary">Save</Button>

//                     </form>
//                 </DialogContent>
//             </BootstrapDialog>
//         </>
//     );
// }
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fishfarms } from "../utils/constants";
import profileImage from '../assets/images/profileImage.png'
import { useFishfarm } from "../hooks/fishfarm";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    FormControlLabel, 
    Switch, 
    Typography,
    Box,
    Button,
    Dialog,
    DialogContent,
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

type EditFishfarmProps = {
    fishfarmId : number,
    open: boolean,
    setOpen: (r: boolean) => void
}

export const EditFishfarmForm = ({fishfarmId, open, setOpen }: EditFishfarmProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    const { handleEditFishfarm, handleGetByFishfarmId } = useFishfarm();
    const { data, isLoading } = useQuery([fishfarms, Number(fishfarmId)], () => handleGetByFishfarmId(Number(fishfarmId)))
    const fileInput = useRef<any>()
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [cages, setCages] = useState<number | null>(null);
    const [barge, setBarge] = useState<boolean>(false);
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState<object|null>({});
    const [imageSrc, SetImageSrc] = useState('');

    useEffect(()=> {
        setName(data?.data.name)
        setLatitude(data?.data.latitude)
        setLongitude(data?.data.longitude)
        setCages(data?.data.num_of_cages)
        setBarge(data?.data.has_barge)
        setImageName(data?.data.imageName)
        SetImageSrc(data?.data.imageSrc)
    },[data])
    
    const handleEdit = () => {
        const fishfarm = {id : Number(fishfarmId), name: name, longitude: longitude, latitude: latitude, num_of_cages: cages, has_barge: barge, imageFile: imageFile, imageName : imageName }
        console.log({imageName})
        console.log({fishfarm})
        handleEditFishfarm(fishfarm)
        setOpen(false)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBarge(event.target.checked);
    };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let files = event.target.files[0]
            setImageFile(files)
            setImageName(files.name)
            console.log(event.target.files)
        } else {
            setImageFile(null)
            setImageName('')
        }
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 5, paddingRight: 5, paddingTop: 3 }}>
                        
                    {!isLoading && <Stack
                component="form"
                spacing={2}
                maxWidth={400}
            >
                <h1>Edit fish farm</h1>
                
                {/* {imageName ?
                    (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={imageSrc} />)
                    :
                    (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={profileImage} />)} */}
                <input
                    id="btn-upload"
                    name="btn-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                {/* <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => fileInput.current.click()}
                    >
                        upload image
                    </Button>

                    <input
                        onChange={handleImageUpload}
                        ref={fileInput}
                        accept="image/*"
                        type="file"
                        style={{ display: 'none' }}
                    />
                </div> */}
                <TextField
                    id="name"
                    label="Name"
                    size="small"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <TextField
                    id='latitude'
                    label="Latitude"
                    type="number"
                    size="small"
                    value={latitude}
                    onChange={(event) => {
                        const newVal = parseFloat(event.target.value)
                        setLatitude(newVal);
                    }}
                />

                <TextField
                    id="longitude"
                    label="Longitude"
                    size="small"
                    type="number"
                    value={longitude}
                    onChange={(event) => {
                        setLongitude(parseFloat(event.target.value));
                    }}
                />

                <TextField
                    id="cages"
                    label="Cages"
                    size="small"
                    type="number"
                    value={cages}
                    onChange={(event) => {
                        setCages(parseInt(event.target.value));
                    }}
                />
                <FormControlLabel
                    value={false}
                    control={
                        <Switch
                            checked={barge}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />}
                    label="Does fish farm has a barge ?"
                    labelPlacement="start"
                />

                <Button onClick={handleEdit} variant="contained" color="primary">Save changes</Button>
                    
            </Stack>}
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}