import { ethers } from "hardhat";

const hre = require("hardhat");

async function main() {
  await hre.run("verify:verify", {
    //Deployed contract address
    address: "0x16a3D0bEb95D05E9c38B21Fd4Ee3672b636A102c",

    //Pass arguments as string and comma seprated values
    constructorArguments: ["0x971ca37088734aDEB6580DB5A61d753597e2346F"],

    //Path of your main contract.
    contract: "contracts/USDT.sol:TetherUSD",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//npx hardhat run --network polygonAmoy scripts/verify.ts
