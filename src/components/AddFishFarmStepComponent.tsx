import { Grid, Typography } from "@mui/material"
import { useState } from "react";
import CustomizedDialogs from "./dialogBoxComponent";
import MediaCard from "./cardComponent";
import { IAddFishFarmData } from "./stepperComponent";
import Checkbox from '@mui/material/Checkbox';
import { useFishfarm } from "../hooks/fishfarm";
import { useQuery } from "react-query";
import { fishfarms } from "../utils/constants";
import { FishfarmCard } from "../views/fishFarmView";

type AddFishFarmProps = {
    formData: IAddFishFarmData
    setFormData: (props: IAddFishFarmData) => void
}

export const AddFishFarmStep = ({ formData, setFormData }: AddFishFarmProps) => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const { handleGetFishfarm } = useFishfarm();
    const { data } = useQuery(fishfarms, handleGetFishfarm)

    const handleClick = (Id: number) => {
        setId(Id)
        setOpen(true);
    }
    const handleSelect = (id: number) => {
        setFormData({ ...formData, fishfarmId: formData.fishfarmId === id ? null : id })

    }
    return (
        <>
            <CustomizedDialogs id={id} open={open} setOpen={setOpen} />
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
                {data?.data.map((fishfarmCard: FishfarmCard) =>
                    <Grid item xs={12} sm={6} md={3}>
                        <div>
                            <Checkbox checked={formData.fishfarmId === fishfarmCard.id} onChange={() => handleSelect(fishfarmCard.id)} />
                            <Grid item xs={12} sm={6} md={3}>
                            <MediaCard 
                            id={fishfarmCard.id} 
                            name={fishfarmCard.name} 
                            barge={fishfarmCard.has_barge} 
                            cages={fishfarmCard.num_of_cages}
                            longitude={fishfarmCard.longitude}
                            latitude={fishfarmCard.latitude} 
                            handleClick={handleClick} />
                        </Grid>
                        </div>
                    </Grid>
                )}
            </Grid>

        </>
    )
}