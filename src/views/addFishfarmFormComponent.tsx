import { Button, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography } from "@mui/material"
import { OuterFrame } from "../components/outerFrameComponent"
import { useState } from "react"
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import UnstyledInputBasic from "../components/numberInputComponent";
import { useFishfarm } from "../hooks/fishfarm";

export const FishfarmForm = () => {
    const [name, setName] = useState('');
    const [image, SetImage] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [cages, setCages] = useState<number | null>(null);
    const [barge, setBarge] = useState<boolean>(false);
    const { handleAddFishfarm } = useFishfarm();
    const handleAdd = () => {
        const fishfarm = {name : name,  longitude : longitude, latitude : latitude, num_of_cages : cages, has_barge : barge, image : image}
        handleAddFishfarm(fishfarm)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBarge(event.target.checked);
      };
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
                    id="picture"
                    label="Picture"
                    size="small"
                    value={image}
                    onChange={(event) => {
                        SetImage(event.target.value);
                    }}
                />

                <TextField
                    id='latitude'
                    label="Latitude"
                    type="number"
                    size="small"
                    value={latitude}
                    onChange={(event) => {
                        setLatitude(parseFloat(event.target.value));
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

                <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
            </Stack>
        </OuterFrame>
    )
}