import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';

interface EventCardProps {
  id: number;
  // avatar: string;
  // title: string;
  // subheader: string;
  // image: string;
  // description: string;
  name: string;
  description: string;
  photo: string;
}

const EventCard: React.FC<EventCardProps> = ({
  // avatar,
  // title,
  // subheader,
  // image,
  // description,
  id,
  name,
  description,
  photo,
}) => {
  const handleButtonClick = (id) => {
    console.log('Button clicked', id);
    // redirect to the login
    window.location.href = '/login';
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
          <Avatar
            aria-label="logo"
            sx={{
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
            }}
          >
            {/* <img
              src={avatar}
              alt="E"
              style={{ width: '40px', height: '40px' }}
            /> */}
            {name[0]}
          </Avatar>
        }
        title={name}
        // subheader={subheader}
      />
      <CardMedia component="img" height="194" image={photo} alt={'Image'} />
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            handleButtonClick(id);
          }}
        >
          Start Voting
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
