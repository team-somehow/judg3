import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import dotenv from "dotenv";

dotenv.config();

// Log the configuration to verify
console.log("Using Linea Sepolia Configuration");

// Instantiate Verax SDK with the DEFAULT_LINEA_SEPOLIA_FRONTEND configuration
const veraxSdk = new VeraxSdk(VeraxSdk.DEFAULT_LINEA_SEPOLIA);

async function createPortalAndSchema() {
    try {
        console.log("Creating schema and portal...");

        // Define a simple schema for the voting system
        const schemaId = "0xSchema123";  // Replace with actual schema creation logic

        // Deploy a portal using the DEFAULT_LINEA_SEPOLIA_FRONTEND configuration
        const portalTxHash = await veraxSdk.portal.deployDefaultPortal(
            [], 
            "VotingSystem Portal", 
            "Portal for voting attestations", 
            true, 
            "VotingSystemOwner"  
        );

        console.log("Portal created successfully with transaction hash:", portalTxHash);

        // Returning the schema ID and portal ID (example portal ID, replace with actual logic)
        return { schemaId, portalId: "0xPortal456" };
    } catch (error) {
        console.error("Error creating portal and schema:", error);
        throw error;
    }
}

export { createPortalAndSchema };