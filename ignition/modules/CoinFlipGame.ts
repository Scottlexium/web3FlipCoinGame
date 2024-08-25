import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("CoinFlipGame", (m) => {
    const coinFlipGameContract = m.contract("CoinFlipGame", ["100"]);

    return { coinFlipGameContract };
});

export default LockModule;
