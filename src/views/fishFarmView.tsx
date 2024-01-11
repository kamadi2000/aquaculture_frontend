import { Button, Grid, Typography, styled } from "@mui/material"
import MediaCard from "../components/CardComponent"
import CustomizedDialogs from "../components/DialogBoxComponent"
import { useState } from "react"
import { OuterFrame } from "../components/OuterFrameComponent"
import { useFishfarm } from "../hooks/fishfarm"
import { useQuery } from "react-query"
import { fishfarms } from "../utils/constants"
import { useNavigate } from "react-router-dom"

export interface FishfarmCard {
    id : number,
    name : string,
    has_barge : boolean,
    num_of_cages : number,
    longitude : number,
    latitude : number,
    imageName : string|null,
    imageSrc : string
}
export const FishFarm = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState<number|null>(null);
    const { handleGetFishfarm } = useFishfarm();
    const { data } = useQuery(fishfarms, handleGetFishfarm);
    console.log({ data })
    const navigate = useNavigate();

    const handleClick = (Id: number) => {
        setId(Id)
        setOpen(true);
    }
    return (
        <>
            {/* <OuterFrame>
                {id && <CustomizedDialogs id={id} open={open} setOpen={setOpen} />}
                <Grid container direction='row' spacing={12}>
                <Grid item spacing={6}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6">Fish farms</Typography>
                </Grid>
                <Grid item spacing={6} paddingBottom={6}>
                <Button onClick={() => navigate("/fishFarmView/fishfarmform")} variant="contained">Add fish farm</Button>
                </Grid>
                </Grid>
                
                
                <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {data?.data.map((fishfarmCard  : FishfarmCard) =>
                        <Grid item xs={12} sm={6} md={3}>
                            <MediaCard 
                            id={fishfarmCard.id} 
                            name={fishfarmCard.name} 
                            barge={fishfarmCard.has_barge} 
                            cages={fishfarmCard.num_of_cages}
                            longitude={fishfarmCard.longitude}
                            latitude={fishfarmCard.latitude} 
                            imageName={fishfarmCard.imageName}
                            imageSrc={fishfarmCard.imageSrc}
                            handleClick={handleClick} />
                        </Grid>
                    )}
                </Grid>
            </OuterFrame> */}
        </>
    )
}