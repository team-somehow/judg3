import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../../../config/queryClient";
import { config } from "../../../config/wagmi";
import { WagmiProvider } from "wagmi";

function DynamicAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DynamicContextProvider
        settings={{
          environmentId: "9970c2a1-812a-46e4-8371-1c6a0473d6c0",
          walletConnectors: [
            EthereumWalletConnectors,
            ZeroDevSmartWalletConnectors,
          ],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </>
  );
}

export default DynamicAuthProvider;
