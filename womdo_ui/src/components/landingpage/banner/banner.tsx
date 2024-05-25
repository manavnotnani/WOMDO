import React from 'react'
import { Container } from 'react-bootstrap';
import Button from '@/components/button/button';

const Banner = () => {
    return (
        <section id="home" className="banner_sec">
            <Container>
                <h1>WOMDO</h1>
                <h3>Are You?</h3>
                <Button className="selection_btn">
                    Influencer
                </Button>
                <Button className="selection_btn">
                    Brand
                </Button>
            </Container>
        </section>
    )
}

export default Banner
