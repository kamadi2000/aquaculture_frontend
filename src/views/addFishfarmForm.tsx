import { useRef, useState } from "react"
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

type AddAdminProps = {
    clientId : number,
    open: boolean,
    setOpen: (r: boolean) => void
}

export const FishfarmForm = ({clientId, open, setOpen }: AddAdminProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    const [name, setName] = useState('');
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
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}