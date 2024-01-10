import { Breadcrumbs, Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { OuterFrame } from "../components/OuterFrameComponent"
import { useState } from "react"
import { useWorker } from "../hooks/worker";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import profileImage from '../assets/images/profileImage.png'

export const WorkerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { state } = useLocation()
    const [age, setAge] = useState<number | null>(null);
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState<object | null>({});
    const [imageSrc, setImageSrc] = useState('')
    const [position, setPosition] = useState('');
    const { clientId } = useParams()
    const { handleAddWorker } = useWorker();
    const navigate = useNavigate();
    const handleChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value);
    };
    const handleAddWorkerClick = () => {
        const Worker = { clientId: clientId, name: name, email: email, age: age, imageFile: imageFile, imageName: imageName, position: position }
        handleAddWorker(Worker)
    }
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
        }
    }
    return (
        <OuterFrame>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Clients</Typography>
                <Typography color="text.primary">{state}</Typography>
                <Typography color="text.primary">Workers</Typography>
            </Breadcrumbs>
            <Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
                maxWidth={400}
            >
                <h1>Add worker</h1>
                {imageName ?
                    (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={imageSrc} />)
                    :
                    (<img style={{ borderRadius: '50%', height: 150, width: 150, alignSelf: 'center' }} src={profileImage} />)}
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
                
                    
                    {/* <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span" >
                        Choose Image
                    </Button>
                    
                    <Button variant="contained" color="primary" startIcon={<CloudUploadOutlined />} component="span">
                        Upload Rpofile photo
                    </Button> */}
                
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


                <Button onClick={handleAddWorkerClick} variant="contained" color="primary">Add</Button>

            </Stack>
        </OuterFrame>
    )
}