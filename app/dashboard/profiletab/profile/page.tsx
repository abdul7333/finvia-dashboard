import React from 'react'
import { ProfileContextProvider } from "./context/ProfileContext";
import ProfileTable from './ProfileTable';

const ProfilePage = () => {
    return (
        <div>
            <ProfileContextProvider>
                <ProfileTable />
            </ProfileContextProvider>
        </div>
    )
}

export default ProfilePage