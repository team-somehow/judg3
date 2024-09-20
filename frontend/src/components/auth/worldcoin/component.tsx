import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';

import { WORLDCOIN_VERIFICATION_ROUTE } from '../../../constants';

type Props = {
  onSuccess: () => void;
  buttonText: string;
};

const AuthWorldCoin = ({ onSuccess, buttonText }: Props) => {
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
          <button onClick={open}>{buttonText}</button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default AuthWorldCoin;
