import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";

async function issueAttestation(voter: string, schemaId: string, portalId: string) {
    const veraxSdk = new VeraxSdk(VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND);

    const attestationPayload = {
        schemaId,
        expirationDate: Math.floor(Date.now() / 1000) + 2592000,  // 30 days
        subject: voter,
        attestationData: [{ hasVoted: true }]
    };

    const txHash = await veraxSdk.portal.attest(portalId, attestationPayload, []);
    console.log("Attestation issued with tx hash:", txHash);
}

export { issueAttestation };