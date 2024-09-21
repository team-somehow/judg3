import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
// import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import useMagicLogin from "../auth/magic/useLogin";
import { useDynamicWallet } from "../auth/dynamic/dynamicHooks";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const { token, address, setAddress, setToken } = useAuth();
  const { handleLogOut } = useDynamicWallet();
  const navigate = useNavigate();
  const { handleDisconnect } = useMagicLogin();

  const handleDisconnectOnClick = async () => {
    await handleDisconnect();
    await handleLogOut();
    setAddress("");
    setToken("");
  };

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
                <Button onClick={handleDisconnectOnClick} variant="outlined">
                  {address}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Organize Voting
                </Button>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Start Voting
                </Button>
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
