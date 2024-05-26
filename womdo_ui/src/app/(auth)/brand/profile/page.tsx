"use client";
import "./profile.scss";
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image';
import Button from '@/components/button/button';
import TG from "../../../../../public/images/tg.png";
import SmallTitle from "@/components/smalltitle/smalltitle";
import BrandOnboardForm from "@/components/brandOnboardForm/brandOnboardForm";

const Profile = () => {
    return (
        <section className='profile_page'>
            <Container>
                <SmallTitle title="Profile" className="text-start" />
                <Row>
                    <BrandOnboardForm/>
                </Row>
            </Container>
        </section>
    )
}

export default Profile
