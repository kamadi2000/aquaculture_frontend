import { Button, Grid, Stack, Typography } from "@mui/material"
import MediaCard from "./CardComponent"
import CustomizedDialogs from "./DialogBoxComponent"
import { useState } from "react"
import { OuterFrame } from "./OuterFrameComponent"
import { useNavigate, useParams } from "react-router-dom"
import { FishfarmCard } from "../views/fishFarmView"
import { clients, fishfarms } from "../utils/constants"
import { useFishfarm } from "../hooks/fishfarm"
import { useQuery } from "react-query"
import { useClient } from "../hooks/client"

export const ClientInfo = () => {
    const [open, setOpen] = useState(false);
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState<number | null>(null);
    const { handleGetClientById } = useClient()
    const { data, isLoading } = useQuery([clients, Number(clientId)], () => handleGetClientById(Number(clientId)))
    console.log({ data })

    const handleClick = (Id: number) => {
        setId(Id)
        setOpen(true);
    }
    return (
        <>
            <OuterFrame>
                {id && <CustomizedDialogs id={id} open={open} setOpen={setOpen} />}
                <Grid container direction='row' spacing={12}>
                    <Grid item spacing={6}>
                        <Typography sx={{ flex: '1 1 100%' }} variant="h6">Client/Fish farms</Typography>
                    </Grid>
                    <Grid item spacing={6} paddingBottom={6}>
                        <Button onClick={() => navigate(`/fishfarmform/${clientId}`)} variant="contained">Add fish farm</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {(data?.data.fishFarms)?.length == 0 ?
                        <Typography gutterBottom sx={{ padding: 6 }}>No fish farm are owned by this client.</Typography>
                        : (
                            (data?.data.fishFarms)?.map((fishfarmCard: FishfarmCard) =>
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
                            )
                        )}
                </Grid>
            </OuterFrame>
        </>
    )
}