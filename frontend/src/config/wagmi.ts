import { polygonAmoy } from "viem/chains";

import { createConfig, http } from "wagmi";

export const config = createConfig({
  chains: [polygonAmoy],
  multiInjectedProviderDiscovery: false,
  transports: {
    [polygonAmoy.id]: http(),
  },
});
