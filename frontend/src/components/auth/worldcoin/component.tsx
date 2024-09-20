import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";

import { WORLDCOIN_VERIFICATION_ROUTE } from "../../../constants";
import { Button } from "@mui/material";

type Props = {
  onSuccess: () => void;
  onVerify?: (token: string) => void;
  buttonText: string;
};

const AuthWorldCoin = ({ onSuccess, buttonText, onVerify }: Props) => {
  const handleVerify = async (proof: ISuccessResult) => {
    console.log(proof);

    const res = await fetch(WORLDCOIN_VERIFICATION_ROUTE, {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    const data = await res.json();
    localStorage.setItem("jwtToken", data.token);
    onVerify && onVerify(data); // TODO: handle response from backend and only return token string

    if (!res.ok) {
      throw new Error("Verification failed.");
    }
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
