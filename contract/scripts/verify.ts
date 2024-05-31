import { ethers } from "hardhat";

const hre = require("hardhat");

async function main() {
  const functionsRouter = "0xC22a79eBA640940ABB6dF0f7982cc119578E11De";
  const donIdBytes32 = ethers.utils.formatBytes32String("fun-polygon-amoy-1");

  // Logging the constructor arguments to check their values
  console.log("Constructor Arguments:", [functionsRouter, donIdBytes32]);

  await hre.run("verify:verify", {
    //Deployed contract address
    address: "0x100EF36B40aADE9abD7e249FB1722bc6002e1505",

    //Pass arguments as string and comma seprated values
    constructorArguments: [functionsRouter, donIdBytes32],

    //Path of your main contract.
    contract: "contracts/Womdo.sol:Womdo",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//npx hardhat run --network polygonAmoy scripts/verify.ts
