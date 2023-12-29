import { Button, Grid, Typography, styled } from "@mui/material"
import MediaCard from "../components/cardComponent"
import CustomizedDialogs from "../components/dialogBoxComponent"
import { useState } from "react"
import { OuterFrame } from "../components/outerFrameComponent"
import { useFishfarm } from "../hooks/fishfarm"
import { useQuery } from "react-query"
import { fishfarms } from "../utils/constants"
import { useNavigate } from "react-router-dom"

interface FishfarmCard {
    id : number,
    name : string,
    has_barge : boolean,
    num_of_cages : number
}
export const FishFarm = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
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
            <OuterFrame>
                <CustomizedDialogs id={id} open={open} setOpen={setOpen} />
                <Grid container direction='row' spacing={12}>
                <Grid item spacing={6}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6">Fish farms</Typography>
                </Grid>
                <Grid item spacing={6}>
                <Button onClick={() => navigate("/fishFarmView/fishfarmform")} variant="contained">Add fish farm</Button>
                </Grid>
                </Grid>
                
                
                <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {data?.data.map((fishfarmCard  : FishfarmCard) =>
                        <Grid item xs={12} sm={6} md={3}>
                            <MediaCard id={fishfarmCard.id} name={fishfarmCard.name} barge={fishfarmCard.has_barge} cages={fishfarmCard.num_of_cages} handleClick={handleClick} />
                        </Grid>
                    )}
                </Grid>
            </OuterFrame>
        </>
    )
}