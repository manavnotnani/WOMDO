"use client";
import Button from '@/components/button/button';
import Sidebar from '@/components/sidebar/sidebar';
import { ROUTES } from '@/utils/constants';
import { LazyMotion, domMax } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { Container } from 'react-bootstrap';
import "./authlayout.scss";

type TProps = {
    children: ReactNode,
}

const layout = (props: TProps) => {
    const [active, setActive] = useState(false);
    const handleClick = () => document.body.clientWidth < 991 && setActive(!active);
    return (
        <main className='auth_layout'>
            <LazyMotion strict features={domMax}>
                <Sidebar active={active} handleClick={handleClick} />
                <div className="auth_in">
                    <header className="auth_header">
                        <Container>
                            <div className="auth_header_in">
                                <Link
                                    href={ROUTES.HOME}
                                    className="d-lg-none auth_header_logo"
                                >
                                    WOMDO
                                </Link>
                                <Button className='ms-auto connect_btn'>Connect Wallet</Button>
                                <button
                                    className={`header_toggle d-lg-none ${active ? "active" : ""}`}
                                    onClick={handleClick}
                                >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </Container>
                    </header>
                    {props.children}
                </div>
            </LazyMotion>
        </main>
    )
}

export default layout
