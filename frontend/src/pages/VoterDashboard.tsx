import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Tabs, Tab } from "@mui/material";
import GradientCard from "../components/ui/GradientCard";
import Bg from "../components/ui/Bg";
import UpcomingEvents from "../components/voter/UpcomingEvents";
import AppliedEvents from "../components/voter/AppliedEvents";
import { useLocation, useNavigate } from "react-router-dom";

function VoterDashboard() {
  const location = useLocation(); // React Router hook to get current location
  const navigate = useNavigate(); // React Router hook to navigate programmatically

  // Extract 'tab' parameter from the URL
  const urlParams = new URLSearchParams(location.search);
  const tab = urlParams.get("tab");

  // Set the initial tab based on the query parameter
  const [tabValue, setTabValue] = useState(tab === "applied" ? 1 : 0);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);

    // Update URL query parameters
    const newTab = newValue === 1 ? "applied" : "upcoming";
    navigate(`?tab=${newTab}`, { replace: true });
  };

  // Update the URL whenever the tabValue changes
  useEffect(() => {
    const newTab = tabValue === 1 ? "applied" : "upcoming";
    navigate(`?tab=${newTab}`, { replace: true });
  }, [tabValue, navigate]);

  return (
    <Box sx={{ p: "2rem" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="600" gutterBottom>
          Voter Events
        </Typography>

        {/* Tabs for switching between Live and Past events */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Hackathon Tabs"
          sx={{ mb: 3 }}
        >
          <Tab
            label="Upcoming"
            sx={{
              textTransform: "none",
              fontSize: "1.2rem",
              color: tabValue === 0 ? "color.primary" : "text.secondary",
            }}
          />
          <Tab
            label="Applied"
            sx={{
              textTransform: "none",
              fontSize: "1.2rem",
              color: tabValue === 1 ? "color.primary" : "text.secondary",
            }}
          />
        </Tabs>

        <GradientCard style={{ minHeight: "70vh" }}>
          {tabValue === 0 && <UpcomingEvents setTabValue={setTabValue} />}
          {tabValue === 1 && <AppliedEvents />}
        </GradientCard>
      </Container>

      <Bg />
    </Box>
  );
}

export default VoterDashboard;
