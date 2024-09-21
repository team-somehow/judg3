import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";

import { WORLDCOIN_VERIFICATION_ROUTE } from "../../../constants";
import { Button } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { enqueueSnackbar } from "notistack";

type Props = {
  onSuccess: () => void;
  onVerify?: (token: string) => void;
  buttonText: string;
};

const AuthWorldCoin = ({ onSuccess, buttonText, onVerify }: Props) => {
  const { setToken, address, appChain } = useAuth();
  const handleVerify = async (proof: ISuccessResult) => {
    console.log(proof);
    if (!address || !appChain) {
      enqueueSnackbar("Address or appChain not found", {
        variant: "error",
      });
      return;
    }

    console.log("Address and appChain found");
    console.log(address, appChain);

    const res = await fetch(WORLDCOIN_VERIFICATION_ROUTE, {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...proof,
        action: "login",

        user_address: address,
        chain_of_address: appChain,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Verification failed.");
    }

    console.log(data, data.token);

    localStorage.setItem("hussainToken", data.token);

    setToken(data.token);
    localStorage.setItem("jwtToken", data.token);
    onVerify && onVerify(data);
    return true;
  };

  return (
    <div>
      <IDKitWidget
        app_id={import.meta.env.VITE_WORLDCOIN_APP_ID}
        action={import.meta.env.VITE_WORLDCOIN_ACTION_ID}
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        verification_level={VerificationLevel.Device}
      >
        {({ open }: { open: () => void }) => (
          <Button variant="contained" onClick={open}>
            {buttonText}
          </Button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default AuthWorldCoin;
