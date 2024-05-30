"use client";
import { useState, useEffect } from "react";
import ConnectWalletAlert from "@/components/connectWalletAlert/connectWalletAlert";
import InfluencerOnboardForm from "@/components/influencerOnboardForm/influencerOnboardForm";
import SmallTitle from "@/components/smalltitle/smalltitle";
import { Container, Row } from "react-bootstrap";
import ProfilePage from "@/components/influencerProfile/profilePage";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import "./profile.scss";
import { API_ROUTES, API_URL } from "@/utils/constants";

const InfluencerProfile = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const [userExists, setUserExists] = useState(false);

  const data = {
    channelName: 'Your Channel Name',
    category: 'Your Category',
    email: 'example@example.com',
    channelLink: 'https://www.example.com',
    subscribers: 1000,
    description: 'Your channel description goes here.',
    contactNumber: '123-456-7890',
  };

  useEffect(() => {
    if (isConnected) {
      handleCheckUserIsValid();
    }
  }, [isConnected]);

  const handleCheckUserIsValid = async () => {    
    try {
      let response = await fetch(API_URL + API_ROUTES.GET_INFLUENCER + '/' + address, { 
        method: "GET",
      });
      
      if (response.ok) {
        let data = await response.json();
        setUserExists(!!data);
      } else {
        setUserExists(false);
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      setUserExists(false);
    }
  };

  return (
    <section className="profile_page">
      <SmallTitle title="Profile" className="text-start" />
      {!isConnected ? (
        <ConnectWalletAlert />
      ) : (
        <Container>
          <Row>
            {!userExists ? (
              <InfluencerOnboardForm />
            ) : (
              <ProfilePage {...data} />
            )}
          </Row>
        </Container>
      )}
    </section>
  );
};

export default InfluencerProfile;
