import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import liard from '../assets/images/logo512.png';

type mediaCardProps = {
    id : number;
    name : string;
    barge : boolean;
    cages : number;
    handleClick : (id : number) => void ;
}

export default function MediaCard({id, name, barge, cages, handleClick}:mediaCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={liard}
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
            The fish farm consist of {cages} number od cages.
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleClick(id)} size="small">More Info..</Button>
      </CardActions>
    </Card>
  );
}