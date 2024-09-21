import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Bg from "../components/ui/Bg";
import EventCard from "../components/shared/EventCard";
import GradientCard from "../components/ui/GradientCard";
import { useMagic } from "../components/auth/magic/MagicContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading";

interface Hackathon {
  id: number;
  name: string;
  description: string;
  photo: string;
}

const Home: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setAddress, setToken, token } = useAuth();
  const navigate = useNavigate();
  const { magic } = useMagic();

  useEffect(() => {
    const fetchData = async () => {
      if (!magic) return console.error("Magic not initialized");
      try {
        console.log("Fetching user metadata");

        setLoading(true);
        const m = await magic.user.getMetadata();
        setAddress(m.publicAddress!);
        // setToken(localStorage.getItem("jwtToken")!);

        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [magic, setAddress, setToken]);

  useEffect(() => {
    const fetchHackathons = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}get-event-noauth/`
        );
        console.log("Hackathons:", response.data);
        setHackathons(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <Box sx={{ textAlign: "center", padding: "1rem" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: "900", my: 2 }}>
          Revolutionizing Voting with Judg3
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Host your hackathon on our platform for decentralized, unbiased voting
          <br />
          that ensures every project gets a fair chance to shine.
        </Typography>
      </Container>
      <Button
        variant="contained"
        sx={{
          px: 3,
          py: 1.5,
        }}
        startIcon={
          <img
            src="/logo-black.svg"
            style={{ height: "20px", color: "black" }}
          />
        }
        onClick={() => {
          console.log("Organise Voting");
          if (token) {
            navigate("/dashboard");
          } else {
            navigate("/login");
          }
        }}
      >
        Organise Voting
      </Button>
      <Button
        variant="outlined"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.70) !important",
          height: "50px",
          ml: 2,
        }}
        onClick={() => {
          console.log("Start Voting", token);
          if (token && token?.length > 0) {
            navigate("/voter-dashboard");
          } else {
            navigate("/login");
          }
        }}
      >
        Start Voting
      </Button>
      <GradientCard
        style={{
          mt: 3,
          mx: 5,
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: "#fff" }}
          textAlign="start"
          fontWeight="bold"
        >
          Upcoming Hackathons
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {hackathons.map((hackathon) => (
            <EventCard
              key={hackathon.id}
              id={hackathon.id}
              name={hackathon.name}
              description={hackathon.description}
              photo={hackathon.photo}
            />
          ))}
        </Box>
      </GradientCard>
      <Bg />
    </Box>
  );
};

export default Home;
