"use client";
import ConnectWalletAlert from "@/components/connectWalletAlert/connectWalletAlert";
import "./profile.scss";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import InfluencerOnboardForm from "@/components/influencerOnboardForm/influencerOnboardForm";
import SmallTitle from "@/components/smalltitle/smalltitle";
import { Container, Row } from "react-bootstrap";
import ProfilePage from "@/components/influencerProfile/profilePage";

const InfluencerProfile = () => {
  const { isConnected } = useWeb3ModalAccount();
  const data = {
    channelName: 'Your Channel Name',
    category: 'Your Category',
    email: 'example@example.com',
    channelLink: 'https://www.example.com',
    subscribers: 1000, // Update this with your actual number of subscribers
    description: 'Your channel description goes here.',
    contactNumber: '123-456-7890',
  };
  return (
    <section className="profile_page">
      <SmallTitle title="Profile" className="text-start" />
      {!isConnected ? (
        <ConnectWalletAlert />
      ) : (
        <Container>
          
          <Row>
            <InfluencerOnboardForm />
            <ProfilePage {...data} />
          </Row>
        </Container>
      )}
    </section>
  );
};

export default InfluencerProfile;
