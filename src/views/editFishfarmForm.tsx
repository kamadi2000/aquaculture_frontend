import { Button, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material"
import { OuterFrame } from "../components/OuterFrameComponent"
import { useEffect, useState } from "react"
import { useFishfarm } from "../hooks/fishfarm";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fishfarms } from "../utils/constants";
import profileImage from '../assets/images/profileImage.png'

export const EditFishfarmForm = () => {

    const { handleEditFishfarm, handleGetByFishfarmId } = useFishfarm();
    const { fishfarmId } = useParams();

    const { data, isLoading } = useQuery([fishfarms, Number(fishfarmId)], () => handleGetByFishfarmId(Number(fishfarmId)))
    
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
            {!isLoading && <Stack
                component="form"
                spacing={2}
            >
                <h1>Edit fish farm</h1>
                
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

                <Button onClick={handleEdit} variant="contained" color="primary">Edit</Button>
                    
            </Stack>}
        </OuterFrame>
    )
}