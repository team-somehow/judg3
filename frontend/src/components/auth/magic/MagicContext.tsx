import { Magic as MagicBase } from "magic-sdk";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { FlowExtension } from "@magic-ext/flow";
import { OAuthExtension } from "@magic-ext/oauth";
import * as fcl from "@onflow/fcl";

import { getNetwork, getNetworkUrl } from "../../../utils/network";

export type Magic = MagicBase<OAuthExtension[] & FlowExtension[]>;

export const MagicContext = createContext<{ magic: Magic | null }>({
  magic: null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useMagic = () => useContext(MagicContext);

const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null);

  useEffect(() => {
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_MAGIC_API_KEY;
    if (PUBLIC_KEY) {
      const magic = new MagicBase(
        import.meta.env.VITE_PUBLIC_MAGIC_API_KEY as string,
        {
          extensions: [
            new OAuthExtension(),
            new FlowExtension({
              rpcUrl: getNetworkUrl(),
              network: getNetwork() as string,
            }),
          ],
        }
      );

      setMagic(magic);
      fcl.config().put("accessNode.api", getNetworkUrl());
      fcl.config().put(
        "discovery.wallet",
        `${getNetworkUrl()}/authn?${new URLSearchParams({
          PUBLIC_KEY,
        })}`
      );
      fcl.config().put("discovery.wallet.method", "IFRAME/RPC");
    }
  }, []);

  return (
    <MagicContext.Provider
      value={{
        magic,
      }}
    >
      {children}
    </MagicContext.Provider>
  );
};

export default MagicProvider;
