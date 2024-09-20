import { polygonAmoy } from "viem/chains";

import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, polygonAmoy],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [polygonAmoy.id]: http(),
  },
});
