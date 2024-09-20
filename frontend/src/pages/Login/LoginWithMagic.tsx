import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import useMagicLogin from "../../components/auth/magic/useLogin";
import InputField from "../../components/shared/InputField";

const LoginWithMina = () => {
  const { handleOnLogin } = useMagicLogin();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await handleOnLogin({ setLoading: setLoading, email });
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      navigate("/login/verify");
    } catch (error) {
      enqueueSnackbar("Error while logging in", { variant: "error" });
    }
  };
  return (
    <>
      {loading ? (
        <Box
          height="50vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 3, color: "#fff" }}
              textAlign="start"
              fontWeight="bold"
            >
              Login Page
            </Typography>
            <InputField
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setEmail(event.target.value)}
              variant="outlined"
              label="Email"
            />
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      )}
    </>
  );
};

export default LoginWithMina;
