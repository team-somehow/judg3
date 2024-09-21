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
import useMorphInteractions from "../../hooks/morph/useInteractions";
import { useFlowInteraction } from "../../hooks/useFlowInteraction";

interface EventCardProps {
  id: number;
  name: string;
  description: string;
  photo: string;
  blockchain_event_id?: string;
  hideButton?: boolean;
  setTabValue?: React.Dispatch<React.SetStateAction<number>>;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  description,
  photo,
  blockchain_event_id,
  hideButton = false,
  setTabValue,
}) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { handleAddVoterToEvent } = useMorphInteractions();
  const { applyVoter } = useFlowInteraction();
  const { currentAuthSupply } = useAuth();

  const handleButtonClick = async (eventId: number) => {
    console.log("Button clicked", eventId);

    if (token) {
      // If the user is authenticated, apply to the event
      try {
        const response = await axiosInstance.post("/voter-apply-event/", {
          event_id: eventId,
        });
        console.log("Application successful:", response.data);
        {
          currentAuthSupply === "magic" &&
            applyVoter({ eventId: blockchain_event_id.toString() });
        }
        {
          currentAuthSupply === "dynamic" &&
            handleAddVoterToEvent({ eventId: blockchain_event_id.toString() });
        }
        console.log("Application successful:", response.data);

        // Navigate to the voting dashboard if the application was successful
        navigate(`/voter-dashboard/?tab=applied`);
        setTabValue && setTabValue(1);
        setTabValue && setTabValue(1);
      } catch (error) {
        console.error("Error applying to event:", error);
        console.error("Error applying to event:", error);
        // Handle any errors, such as showing a message to the user
      }
    } else {
      // If not authenticated, redirect to the login page
      navigate("/login");
      navigate("/login");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        textAlign: "start",
        minWidth: 345,
        height: hideButton ? "340px" : "400px",
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
      <CardMedia component="img" height="180" image={photo} alt={"Image"} />
      <CardContent sx={{ p: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            whiteSpace: "pre-wrap",
            height: "80px",
            overflow: "auto",
            borderRadius: "5px",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      {!hideButton && (
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
      )}
    </Card>
  );
};

export default EventCard;
