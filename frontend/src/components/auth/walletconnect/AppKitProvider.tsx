// import { createAppKit } from "@reown/appkit/react";

// import { WagmiProvider } from "wagmi";
// import { arbitrum, mainnet } from "@reown/appkit/networks";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// // 0. Setup queryClient
// const queryClient = new QueryClient();

// // 1. Get projectId from https://cloud.reown.com
// const projectId = "5e59c6a11fc265de3b5f40f64a2b12b3";

// // 2. Create a metadata object - optional
// const metadata = {
//   name: "Eth Singapore",
//   description: "Eth Singapore",
//   url: "http://localhost:3000",
//   icons: ["https://avatars.githubusercontent.com/u/179229932"],
// };

// export const networks = [mainnet, arbitrum];

// // 3. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   ssr: true,
//   networks,
//   projectId,
// });

// // 4. Create modal
// createAppKit({
//   adapters: [WagmiAdapter],
//   networks: [mainnet, arbitrum],
//   metadata,
//   projectId,
//   features: {
//     analytics: true, // Optional - defaults to your Cloud configuration
//   },
// });

// export function AppKitProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   );
// }
