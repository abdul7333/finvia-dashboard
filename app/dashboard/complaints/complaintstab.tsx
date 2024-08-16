'use client'
import React, { useState } from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ClientcomplaintPage from './clientComplaint/page';
import AnnualComplaintPage from './AnnualComplaint/page';
import MonthlyComplaintPage from './MonthlyComplaint/page';

const ComplaintsTab = () => {
    const [mainTabValue, setMainTabValue] = useState(0);

    const handleMainTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setMainTabValue(newValue);
    };

    return (
        <div>
            <div>
                <div className='mainTabContainer'>
                    <Tabs value={mainTabValue} onChange={handleMainTabChange}>
                        {
                            <Tab
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.63314 9.05817C7.5498 9.04984 7.4498 9.04984 7.35814 9.05817C5.3748 8.9915 3.7998 7.3665 3.7998 5.3665C3.7998 3.32484 5.4498 1.6665 7.4998 1.6665C9.54147 1.6665 11.1998 3.32484 11.1998 5.3665C11.1915 7.3665 9.61647 8.9915 7.63314 9.05817Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.6747 3.3335C15.2914 3.3335 16.5914 4.64183 16.5914 6.25016C16.5914 7.82516 15.3414 9.1085 13.7831 9.16683C13.7164 9.1585 13.6414 9.1585 13.5664 9.16683" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.4666 12.1335C1.44993 13.4835 1.44993 15.6835 3.4666 17.0252C5.75827 18.5585 9.5166 18.5585 11.8083 17.0252C13.8249 15.6752 13.8249 13.4752 11.8083 12.1335C9.52494 10.6085 5.7666 10.6085 3.4666 12.1335Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.2832 16.6665C15.8832 16.5415 16.4499 16.2998 16.9165 15.9415C18.2165 14.9665 18.2165 13.3582 16.9165 12.3832C16.4582 12.0332 15.8999 11.7998 15.3082 11.6665" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                                iconPosition="start"
                                label="Client Complaint"
                                value={0}
                            />
                        }
                        {
                            <Tab
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 8.5V12" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.62501 8.24999C7.52247 8.24999 8.25002 7.52247 8.25002 6.62501C8.25002 5.72755 7.52247 5 6.62501 5C5.72755 5 5 5.72755 5 6.62501C5 7.52247 5.72755 8.24999 6.62501 8.24999Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.49999 15C7.32842 15 7.99998 14.3284 7.99998 13.5C7.99998 12.6716 7.32842 12 6.49999 12C5.67156 12 5 12.6716 5 13.5C5 14.3284 5.67156 15 6.49999 15Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.5 15C14.3284 15 15 14.3284 15 13.5C15 12.6716 14.3284 12 13.5 12C12.6716 12 12 12.6716 12 13.5C12 14.3284 12.6716 15 13.5 15Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.56641 8.5C6.79141 9.375 7.59139 10.025 8.53306 10.0166L10.2497 10.0083C11.5581 10 12.6747 10.8417 13.0831 12.0167" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.50033 18.3332H12.5003C16.667 18.3332 18.3337 16.6665 18.3337 12.4998V7.49984C18.3337 3.33317 16.667 1.6665 12.5003 1.6665H7.50033C3.33366 1.6665 1.66699 3.33317 1.66699 7.49984V12.4998C1.66699 16.6665 3.33366 18.3332 7.50033 18.3332Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                                iconPosition="start"
                                label="Monthly Complaint"
                                value={1}
                            />
                        }
                         {
                            <Tab
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 8.5V12" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.62501 8.24999C7.52247 8.24999 8.25002 7.52247 8.25002 6.62501C8.25002 5.72755 7.52247 5 6.62501 5C5.72755 5 5 5.72755 5 6.62501C5 7.52247 5.72755 8.24999 6.62501 8.24999Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.49999 15C7.32842 15 7.99998 14.3284 7.99998 13.5C7.99998 12.6716 7.32842 12 6.49999 12C5.67156 12 5 12.6716 5 13.5C5 14.3284 5.67156 15 6.49999 15Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.5 15C14.3284 15 15 14.3284 15 13.5C15 12.6716 14.3284 12 13.5 12C12.6716 12 12 12.6716 12 13.5C12 14.3284 12.6716 15 13.5 15Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.56641 8.5C6.79141 9.375 7.59139 10.025 8.53306 10.0166L10.2497 10.0083C11.5581 10 12.6747 10.8417 13.0831 12.0167" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.50033 18.3332H12.5003C16.667 18.3332 18.3337 16.6665 18.3337 12.4998V7.49984C18.3337 3.33317 16.667 1.6665 12.5003 1.6665H7.50033C3.33366 1.6665 1.66699 3.33317 1.66699 7.49984V12.4998C1.66699 16.6665 3.33366 18.3332 7.50033 18.3332Z" stroke="#384551" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                                iconPosition="start"
                                label="Annual Complaint"
                                value={2}
                            />
                        }

                    </Tabs>

                </div>
                <div className='tabsContentContainer'>
                    {mainTabValue === 0 && (
                        <ClientcomplaintPage/>
                    )}
                    {mainTabValue === 1 && ( 
                        <MonthlyComplaintPage/>
                    )}
                    {mainTabValue === 2 && (
                        <AnnualComplaintPage/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ComplaintsTab