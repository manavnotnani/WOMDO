"use client";
import "./influencers.scss";
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image';
import Button from '@/components/button/button';
import TG from "../../../../../public/images/tg.png";
import SmallTitle from "@/components/smalltitle/smalltitle";

const Influencers = () => {
    return (
        <section className='influencers_page'>
            <Container>
                <SmallTitle title="Influencers" className="text-start" />
                <Row>
                    <Col
                        xl={4}
                        sm={6}
                    >
                        <div className="influencers_card">
                            <div className="influencers_card_img">
                                <Image
                                    src={TG}
                                    alt=""
                                />
                            </div>
                            <h3>Technical Guruji</h3>
                            <div className="influencers_progress">
                                <div className="influencers_progress_details">
                                    <h4>Subscribers</h4>
                                    <p>{'25.6M'}</p>
                                </div>
                                <div className="influencers_progress_details">
                                    <h4>Category</h4>
                                    <p>{'Technology'}</p>
                                </div>
                            </div>
                            <Button fluid className='custom_btn'>Check stats</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Influencers
