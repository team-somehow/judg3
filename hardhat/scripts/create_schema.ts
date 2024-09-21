import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";

async function createSchema() {
    const veraxSdk = new VeraxSdk(VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND);
    const schema = "(bool hasVoted)";

    const txHash = await veraxSdk.schema.create(
        "Voting Schema",
        "Schema for VotingSystem",
        "https://votingsystem.com",
        schema
    );

    const receipt = await veraxSdk.getTransactionReceipt(txHash);
    const schemaId = receipt.logs[0].topics[1];
    console.log("Schema ID:", schemaId);
    return schemaId;
}

export { createSchema };