import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import { http } from "viem";
import dotenv from "dotenv";

dotenv.config();

async function issueAttestation(voter: string, schemaId: string, portalId: string) {
    const rpcUrl = process.env.LINEA_TESTNET_URL;
    if (!rpcUrl) {
        throw new Error("Missing LINEA_TESTNET_URL in .env file.");
    }

    const veraxSdk = new VeraxSdk({
        chainId: 59140,
        transport: http(rpcUrl)
    });

    const attestationPayload = {
        schemaId,
        expirationDate: Math.floor(Date.now() / 1000) + 2592000,  // 30 days expiry
        subject: voter,
        attestationData: [{ hasVoted: true }]
    };

    const txHash = await veraxSdk.portal.attest(portalId, attestationPayload, []);
    console.log("Attestation issued with tx hash:", txHash);
}

export { issueAttestation };