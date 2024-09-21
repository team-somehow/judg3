import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios"; // Import your axios instance

interface EventCardProps {
  id: number;
  name: string;
  description: string;
  photo: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  description,
  photo,
}) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = async (eventId: number) => {
    console.log("Button clicked", eventId);

    if (token) {
      // If the user is authenticated, apply to the event
      try {
        const response = await axiosInstance.post("/voter-apply-event/", {
          event_id: eventId,
        });
        console.log("Application successful:", response.data);

        // Navigate to the voting dashboard if the application was successful
        navigate(`/voter-dashboard/?tab=applied`);
      } catch (error) {
        console.error("Error applying to event:", error);
        // Handle any errors, such as showing a message to the user
      }
    } else {
      // If not authenticated, redirect to the login page
      navigate("/login");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        textAlign: "start",
        minWidth: 345,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="logo"
            sx={{
              bgcolor: "primary.main",
              width: 40,
              height: 40,
            }}
          >
            {name[0]}
          </Avatar>
        }
        title={name}
      />
      <CardMedia component="img" height="194" image={photo} alt={"Image"} />
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}
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
          Apply to Event
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
