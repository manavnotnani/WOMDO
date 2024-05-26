"use client";
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { DashboardIcon, LockIcon, UnLockIcon } from '../../../public/icons/icons';

type TProps = {
    handleClick?: () => void,
    active?: boolean,
}

const Sidebar = (props: TProps) => {
    const pathname = usePathname();
    const [locked, setLocked] = useState(true);
    const path = pathname.split('/');
    const navs = [
        {
            route: path.includes('brand') ? ROUTES.BRAND_DASHBOARD : ROUTES.INFLUENCER_DASHBOARD,
            label: "Dashboard",
            icon: DashboardIcon,
        },
    ]
    return (
        <>
            <div className={`header_backdrop ${props.active ? "active" : ""}`} onClick={props.handleClick}></div>
            <aside className={`sidebar ${locked ? "locked" : ""} ${props.active ? "active" : ""}`}>
                <Link
                    className="sidebar_logo"
                    href={ROUTES.HOME}
                >
                    <span>
                        WOMDO
                    </span>
                    <span>
                        W
                    </span>
                </Link>
                <ul>
                    {
                        navs.map(item => {
                            return (
                                <li key={item.route}>
                                    <Link
                                        className={pathname === item.route ? "active" : ""}
                                        href={item.route}
                                        onClick={props.handleClick}
                                    >
                                        <item.icon />
                                        <span>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="sidebar_footer">
                    <button className={`${locked ? "active" : ""}`} onClick={() => setLocked(!locked)}>
                        {
                            locked ?
                                <LockIcon />
                                :
                                <UnLockIcon />
                        }
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
