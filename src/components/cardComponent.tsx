import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import liard from '../assets/images/logo512.png';
import { url } from 'inspector';

type mediaCardProps = {
    id : number;
    name : string;
    barge : boolean;
    cages : number;
    longitude : number;
    latitude : number;
    handleClick : (id : number) => void ;
}

export default function MediaCard({id, name, barge, cages, longitude, latitude, handleClick}:mediaCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image='https://srilankainstatours.com/wp-content/uploads/2023/02/Fisherman-in-Mannar-bay-Sri-Lanka-Things-to-do-in-Mannar.webp'
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {barge? "The fish farm has a barge." : "The fish farm doesn't have a barge"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            The fish farm consist of {cages} number of cages.
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Location is ({longitude},{latitude})
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleClick(id)} size="small">See Workers</Button>
      </CardActions>
    </Card>
  );
}