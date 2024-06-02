import React from 'react'
import { Container } from 'react-bootstrap';
import Button from '@/components/button/button';
import { ROUTES } from '@/utils/constants';
import { useRouter } from "next/navigation";

const Banner = () => {
    const router = useRouter();
    return (
        <section id="home" className="banner_sec">
            <Container>
                <h1>WOMDO</h1>
                <h3>Are You?</h3>
                <Button onClick={() => router.push(ROUTES.INFLUENCER_PROFILE)} className="selection_btn">
                    Influencer
                </Button>
                <Button onClick={() => router.push(ROUTES.BRAND_PROFILE)} className="selection_btn">
                    Brand
                </Button>
            </Container>
        </section>
    )
}

export default Banner
