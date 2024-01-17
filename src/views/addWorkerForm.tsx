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
import { number } from "yargs";
import { any } from "prop-types";

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
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState<object | null>({});
    const [imageSrc, setImageSrc] = useState('')
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
            const reader = new FileReader()
            reader.onload = x => {
                setImageSrc(x.target?.result as string)
            }
            reader.readAsDataURL(files)
            setValue("image", event.target.files)
            setValue("imageName",files.name)
            console.log(event.target.files)
        } else {
            setImageFile(null)
            setImageName('')
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
                                {...errors.image && <FormHelperText>{errors.image.message}</FormHelperText> }
                            />
                            
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
                                render={({ field: { onChange, value } }) => (
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

                    </form>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}
// import {
//     Box,
//     Dialog,
//     DialogContent,
//     Button,
//     FormControl,
//     Input,
//     InputLabel,
//     MenuItem,
//     Select,
//     SelectChangeEvent,
//     Stack,
//     TextField,
//     Typography
// } from "@mui/material"

// import { useWorker } from "../hooks/worker";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import profileImage from '../assets/images/profileImage.png'
// import * as EmailValidator from 'email-validator';
// import { useRef, useState } from "react"
// import { useFishfarm } from "../hooks/fishfarm";
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { z } from 'zod'

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

// type AddWorkerProps = {
//     clientId : string
//     open: boolean,
//     setOpen: (r: boolean) => void
// }

// export const WorkerForm = ({clientId, open, setOpen }: AddWorkerProps) => {
//     const handleClose = () => {
//         setOpen(false);
//     };
//     // const FormData = z.object({
//     //     name: z.string().min(1).max(18),
//     //     age: z.string().min(1).max(3),
//     //     email: z.string().email({ message: "Invalid email address" }),
//     //     imageName : z.string().optional(),
//     //     imageFile : z.any().optional(),
//     //     position : z.string(),
//     //     imageSrc : z.string().optional()
//     //   });
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const { state } = useLocation()
//     const [age, setAge] = useState<number | null>(null);
//     const [imageName, setImageName] = useState('');
//     const [imageFile, setImageFile] = useState<object | null>({});
//     const [imageSrc, setImageSrc] = useState('')
//     const [position, setPosition] = useState('');
//     const { handleAddWorker } = useWorker();
//     const navigate = useNavigate();
//     const handleChange = (event: SelectChangeEvent) => {
//         setPosition(event.target.value);
//     };
//     const handleAddWorkerClick = () => {
//         // if (email.length > 0 && EmailValidator.validate(email)) {
//         //     const Worker = { clientId: clientId, name: name, email: email, age: age, imageFile: imageFile, imageName: imageName, position: position }
//         //     handleAddWorker(Worker)
//         // }

//         const Worker = { clientId: clientId, name: name, email: email, age: age, imageFile: imageFile, imageName: imageName, position: position }
//         handleAddWorker(Worker)
//         setOpen(false)
//     }
//     const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             let files = event.target.files[0]
//             const reader = new FileReader()
//             reader.onload = x => {
//                 setImageFile(files)
//                 setImageName(files.name)
//                 setImageSrc(x.target?.result as string)
//             }
//             reader.readAsDataURL(files)
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
//                             component="form"
//                             spacing={2}
//                             noValidate
//                             autoComplete="off"
//                             maxWidth={400}
//                         >
//                             <h1>Add worker</h1>
//                             {imageName ?
//                                 (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={imageSrc} />)
//                                 :
//                                 (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={profileImage} />)}
//                             <input
//                                 id="btn-upload"
//                                 name="btn-upload"
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageUpload}
//                             />
//                             <TextField
//                                 id="name"
//                                 label="Name"
//                                 size="small"
//                                 value={name}
//                                 onChange={(event) => {
//                                     setName(event.target.value);
//                                 }}
//                             />
//                             <TextField
//                                 id="email"
//                                 label="Email"
//                                 size="small"
//                                 type="email"
//                                 value={email}
//                                 onChange={(event) => {
//                                     setEmail(event.target.value);
//                                 }}
//                             />

//                             <TextField
//                                 id="age"
//                                 label="Age"
//                                 size="small"
//                                 value={age}
//                                 type="number"
//                                 onChange={(event) => {
//                                     const newAge = parseInt(event.target.value);
//                                     setAge(newAge)
//                                 }}
//                             />
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Position</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={position}
//                                     label="Position"
//                                     size="small"
//                                     onChange={handleChange}
//                                 >
//                                     <MenuItem value={0}>CEO</MenuItem>
//                                     <MenuItem value={1}>Worker</MenuItem>
//                                     <MenuItem value={2}>Captain</MenuItem>
//                                 </Select>
//                             </FormControl>


//                             <Button onClick={handleAddWorkerClick} variant="contained" color="primary">Add</Button>

//                         </Stack>
//                     </Box>
//                 </DialogContent>
//             </BootstrapDialog>
//         </>
//     );
// }