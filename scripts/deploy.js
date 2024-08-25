// const solanaWeb3 = require("@solana/web3.js");

// const main = async () => {
//     // Connect to the Solana Devnet
//     const connection = new solanaWeb3.Connection(
//         solanaWeb3.clusterApiUrl('devnet'),
//         'confirmed'
//     );

//     // Generate a new keypair
//     const keypair = solanaWeb3.Keypair.generate();

//     console.log("New Keypair Generated:");
//     console.log("Public Key:", keypair.publicKey.toBase58());
//     console.log("Secret Key:", keypair.secretKey);

//     // Airdrop some SOL to the new keypair
//     // const airdropSignature = await connection.requestAirdrop(
//     //     keypair.publicKey,
//     //     solanaWeb3.LAMPORTS_PER_SOL, // 1 SOL
//     // );

//     // Confirm the transaction
//     // await connection.confirmTransaction(airdropSignature);

//     // Get the balance of this address 3Usv9SMZLfhVfJgmAcYi8SsR2V2uL8wu6V4fBDWF7vUq
//     const balance = await connection.getBalance(new solanaWeb3.PublicKey("7kYTNGEz3Hjt2f37jEfZzP8jonNbq1HCVecEq2PsBoGc"));
//     // const balance = await connection.getBalance(keypair.publicKey);
//     console.log("Balance:", balance / solanaWeb3.LAMPORTS_PER_SOL, "SOL");
//     const address = keypair.publicKey.toBase58();
//     console.log("Address:", address);
// };

// main().catch(err => {
//     console.error(err);
// });

const hre = require("hardhat"); // Import Hardhat Runtime Environment
const { ethers } = require("hardhat");

async function main() {
    // Get the contract to deploy
    const CoinFlipGame = await ethers.getContractFactory("CoinFlipGame");

    // Define the bet amount (for example, 0.1 ether)
    const betAmount = ethers.parseEther("0.1");

    // Deploy the contract with the bet amount as an argument
    const coinFlipGame = await CoinFlipGame.deploy(betAmount);

    // Wait for the deployment to be confirmed
    await coinFlipGame.waitForDeployment();

    console.log("CoinFlipGame deployed to:", await coinFlipGame.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });