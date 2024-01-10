import { Button, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material"
import { OuterFrame } from "../components/OuterFrameComponent"
import { useRef, useState } from "react"
import { useFishfarm } from "../hooks/fishfarm";
import { useLocation, useParams } from "react-router-dom";

export const FishfarmForm = () => {
    const [name, setName] = useState('');
    const { clientId } = useParams();
    const fileInput = useRef<any>();
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [cages, setCages] = useState<number | null>(null);
    const [barge, setBarge] = useState<boolean>(false);
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState<object | null>({});
    const { handleAddFishfarm } = useFishfarm();
    const handleAdd = () => {
        const fishfarm = { clientId: clientId, name: name, longitude: longitude, latitude: latitude, num_of_cages: cages, has_barge: barge, imageFile: imageFile, imageName: imageName }
        handleAddFishfarm(fishfarm)
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
        <OuterFrame>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6">Fish farms</Typography>
            <Stack
                maxWidth={400}
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