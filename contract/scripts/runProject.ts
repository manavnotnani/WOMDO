import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Womdo, Womdo__factory } from "../typechain-types";
const { ReturnType, CodeLanguage } = require("@chainlink/functions-toolkit");

const fs = require("fs");
const hre = require("hardhat");

let owner: SignerWithAddress;
let womdo: Womdo;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

enum Location {
  Inline, // Provided within the Request
  Remote, // Hosted through remote location that can be accessed through a provided URL
  DONHosted, // Hosted on the DON's storage
}

async function verify(
  contract: string,
  functionsRouter: string,
  donIdBytes32: any
) {
  await hre.run("verify:verify", {
    //Deployed contract address
    address: contract,

    //Pass arguments as string and comma seprated values
    constructorArguments: [functionsRouter, donIdBytes32],

    //Path of your main contract.
    contract: "contracts/Womdo.sol:Womdo",
  });
}

async function main() {
  [owner] = await ethers.getSigners();

  const functionsRouter = "0xC22a79eBA640940ABB6dF0f7982cc119578E11De";
  const donIdBytes32 = ethers.utils.formatBytes32String("fun-polygon-amoy-1");

  womdo = await new Womdo__factory(owner).deploy(functionsRouter, donIdBytes32);
  await womdo.deployed();

  console.log("Womdo Address: ", womdo.address);

  await verify(womdo.address, functionsRouter, donIdBytes32);

  /*

  womdo = await new Womdo__factory(owner).attach(
    "0x100EF36B40aADE9abD7e249FB1722bc6002e1505"
  );

  let source = fs.readFileSync("./get-influencer-share.js").toString();
  let secretsLocation = Location.Inline;
  let encryptedSecretsReference = "0x";
  let args: any = [];
  let byteArgs: any = [];
  let subscriptionId = 274;
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

  let result = await womdo.getArray(1);
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
