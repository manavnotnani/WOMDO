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
  const [invitations, setInvitations] = useState([]);
  const router = useRouter();
  const { walletProvider }: any = useWeb3ModalProvider();

  let source = `
  const { ethers } = await import("npm:ethers@6.12.1");
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  
  const adId = args[0];
  
  const apiResponse = await Functions.makeHttpRequest({
    url: 'http://localhost:3000/api/influencer/claim/' + adId,
  });
  
  const { data } = apiResponse;
  const encoded = abiCoder.encode(['uint256[]'], [uint256Array]);
  return ethers.getBytes(encoded);
`;

  const handleGetInvitations = async () => {
    try {
      const response = await fetch(
        API_URL + API_ROUTES.GET_INFLUENCER_INVITATIONS + address,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.status) {
        setInvitations(data.data);
      }
    } catch (error) {
      console.error("Error fetching invitations:", error);
    }
  };

  const handleGenerateClaim = async (id: string) => {
    const payload: any = {
      source: source,
      secretsLocation: Location.Inline,
      encryptedSecretsReference: "0x",
      args: [],
      byteArgs: [],
      subscriptionId: 278,
      callbackGasLimit: 100_000,
    };
  };

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
                  <th>Brand Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitations && invitations.length ? (
                  invitations.map((invitation: any, index) => (
                    <tr key={invitation.adId}>
                      <td>{index + 1}</td>
                      <td>{invitation.brandName}</td>
                      <td>{invitation.productName}</td>
                      <td>{invitation.brandAddress}</td>
                      <td>
                        {invitation.acceptedStatus ? "Accepted" : "Pending"}
                      </td>
                      <td>
                        {invitation.acceptedStatus ? (
                          "---"
                        ) : (
                          <>
                            <Button
                              variant="success"
                              onClick={() => handleAccept(invitation.adId)}
                              disabled={invitation.acceptedStatus}
                            >
                              Generate Reward
                            </Button>{" "}
                          </>
                        )}
                      </td>
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
