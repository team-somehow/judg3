import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAuth } from "../../../context/AuthContext";
import { saveToken } from "../../../utils/comman";

export const useDynamicWallet = () => {
  const { address, isConnected, chain, isConnecting } = useAccount();
  const { setAddress, setToken } = useAuth();
  const { primaryWallet, handleLogOut } = useDynamicContext();

  useEffect(() => {
    if (!primaryWallet) {
      return;
    }

    const { connector } = primaryWallet;

    if (!isZeroDevConnector(connector)) {
      return;
    }

    const signerConnector = connector.getEOAConnector();

    if (!signerConnector) {
      return;
    }

    const fnc = async () => {
      // This is the signer address
      const response = await signerConnector.getAddress();

      // setSignerAddress(address);
      console.log("zerodev aa account:", response);
      setAddress(response!);
      // setToken("DYNAMIC");
      saveToken(response!, "DYNAMIC");
      localStorage.setItem("address", response!);
    };
    fnc();
  }, [primaryWallet, setAddress, setToken]);

  return { address, isConnected, chain, handleLogOut, isConnecting };
};
