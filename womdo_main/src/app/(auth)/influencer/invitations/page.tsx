"use client";
import React, { useState, useEffect } from 'react';
import ConnectWalletAlert from "@/components/connectWalletAlert/connectWalletAlert";
import "./invitations.scss";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import SmallTitle from "@/components/smalltitle/smalltitle";
import { Button, Container, Row, Table } from "react-bootstrap";

const Invitations = () => {
  const { isConnected } = useWeb3ModalAccount();
  const [invitations, setInvitations]: any = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/influencer/getInvitations/0xE380a93Db38f46866fdf4Ca86005cb51CC259771", {
          method: "GET",
          headers: {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
          }
        });

        const data = await response.json();
        if (data.status) {
          setInvitations(data.data);
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
      }
    };

    if (isConnected) {
      fetchData();
    }
  }, [isConnected]);

  const handleAccept = async (id: string) => {
    // Implement accept functionality
  };

  const handleDecline = async (id: string) => {
    // Implement decline functionality
  };

  return (
    <section className="profile_page">
      <SmallTitle title="Invitations" className="text-start" />
      {!isConnected ? (
        <ConnectWalletAlert />
      ) : (
        <Container>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invitee Name</th>
                  <th>Influencer Address</th>
                  <th>Status</th>
                  <th>Subscribers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitations.map((invitation: any, index: any) => (
                  <tr key={invitation._id}>
                    <td>{index + 1}</td>
                    <td>{invitation.influencer}</td>
                    <td>{invitation.influencerAddress}</td>
                    <td>{invitation.requestSentStatus ? "Pending" : "Not Sent"}</td>
                    <td>{invitation.subscribers}</td>
                    <td>
                      <Button variant="success" onClick={() => handleAccept(invitation._id)}>
                        Accept
                      </Button>{" "}
                      <Button variant="danger" onClick={() => handleDecline(invitation._id)}>
                        Decline
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      )}
    </section>
  );
};

export default Invitations;
