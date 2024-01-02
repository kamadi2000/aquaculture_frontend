import { Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { OuterFrame } from "../components/outerFrameComponent"
import { useEffect, useState } from "react"
import { useWorker } from "../hooks/worker";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { workers } from "../utils/constants";
import profileImage from '../assets/images/profileImage.png'

export const EditWorkerForm = () => {
    const { workerId } = useParams();

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
        handleEditWorker(Worker)
    }
    const handleChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value);
    };
    useEffect(()=> {
        setName(data?.data.name)
        setEmail(data?.data.email)
        setAge(data?.data?.age)
        setImageName(data?.data?.imageName)
        setImageSrc(data?.data?.imageSrc)
        setPosition(String(data?.data.position))
    },[data])

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
        <OuterFrame>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6">Workers</Typography>
            {!isLoading && <Stack
                component="form"
                spacing={2}
                noValidate
            >
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
        </OuterFrame>
    )
}