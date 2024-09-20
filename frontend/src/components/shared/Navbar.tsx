import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
// import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import useMagicLogin from "../auth/magic/useLogin";

const NavBar: React.FC = () => {
  const { token, address } = useAuth();
  const { handleDisconnect } = useMagicLogin();
  console.log("Token", token);
  console.log("Address", address);

  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <img src="/favicon.svg" style={{ height: "40px" }} />
          <Typography
            variant="h6"
            pl={1}
            sx={{ flexGrow: 1 }}
            fontWeight="bold"
          >
            3-Cast
          </Typography>
          <Box sx={{ gap: 2, display: "flex" }}>
            {token ? (
              <>
                <Button onClick={handleDisconnect} variant="outlined">
                  {address}
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained">Organise Voting</Button>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Button variant="outlined">Start Voting</Button>
                {/* <DynamicWidget
                  innerButtonComponent={
                    <Button variant="outlined">Start Voting</Button>
                  }
                /> */}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
