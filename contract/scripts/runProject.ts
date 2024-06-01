import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  TetherUSD,
  TetherUSD__factory,
  Womdo,
  Womdo__factory,
} from "../typechain-types";
import { extractAbi } from "../test/utilities";
const { ReturnType, CodeLanguage } = require("@chainlink/functions-toolkit");

const fs = require("fs");
const hre = require("hardhat");

let owner: SignerWithAddress;
let womdo: Womdo;
let usdt: TetherUSD;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

enum Location {
  Inline, // Provided within the Request
  Remote, // Hosted through remote location that can be accessed through a provided URL
  DONHosted, // Hosted on the DON's storage
}

async function verifyContracts(
  womdoAddress: string,
  functionsRouter: any,
  donIdBytes32: any,
  usdtAddress: string
) {
  await hre.run("verify:verify", {
    //Deployed contract address
    address: womdoAddress,

    //Pass arguments as string and comma seprated values
    constructorArguments: [functionsRouter, donIdBytes32, usdtAddress],

    //Path of your main contract.
    contract: "contracts/Womdo.sol:Womdo",
  });
}

async function main() {
  await extractAbi();

  [owner] = await ethers.getSigners();

  // usdt = await new TetherUSD__factory(owner).deploy(owner.address);
  // const deployedUsdt = await usdt.deployed();
  // let usdtBlock = await (
  //   await deployedUsdt.provider.getTransactionReceipt(
  //     deployedUsdt.deployTransaction.hash
  //   )
  // ).blockNumber;

  usdt = await new TetherUSD__factory(owner).attach(
    "0x16a3D0bEb95D05E9c38B21Fd4Ee3672b636A102c"
  );

  const functionsRouter = "0xC22a79eBA640940ABB6dF0f7982cc119578E11De";
  const donIdBytes32 = ethers.utils.formatBytes32String("fun-polygon-amoy-1");

  womdo = await new Womdo__factory(owner).deploy(
    functionsRouter,
    donIdBytes32,
    usdt.address
  );
  const deployedWomdo = await womdo.deployed();

  let womdoBlock = await (
    await deployedWomdo.provider.getTransactionReceipt(
      deployedWomdo.deployTransaction.hash
    )
  ).blockNumber;

  console.log("Womdo Address: ", womdo.address);
  console.log("Womdo Block Number: ", womdoBlock.toString());

  await verifyContracts(
    womdo.address,
    functionsRouter,
    donIdBytes32,
    usdt.address
  );

  // console.log("USDT Address: ", usdt.address);
  // console.log("USDT Block Number: ", usdtBlock.toString());

  /*



  womdo = await new Womdo__factory(owner).attach(
    "0xfc4190bc9a5cc6397199f388a1da1c244891de47"
  );

  let source = fs.readFileSync("./get-influencer-share.js").toString();
  let secretsLocation = Location.Inline;
  let encryptedSecretsReference = "0x";
  let args: any = [];
  let byteArgs: any = [];
  let subscriptionId = 278;
  let callbackGasLimit = 100_000;

  const requestGasLimit = 1_750_000;

  const overrides = {
    gasLimit: requestGasLimit,
  };

  console.log("Sending request...");

  const requestTx = await womdo.sendRequest(
    source,
    secretsLocation,
    encryptedSecretsReference,
    args,
    byteArgs,
    subscriptionId,
    callbackGasLimit,
    overrides
  );
  const requestTxReceipt = await requestTx.wait(1);

  console.log("Request sent...");
  await sleep(5000);

  let result = await womdo.influencerShare(2, 0);
  console.log("result::::", result.toString());

  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//npx hardhat run --network polygonAmoy scripts/runProject.ts
