import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  DynamicContextProvider,
  getAuthToken,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../../../config/queryClient";
import { config2 } from "../../../config/wagmi";
import { WagmiProvider } from "wagmi";

export const DynamicEnvironmentIdForPolygonAmoyAndAA =
  "9970c2a1-812a-46e4-8371-1c6a0473d6c0";
export const DynamicEnvironmentIdForMorph =
  "a341cd0f-147b-451a-9d31-cfc0456fba11";

function DynamicAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <DynamicContextProvider
        settings={{
          environmentId: DynamicEnvironmentIdForPolygonAmoyAndAA,
          walletConnectors: [
            EthereumWalletConnectors,
            ZeroDevSmartWalletConnectors,
          ],
          events: {
            onAuthSuccess: (args) => {
              console.log("onAuthSuccess was called", args);
              const authToken = getAuthToken();
              console.log("authToken", authToken);
              window.location.href = "/login/verify";
            },
          },
        }}
      > */}
      <DynamicContextProvider
        settings={{
          environmentId: DynamicEnvironmentIdForMorph,
          walletConnectors: [EthereumWalletConnectors],
          events: {
            onAuthSuccess: (args) => {
              console.log("onAuthSuccess was called", args);
              const authToken = getAuthToken();
              console.log("authToken", authToken);
              window.location.href = "/login/verify";
            },
          },
        }}
      >
        <WagmiProvider config={config2}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
        {/* </DynamicContextProvider> */}
      </DynamicContextProvider>
    </>
  );
}

export default DynamicAuthProvider;
