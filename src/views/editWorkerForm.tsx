// import { useWorker } from "../hooks/worker";
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
//     FormControl,
//     FormHelperText,
//     InputLabel,
//     MenuItem,
//     Select,
//     TextField,
//     Typography
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import { EditWorkerFormData, EditWorkerFormDataProps, WorkerFormData, WorkerFormDataProps } from "../components/WorkerSchemaComponent";
// import { number } from "yargs";
// import { any } from "prop-types";
// import { useQuery } from "react-query";
// import { workers } from "../utils/constants";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

// type EditWorkerProps = {
//     workerId: number,
//     open: boolean,
//     setOpen: (r: boolean) => void
// }
// export const EditWorkerForm = ({ workerId, open, setOpen }: EditWorkerProps) => {
//     const { handleGetWorkerById, handleEditWorker } = useWorker();
//     const { data, isLoading } = useQuery([workers, Number(workerId)], () => handleGetWorkerById(Number(workerId)))
//     const [imageName, setImageName] = useState('');
//     const [imageFile, setImageFile] = useState<object | null>({});
//     const [imageSrc, setImageSrc] = useState('')
//     const { handleSubmit, control, setValue,reset, formState: { errors } } = useForm({
//         mode: 'all',
//         defaultValues: {
//             name: "",
//             email: "",
//             age: 0,
//             position: 0,
//             image : {},
//             imageName : ""
//         },
//         resolver: zodResolver(EditWorkerFormData)
//     })
//     const handleClose = () => {
//         setOpen(false);
//     };
//     useEffect(() => {
//         if (data) {
//             setValue('email', data.data.email)
//             setValue('name', data.data.name)
//             setValue('age', data.data.age)
//             setValue('position', data.data.position)
//             // setImageFile(data.data.imageFile)
//             setImageName(data.data.imageName)
//             setImageSrc(data.data.imageSrc)
//         }
//     }, [data])

//     const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             let files = event.target.files[0]
//             const reader = new FileReader()
//             reader.onload = x => {
//                 // setImageFile(files)
//                 // setImageName(files.name)
//                 setImageSrc(x.target?.result as string)
//             }
//             reader.readAsDataURL(files)
//             setValue("image", event.target.files[0])
//             setValue("imageName",files.name)
//             console.log(event.target.files)
//         } else {
//             setValue("image", {})
//             setValue("imageName","")
//         }
//     }

//     const onSubmit = useCallback((values: EditWorkerFormDataProps) => {
//         console.log('hi')
//         const Worker = { 
//             id: Number(workerId), 
//             name: values.name, 
//             email: values.email, 
//             age: values.age, 
//             imageFile: values.image[0], 
//             imageName: values.imageName, 
//             position: values.position }
//         console.log({ Worker })
//         handleEditWorker(Worker)
//         setOpen(false)
//     }, [])
//     console.log({errors})

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
//                     <Typography sx={{ paddingBottom: 5 }} variant='h6'><b>Edit Worker</b></Typography>
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
//                                 name='email'
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField
//                                         error={!!errors.email}
//                                         label='Email'
//                                         type='text'
//                                         size="small"
//                                         variant='outlined'
//                                         helperText={errors.email?.message}
//                                         {...field}
//                                     />
//                                 )}
//                             />
//                             <Controller
//                                 name='age'
//                                 control={control}
//                                 render={({ field: { onChange, value } }) => (
//                                     <TextField
//                                         id="age"
//                                         label="Age"
//                                         size="small"
//                                         type="number"
//                                         helperText={errors.age?.message}
//                                         onChange={(e) => {
//                                             setValue("age", parseInt(e.target.value))
//                                         }}
//                                         value={value}

//                                     />
//                                 )}
//                             />

//                             <Controller
//                                 name='position'
//                                 control={control}
//                                 render={({ field }) => (
//                                     <FormControl fullWidth>
//                                         <InputLabel id="Position">Position</InputLabel>
//                                         <Select
//                                             labelId="Position"
//                                             id="Position"
//                                             label="Position"
//                                             size="small"
//                                             variant='outlined'
//                                             {...field}
//                                         >
//                                             <MenuItem value={0}>CEO</MenuItem>
//                                             <MenuItem value={1}>Worker</MenuItem>
//                                             <MenuItem value={2}>Captain</MenuItem>
//                                         </Select>
//                                     </FormControl>
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
import { useWorker } from "../hooks/worker";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { workers } from "../utils/constants";
import profileImage from '../assets/images/profileImage.png'
import { useEffect, useRef, useState } from "react"
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Stack,
    TextField,
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent
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
    workerId: number,
    open: boolean,
    setOpen: (r: boolean) => void
}

export const EditWorkerForm = ({ workerId, open, setOpen }: EditFishfarmProps) => {
    const handleClose = () => {
        setOpen(false);
    };

    const { handleGetWorkerById, handleEditWorker } = useWorker();
    const { data, isLoading } = useQuery([workers, Number(workerId)], () => handleGetWorkerById(Number(workerId)))
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState<number | null>(null);
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState<object | null>({});
    const [imageSrc, setImageSrc] = useState('')
    const [position, setPosition] = useState('');

    const handleEditWorkerClick = () => {
        const Worker = { id: Number(workerId), name: name, email: email, age: age, imageFile: imageFile, imageName: imageName, position: position }
        console.log({ Worker })
        handleEditWorker(Worker)
        setOpen(false)
    }
    const handleChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value);
    };
    useEffect(() => {
        setName(data?.data.name)
        setEmail(data?.data.email)
        setAge(data?.data?.age)
        setImageName(data?.data?.imageName)
        setImageSrc(data?.data?.imageSrc)
        setPosition(String(data?.data.position))
    }, [data])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let files = event.target.files[0]
            const reader = new FileReader()
            reader.onload = x => {
                setImageFile(files)
                setImageName(files.name)
                setImageSrc(x.target?.result as string)
                
            }
            reader.readAsDataURL(files)

            console.log(event.target.files)
        } else {
            setImageFile(null)
            setImageName('')
            setImageSrc('')
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
                            noValidate
                            maxWidth={400}
                        >
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
                            <TextField
                                id="name"
                                label="Name"
                                size="small"
                                defaultValue={name}
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                size="small"
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />


                            <TextField
                                id="age"
                                label="Age"
                                size="small"
                                value={age}
                                type="number"
                                onChange={(event) => {
                                    const newAge = parseInt(event.target.value);
                                    setAge(newAge)
                                }}
                            />

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={position}
                                    label="Position"
                                    size="small"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>CEO</MenuItem>
                                    <MenuItem value={1}>Worker</MenuItem>
                                    <MenuItem value={2}>Captain</MenuItem>
                                </Select>
                            </FormControl>


                            <Button onClick={handleEditWorkerClick} variant="contained" color="primary">Save changes</Button>

                        </Stack>}
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}