import { Breadcrumbs, Button, Grid, Stack, Typography } from "@mui/material"
import MediaCard from "./CardComponent"
import CustomizedDialogs from "./DialogBoxComponent"
import { useState } from "react"
import { OuterFrame } from "./OuterFrameComponent"
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom"
import { clients, fishfarms } from "../utils/constants"
import { useFishfarm } from "../hooks/fishfarm"
import { useQuery } from "react-query"
import { useClient } from "../hooks/client"
import { FishfarmForm } from "../views/addFishfarmForm"
import { EditFishfarmForm } from "../views/editFishfarmForm"

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

export const ClientInfo = () => {
    const [openWorkerDialog, setOpenWorkerDialog] = useState(false);
    const [openFishfarmForm, setOpenFishfarmForm] = useState(false);
    const [openEditFishfarm, setOpenEditFishfarm] = useState(false);
    const { clientId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState<number | null>(null);
    const [fishfarmId, setFishfarmId] = useState<number | null>()
    const { handleGetClientById } = useClient()
    const { data, isLoading } = useQuery([clients, Number(clientId)], () => handleGetClientById(Number(clientId)))
    console.log({ clientId })

    const handleClick = (Id: number) => {
        setId(Id)
        setOpenWorkerDialog(true);
    }
    const handleAddFishfarm = () => {
        setOpenFishfarmForm(true)
        setId(Number(clientId))

    }
    const handleEditFishfarm = (id: number) => {
        console.log({ id })
        setFishfarmId(id)
        setOpenEditFishfarm(true)


    }
    return (
        <>
            <OuterFrame>
                {fishfarmId && <EditFishfarmForm fishfarmId={fishfarmId} open={openEditFishfarm} setOpen={setOpenEditFishfarm} />}
                {clientId && <FishfarmForm clientId={Number(clientId)} open={openFishfarmForm} setOpen={setOpenFishfarmForm} />}
                {id && <CustomizedDialogs id={id} open={openWorkerDialog} setOpen={setOpenWorkerDialog} />}
                <Grid container direction='row' spacing={6}>
                    <Grid item xs={6}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Typography color="text.inherit">Clients</Typography>
                            <Typography color="text.inherit">{state}</Typography>
                            <Typography color="text.primary">Manage fishfarms</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Button onClick={handleAddFishfarm} variant="contained">Add fish farm</Button>
                    </Grid>
                </Grid>
                <Typography sx={{ flex: '1 1 100%',paddingBottom : 3 }}
                    variant="h5"><b>Client fishfarms</b></Typography>
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
                                        handleEdit={handleEditFishfarm}
                                        handleClick={handleClick} />
                                </Grid>
                            )
                        )}
                </Grid>
            </OuterFrame>
        </>
    )
}