import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const NavBar: React.FC = () => {
  const { token, address } = useAuth();
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
                <Button variant="contained">Organise Voting</Button>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Button variant="outlined">Start Voting</Button>
              </>
            ) : (
              <>
                <Button variant="outlined">{address}</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
