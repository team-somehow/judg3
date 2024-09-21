import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import { ethers } from "hardhat";
dotenv.config();

async function main() {
    const veraxSdk = new VeraxSdk(VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND, "0x426FF0442150f5633bCA081Bb18dDCFd5fb8c8c6");

    // Step 1: Create Schema
    const schema = "(bool hasVoted)";
    const schemaTxHash = await veraxSdk.schema.create(
        "Voting Schema",
        "Schema for VotingSystemLinea",
        "https://yourapp.com",
        schema
    );
    console.log("Schema created with tx hash:", schemaTxHash);

    // Step 2: Deploy Default Portal
    const portalTxHash = await veraxSdk.portal.deployDefaultPortal(
        [], // No validation modules needed
        "VotingSystem Portal",
        "Portal for Voting System",
        true,  // Attestations are revocable
        "VotingApp"
    );
    console.log("Portal deployed with tx hash:", portalTxHash);

    // Wait for schema and portal creation, then issue attestations
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});