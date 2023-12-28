import { Grid, Typography } from "@mui/material"
import { useState } from "react";
import CustomizedDialogs from "./dialogBoxComponent";
import MediaCard from "./cardComponent";

export const AddFishFarmStep = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const data = [
        { id: 1, name: "Kalpitiya", barge: true, "cages": 4, longitude: 3.4, latitude: 5.4 },
        { id: 2, name: "Mannar", barge: true, cages: 5 },
        { id: 3, name: "Negombo", barge: false, cages: 3 },
        { id: 4, name: "Jaffna", barge: true, cages: 2 },
        { id: 5, name: "Galle", barge: false, cages: 1 }
    ]

    const handleClick = (Id: number) => {
        setId(Id)
        setOpen(true);
    }
    return(
        <>
        <CustomizedDialogs id={id} open={open} setOpen={setOpen} />
                <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {data.map((fishfarmCard) =>
                        <Grid item xs={12} sm={6} md={3}>
                            <MediaCard id={fishfarmCard.id} name={fishfarmCard.name} barge={fishfarmCard.barge} cages={fishfarmCard.cages} handleClick={handleClick} />
                        </Grid>
                    )}
                </Grid>
        
        </>
    )
}