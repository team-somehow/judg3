import Layout from "../components/dashboard/Layout";
import { Box, Button, Divider, Typography } from "@mui/material";
import CustomStepper from "../components/shared/CustomStepper";
import VoterDetails from "../components/voter/VoterDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EventStatus } from "../components/dashboard/LiveEvents";
import axiosInstance from "../config/axios";
import Upload from "../components/voter/Upload";

// type Props = {};

function UploadProject() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventStatus | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/get-event-admin");
        const temp = response.data.find(
          (event: EventStatus) => event.id.toString() !== id
        );
        setEvent(temp);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [id]);

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
            <Upload eventId={id} />
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
            <Button variant="contained" fullWidth>
              Next
            </Button>
          </Box>
        }
      />
    </Box>
  );
}

export default UploadProject;
