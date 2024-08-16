import React from "react";
import UserTable from "./UserTable";
import { UserContextProvider } from "./context/UserContext";


const UsersPage = () => {
    return (
        <div>
            <UserContextProvider>
                <UserTable />
            </UserContextProvider>
        </div>
    );
};

export default UsersPage;