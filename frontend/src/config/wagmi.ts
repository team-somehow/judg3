import { polygonAmoy } from "viem/chains";

import { createConfig, http } from "wagmi";
import { mainnet, morphHolesky } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, polygonAmoy],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [polygonAmoy.id]: http(),
  },
});
export const config2 = createConfig({
  chains: [mainnet, polygonAmoy],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [polygonAmoy.id]: http(),
    [morphHolesky.id]: http(),
  },
});
