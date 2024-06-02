"use client";
import React, { useState, useEffect } from "react";
import ConnectWalletAlert from "@/components/connectWalletAlert/connectWalletAlert";
import "./claim.scss";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import SmallTitle from "@/components/smalltitle/smalltitle";
import { Button, Container, Row, Table } from "react-bootstrap";
import {
  API_ROUTES,
  API_URL,
  ROUTES,
  UsdtAddress,
  WomdoAddress,
} from "@/utils/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import WomdoAbi from "../../abi/Womdo.json";
import { getError } from "@/utils/common.service";
import Loader from "@/components/loader/loader";

enum Location {
  Inline, // Provided within the Request
  Remote, // Hosted through remote location that can be accessed through a provided URL
  DONHosted, // Hosted on the DON's storage
}

const Claim = () => {
  const [loader, setLoader] = useState(false);
  const { address, isConnected } = useWeb3ModalAccount();
  const [claimBrands, setClaimBrands] = useState([]);
  const [generateButtonDone, setGenerateButtonDone] = useState(false);
  const router = useRouter();
  const { walletProvider }: any = useWeb3ModalProvider();

  let source = `
  const { ethers } = await import("npm:ethers@6.12.1");
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  
  const adId = args[0];
  
  const apiResponse = await Functions.makeHttpRequest({
    url: 'https://womdo.vercel.app/claim/' + adId,
  });
  
  const { data } = apiResponse;
  const encoded = abiCoder.encode(['uint256[]'], [uint256Array]);
  return ethers.getBytes(encoded);
`;

  const handleGenerateClaim = async (id: string) => {
    if (!isConnected) {
      toast.error("Please connect wallet!");
      return;
    }

    let finalSource: any = source;
    let secretsLocation = Location.Inline;
    let encryptedSecretsReference = "0x";
    let args = [id];
    let byteArgs: any = [];
    let subscriptionId = 298;
    let callbackGasLimit = 100_000;

    try {
      setLoader(true);
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();
      const WomdoContract = new ethers.Contract(WomdoAddress, WomdoAbi, signer);
      const gasLimit = await WomdoContract.estimateGas.sendRequest(
        finalSource,
        secretsLocation,
        encryptedSecretsReference,
        args,
        byteArgs,
        subscriptionId,
        callbackGasLimit
      );
      const acceptAd = await WomdoContract.sendRequest(
        finalSource,
        secretsLocation,
        encryptedSecretsReference,
        args,
        byteArgs,
        subscriptionId,
        callbackGasLimit,
        {
          gasLimit: gasLimit,
        }
      );
      const reciept = await acceptAd.wait(1);
      if (!reciept) {
        toast.error("Generate request failed", { id: "toast" });
        return;
      }
      setLoader(false);
      toast.success("Request generated successfully!", { id: "toast" });

      setTimeout(() => {
        setGenerateButtonDone(true);
      }, 3000);
    } catch (error: any) {
      setLoader(false);
      toast.error(getError(error), { id: "toast" });
    }
  };

  const handleGetRewardContract = async (adId: any) => {
    try {
      setLoader(true);
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();
      const WomdoContract = new ethers.Contract(WomdoAddress, WomdoAbi, signer);
      const gasLimit = await WomdoContract.estimateGas.claim(adId);
      const acceptAd = await WomdoContract.claim(adId, {
        gasLimit: gasLimit,
      });
      const reciept = await acceptAd.wait(1);
      if (!reciept) {
        toast.error("Claim Request failed", { id: "toast" });
        return;
      }
      setLoader(false);
      toast.success("Claim generated successfully!", { id: "toast" });

      setTimeout(() => {
        setGenerateButtonDone(true);
      }, 3000);
    } catch (error: any) {
      setLoader(false);
      toast.error(getError(error), { id: "toast" });
    }
  };

  const handleGetReward = async (adId: string) => {
    try {
      const response = await fetch(API_URL + API_ROUTES.GET_REWARD + adId, {
        method: "GET",
      });

      const data = await response.json();
      if (data.status) {
        handleGetBrands();
      }
    } catch (error) {
      console.error("Error fetching invitations:", error);
    }
  };

  const handleGetBrands = async () => {
    try {
      const response = await fetch(
        API_URL + API_ROUTES.GET_CLAIM_BRANDS + address,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      console.log("data.data", data.data);

      if (data.status) {
        setClaimBrands(data.data);
      }
    } catch (error) {
      console.error("Error fetching invitations:", error);
    }
  };

  useEffect(() => {
    handleGetBrands();
  }, []);

  return (
    <section className="claim_page">
      <SmallTitle title="Claim Reward" className="text-start" />
      {!isConnected ? (
        <ConnectWalletAlert />
      ) : loader ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Brand Name</th>
                  <th>Product Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {claimBrands && claimBrands.length ? (
                  claimBrands.map((invitation: any, index) => (
                    <tr key={invitation.adId}>
                      <td>{index + 1}</td>
                      <td>{invitation.brandName}</td>
                      <td>{invitation.productName}</td>
                      {invitation.canClaim ? (
                        <td>
                          {generateButtonDone ? (
                            <Button
                              variant="success"
                              onClick={() =>
                                handleGetRewardContract(invitation.adId)
                              }
                            >
                              Claim Reward
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              onClick={() =>
                                handleGenerateClaim(invitation.adId)
                              }
                            >
                              Generate Reward
                            </Button>
                          )}
                        </td>
                      ) : (
                        <td>Not Generated</td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No Data Found!
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
        </Container>
      )}
    </section>
  );
};

export default Claim;
