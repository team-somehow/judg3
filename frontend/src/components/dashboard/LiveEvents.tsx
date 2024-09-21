import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import { Box, CircularProgress } from "@mui/material";
import axiosInstance from "../../config/axios";
import { useNavigate } from "react-router-dom";

export interface EventStatus {
  id: number;
  name: string;
  description: string;
  photo: string;
  status: string;
}

const LiveEvents: React.FC = () => {
  const [events, setEvents] = useState<EventStatus[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/get-event-admin");
        const temp = response.data.filter(
          (event: EventStatus) => event.status !== "complete"
        );
        setEvents(temp);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleButtonClick = (id: number) => {
    console.log("Go to Event clicked");
    navigate(`/dashboard/applications/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {events.length === 0 ? (
        <CircularProgress />
      ) : (
        events.map((event, index) => (
          <StatusCard
            id={event.id}
            key={index}
            name={event.name}
            description={event.description}
            photo={event.photo}
            statusAdmin={event.status}
            buttonText="Go to Event"
            onButtonClick={() => handleButtonClick(event.id)}
            isAdmin
          />
        ))
      )}
    </Box>
  );
};

export default LiveEvents;
