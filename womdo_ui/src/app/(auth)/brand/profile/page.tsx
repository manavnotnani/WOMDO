"use client";
import "./profile.scss";
import { Container, Row } from 'react-bootstrap'
import SmallTitle from "@/components/smalltitle/smalltitle";
import BrandOnboardForm from "@/components/brandOnboardForm/brandOnboardForm";
import ProfilePage from "@/components/brandProfile/profilePage";

const Profile = () => {
    const data = {
        brandName: 'Your Brand Name',
        category: 'Your Category',
        email: 'example@example.com',
        website: 'https://www.example.com',
        description: 'Your brand description goes here.',
        contactNumber: '123-456-7890',
      };
    return (
        <section className='profile_page'>
            <Container>
                <SmallTitle title="Profile" className="text-start" />
                <Row>
                    <BrandOnboardForm/>
                    <ProfilePage {...data} />
                </Row>
            </Container>
        </section>
    )
}

export default Profile
