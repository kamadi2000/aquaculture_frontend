import { Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { OuterFrame } from "../components/outerFrameComponent"
import { useState } from "react"
import { useWorker } from "../hooks/worker";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { workers } from "../utils/constants";

export const EditWorkerForm = () => {
    const { workerId } = useParams();

    const { handleGetWorkerById, handleEditWorker } = useWorker();
    const { data, isLoading } = useQuery([workers, Number(workerId) ], () => handleGetWorkerById(Number(workerId)))

    const [name, setName] = useState(data?.data.name);
    const [email, setEmail] = useState(data?.data?.email);
    const [age, setAge] = useState<number|null>(data?.data?.age);
    const [picture, setPicture] = useState(data?.data?.picture);
    const [position, setPosition] = useState(data?.data?.position);
    
    const handleEditWorkerClick = () => {
        const Worker = {id : workerId, name : name, email : email, age : age, picture : picture, position : position}
        handleEditWorker(Worker)
    }
    const handleChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value);
    };
    return (
        <OuterFrame>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6">Workers</Typography>
            <Stack
                component="form"
                spacing={2}
            >
                <TextField
                    id="name"
                    label= "Name"
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

                <TextField
                    id="picture"
                    label="Picture"
                    size="small"
                    value={picture}
                    onChange={(event) => {
                        setPicture(event.target.value);
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

            </Stack>
        </OuterFrame>
    )
}