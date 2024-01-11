import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import liard from '../assets/images/logo512.png';
import { url } from 'inspector';
import { useNavigate } from 'react-router-dom';
import { useFishfarm } from '../hooks/fishfarm';
import { Stack } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';

type mediaCardProps = {
  id: number;
  name: string;
  barge: boolean;
  cages: number;
  longitude: number;
  latitude: number;
  imageName: string | null;
  imageSrc: string,
  handleClick: (id: number) => void;
  handleEdit : (id : number) => void
}

export default function MediaCard({ id, name, barge, cages, longitude, latitude, imageName, imageSrc, handleClick, handleEdit }: mediaCardProps) {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const { handleDelFishfarm } = useFishfarm();
  const handleDelete = (Id: number) => {
    console.log({Id})
    confirm({ description: `This will permanently delete fish farm.` })
            .then(() => handleDelFishfarm(id))
            .catch(() => console.log("Deletion cancelled."))
    
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      {imageName ? (<CardMedia
        sx={{ height: 140 }}
        image={imageSrc}
      />) : (<CardMedia
        sx={{ height: 140 }}
        image={imageSrc}
      />)
      }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {barge ? "The fish farm has a barge." : "The fish farm doesn't have a barge"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The fish farm consist of {cages} number of cages.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location is ({longitude},{latitude})
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Button variant='outlined' onClick={() => handleClick(id)} size="small">Workers</Button>
          <Button variant='outlined' onClick={() => handleEdit(id)} size="small">Edit</Button>
          <Button variant='outlined' onClick={() => handleDelete(id)} size="small">Delete</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}