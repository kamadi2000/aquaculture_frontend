import { Button, Input, Stack, TextField, Typography } from "@mui/material"
import { OuterFrame } from "./outerFrameComponent"
import { useState } from "react"
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import UnstyledInputBasic from "./numberInputComponent";

export const FishfarmForm = () => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [cages, setCages] = useState('');
    const [barge, setBarge] = useState(false)
    const handleClick = () => {

    }
    return (
        <OuterFrame>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6">Fish farms</Typography>
            <Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
            >
                <h1>Add fish farm</h1>
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
                    id="Password"
                    label="Password"
                    type="password"
                    size="small"
                    value={latitude}
                    onChange={(event) => {
                        setLatitude(event.target.value);
                    }}
                />

                <TextField
                    id='latitude'
                    label="Latitude"
                    size="small"
                    value={latitude}
                    onChange={(event) => {
                        setLatitude(event.target.value);
                    }}
                />

                <TextField
                    id="longitude"
                    label="Longitude"
                    size="small"
                    value={longitude}
                    onChange={(event) => {
                        setLongitude(event.target.value);
                    }}
                />

                <TextField
                    id="Cages"
                    label="cages"
                    size="small"
                    value={cages}
                    onChange={(event) => {
                        setCages(event.target.value);
                    }}
                />

                <TextField
                    id="Barge"
                    label="Does fish farm has a barge ? "
                    size="small"
                    value={barge}
                />


                <Button onClick={handleClick} variant="contained" color="primary">Add</Button>
            </Stack>
        </OuterFrame>
    )
}