import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Womdo, Womdo__factory } from "../typechain-types";
const { ReturnType, CodeLanguage } = require("@chainlink/functions-toolkit");

const fs = require("fs");

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

describe("Lock", function () {
  it("should be deployed", async function () {
    [owner] = await ethers.getSigners();

    const functionsRouter = "0xC22a79eBA640940ABB6dF0f7982cc119578E11De";
    const donIdBytes32 = ethers.utils.formatBytes32String("fun-polygon-amoy-1");

    womdo = await new Womdo__factory(owner).deploy(
      functionsRouter,
      donIdBytes32
    );
    await womdo.deployed();

    console.log(womdo.address);

    let source = fs.readFileSync("./get-influencer-share.js").toString();
    let secretsLocation = Location.Inline;
    let encryptedSecretsReference = "0x";
    let args: any = [];
    let byteArgs: any = [];
    let subscriptionId = 267;
    let callbackGasLimit = 6000000;

    console.log("Sending request...");

    await womdo.sendRequest(
      source,
      secretsLocation,
      encryptedSecretsReference,
      args,
      byteArgs,
      subscriptionId,
      callbackGasLimit
    );

    console.log("Request sent...");
    await sleep(5000);

    let result = await womdo.getArray(5);
    console.log("result::::", result);
  });
});
