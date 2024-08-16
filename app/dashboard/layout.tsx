"use client";

import { ReactNode } from "react";
import styles from "./dashboard.module.css";
import DashboardLayout from "./dashboard-layout";
interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.MainContainer}>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </div>
    );
}

export default Layout;
