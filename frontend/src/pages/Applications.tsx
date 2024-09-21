import Layout from "../components/dashboard/Layout";
import { Box, Button, Divider, Typography } from "@mui/material";
import CustomStepper from "../components/shared/CustomStepper";
import VoterDetails from "../components/voter/VoterDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import { EventStatus } from "../components/dashboard/LiveEvents";

// Define the possible status choices
const STATUS_CHOICES = ["voters", "project", "active", "complete"];

function Applications() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventStatus | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/get-event-admin");
        const temp = response.data.find(
          (event: EventStatus) => event.id.toString() === id
        );
        setEvent(temp);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [id]);

  const handleNextStatus = async () => {
    if (!event || !id) return;

    // Find the current status index
    const currentIndex = STATUS_CHOICES.indexOf(event.status);
    const nextStatus =
      currentIndex < STATUS_CHOICES.length - 1
        ? STATUS_CHOICES[currentIndex + 1]
        : "complete"; // Fallback to "complete" if at the last status

    try {
      // Send the API request to update the status
      const response = await axiosInstance.post(`/event/${id}/status`, {
        status: nextStatus,
      });

      console.log("Status updated:", response.data);

      // Update the local state with the new status
      setEvent((prevEvent) => ({
        ...prevEvent,
        status: nextStatus,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!id) {
    return <Typography variant="h6">Please select an event</Typography>;
  }

  return (
    <Box>
      <Layout
        left={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <VoterDetails eventId={id} />
          </Box>
        }
        right={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box>
              <Typography variant="h6">Event Status</Typography>
              <Divider />
              {event && (
                <CustomStepper status={event.status} isAdmin isVertical />
              )}
            </Box>
            <Button variant="contained" fullWidth onClick={handleNextStatus}>
              Next
            </Button>
          </Box>
        }
      />
    </Box>
  );
}

export default Applications;
