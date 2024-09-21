import { createPortal } from "./create_portal";

async function deployVotingSystem() {
    console.log("Deploying VotingSystem...");

    const { portalId, schemaId } = await createPortal();
    
    console.log(`Portal ID: ${portalId}, Schema ID: ${schemaId}`);
}

deployVotingSystem().catch((error) => {
    console.error("Deployment error:", error);
});

// VotingSystemLinea deployed at: 0x200C95b976E33B6Dc05D5D52B77C2a497C5e0784