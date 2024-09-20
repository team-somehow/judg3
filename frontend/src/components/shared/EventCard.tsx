import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';

interface EventCardProps {
  avatar: string;
  title: string;
  subheader: string;
  image: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({
  avatar,
  title,
  subheader,
  image,
  description,
}) => {
  const handleButtonClick = () => {
    console.log('Button clicked');
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        textAlign: 'start',
        minWidth: 345,
      }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="logo">
            <img
              src={avatar}
              alt="E"
              style={{ width: '40px', height: '40px' }}
            />
          </Avatar>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="outlined" fullWidth onClick={handleButtonClick}>
          Start Voting
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
