"use client";
import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import styles from "./dashboard.module.css";
import Logout from "@mui/icons-material/Logout";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
interface DashboardLayoutProps {
    children: ReactNode;
}

const getIndexFromPathname = (pathname: string) => {
    switch (pathname) {
        case "/dashboard":
            return 0;
        case "/dashboard/leads":
            return 1;
        case "/dashboard/calls":
            return 2;
        case "/dashboard/profiletab":
            return 3;
        case "/dashboard/complaints":
            return 4;
        default:
            return 0;
    }
};

function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const [selectedIndex, setSelectedIndex] = useState(
        getIndexFromPathname(pathname)
    );

    useEffect(() => {
        setSelectedIndex(getIndexFromPathname(pathname));
    }, [pathname]);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter();
    const handleLogout = async () => {
        // const url = process.env.NEXT_PUBLIC_API_URL
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/logout`;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const body = await res.json();

        if (body.success) {
            const cookieURL = `/api/cookies`;
            const cookieURLOptions = {
                method: "DELETE",
                credentials: "include",
            } as RequestInit;
            const res = await fetch(cookieURL, cookieURLOptions);
            const cookieURLBody = await res.json();

            if (cookieURLBody.success) {
                router.push("/");
            }
        } else {
            console.log(body.message);
        }
    };

    return (
        <div className={styles.MainLayout}>
            <div className={styles.MainHeaderContainer}>
                <div className={styles.MainHeader}>
                    <div>
                        <Image
                            alt="Togile"
                            width={100}
                            height={20}
                            src="/dark_logo.svg"
                        ></Image>
                    </div>
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <Avatar sx={{ width: 25, height: 25, fontSize: 15 }}>V</Avatar>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            sx={{
                                transform: "translateX(-50px)",
                            }}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                            PaperProps={{
                                className: styles.customMenuPaper,
                            }}
                        >
                            <MenuItem className={styles.menuItems} onClick={handleClose}>
                                Profile
                            </MenuItem>
                            <MenuItem className={styles.menuItems} onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>

            <div className={styles.SettingSidebar}>
                <List>

                    <Link href={"/dashboard"} className={styles.linkDashboard}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={(event) => handleListItemClick(event, 0)}
                                selected={selectedIndex === 0}
                            >
                                <ListItemIcon>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M16.5 11.5L12.3 15.7L10.7 13.3L7.5 16.5"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14.5 11.5H16.5V13.5"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link href={"/dashboard/leads"} className={styles.linkDashboard}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={(event) => handleListItemClick(event, 1)}
                                selected={selectedIndex === 1}
                            >
                                <ListItemIcon>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.8479 10.6118C11.7621 10.6032 11.6591 10.6032 11.5647 10.6118C9.5223 10.5432 7.90039 8.86976 7.90039 6.8102C7.90039 4.70772 9.59953 3 11.7106 3C13.8131 3 15.5208 4.70772 15.5208 6.8102C15.5122 8.86976 13.8903 10.5432 11.8479 10.6118Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M7.55755 13.7784C5.48082 15.1686 5.48082 17.4341 7.55755 18.8158C9.91747 20.3948 13.7877 20.3948 16.1477 18.8158C18.2244 17.4255 18.2244 15.16 16.1477 13.7784C13.7963 12.208 9.92605 12.208 7.55755 13.7784Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Leads" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link href={"/dashboard/calls"} className={styles.linkDashboard}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={(event) => handleListItemClick(event, 2)}
                                selected={selectedIndex === 2}
                            >
                                <ListItemIcon>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12.0006 15.0836V13.2642C12.0006 12.2705 12.6079 11.9492 13.2151 11.5254C13.8079 11.1162 14.4006 10.5901 14.4006 9.62561C14.4006 8.28116 13.3307 7.19971 12.0006 7.19971C10.6704 7.19971 9.60059 8.28116 9.60059 9.62561"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.9937 17.2688H12.0068"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Calls" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link href={"/dashboard/profiletab"} className={styles.linkDashboard}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={(event) => handleListItemClick(event, 3)}
                                selected={selectedIndex === 3}
                            >
                                <ListItemIcon>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M16.9704 14.4402C18.3404 14.6702 19.8504 14.4302 20.9104 13.7202C22.3204 12.7802 22.3204 11.2402 20.9104 10.3002C19.8404 9.59016 18.3104 9.35016 16.9404 9.59016"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M5.97047 7.16C6.03047 7.15 6.10047 7.15 6.16047 7.16C7.54047 7.11 8.64047 5.98 8.64047 4.58C8.64047 3.15 7.49047 2 6.06047 2C4.63047 2 3.48047 3.16 3.48047 4.58C3.49047 5.98 4.59047 7.11 5.97047 7.16Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M7.00043 14.4402C5.63043 14.6702 4.12043 14.4302 3.06043 13.7202C1.65043 12.7802 1.65043 11.2402 3.06043 10.3002C4.13043 9.59016 5.66043 9.35016 7.03043 9.59016"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12.0001 14.6302C11.9401 14.6202 11.8701 14.6202 11.8101 14.6302C10.4301 14.5802 9.33008 13.4502 9.33008 12.0502C9.33008 10.6202 10.4801 9.47021 11.9101 9.47021C13.3401 9.47021 14.4901 10.6302 14.4901 12.0502C14.4801 13.4502 13.3801 14.5902 12.0001 14.6302Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9.08973 17.7804C7.67973 18.7204 7.67973 20.2603 9.08973 21.2003C10.6897 22.2703 13.3097 22.2703 14.9097 21.2003C16.3197 20.2603 16.3197 18.7204 14.9097 17.7804C13.3197 16.7204 10.6897 16.7204 9.08973 17.7804Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link href={"/dashboard/complaints"} className={styles.linkDashboard}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={(event) => handleListItemClick(event, 4)}
                                selected={selectedIndex === 4}
                            >
                                <ListItemIcon>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12.0006 15.0836V13.2642C12.0006 12.2705 12.6079 11.9492 13.2151 11.5254C13.8079 11.1162 14.4006 10.5901 14.4006 9.62561C14.4006 8.28116 13.3307 7.19971 12.0006 7.19971C10.6704 7.19971 9.60059 8.28116 9.60059 9.62561"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.9937 17.2688H12.0068"
                                            stroke="#BCBEC2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Complaints" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </div>

            <div className={styles.ContentContainer}>{children}</div>
        </div>
    );
}

export default DashboardLayout;
