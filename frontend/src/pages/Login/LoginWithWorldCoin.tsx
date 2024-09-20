import { WorldcoinLogin } from "../../components/auth/worldcoin";
import { Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useNavigate } from "react-router-dom";

const LoginWithWorldCoin = () => {
  const navigate = useNavigate();
  const handleSuccessLogin = () => {
    console.log("Success login");
    enqueueSnackbar("Successfully verified with worldcoin", {
      variant: "success",
    });
    navigate("/"); // TODO: Update Redirect
  };
  return (
    <Box>
      <WorldcoinLogin
        onSuccess={handleSuccessLogin}
        buttonText="Verify with WorldCoin"
      />
    </Box>
  );
};

export default LoginWithWorldCoin;
