"use client";
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { DashboardIcon, LockIcon, SettingIcon, UnLockIcon, UsersIcon } from '../../../public/icons/icons';

type TProps = {
    handleClick?: () => void,
    active?: boolean,
}

const Sidebar = (props: TProps) => {
    const pathname = usePathname();
    const [locked, setLocked] = useState(true);
    const path = pathname.split('/');
    const influencerNavs = [
        {
            route: ROUTES.INFLUENCER_PROFILE,
            label: "Profile",
            icon: SettingIcon,
        },
        {
            route: ROUTES.INFLUENCER_INVITATIONS,
            label: "Invitations",
            icon: SettingIcon,
        },
    ]
    const brandNavs = [
        {
            route: ROUTES.BRAND_PROFILE,
            label: "Profile",
            icon: SettingIcon,
        },
        {
            route: ROUTES.INFLUENCERS_LISTING,
            label: "Influencers",
            icon: UsersIcon,
        },
    ]
    const navItems = path.includes('brand') ? brandNavs : influencerNavs;
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
                        navItems.map(item => {
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
