import { Outlet, useNavigate } from "react-router-dom";

import { Box, Container } from "@mui/material";

import Bg from "../../components/ui/Bg";
import GradientCard from "../../components/ui/GradientCard";
import { useEffect } from "react";
import { useDynamicWallet } from "../../components/auth/dynamic/dynamicHooks";

const LoginWrapper = () => {
  const navigate = useNavigate();
  const { chain, address } = useDynamicWallet();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // TODO: Redirect to home if user is already logged in
    }
  }, [navigate, chain, address]);
  return (
    <Box sx={{ textAlign: "center", padding: "1rem" }}>
      <Container maxWidth="lg">
        <GradientCard
          style={{
            width: "50%",
            mt: 3,
            mx: "auto",
            p: 3,
          }}
        >
          <Outlet />
        </GradientCard>
        <Bg />
      </Container>
    </Box>
  );
};

export default LoginWrapper;
