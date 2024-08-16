"use client";

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { User } from "../userData";
import { Profile } from "../../profile/profileData";
import { IOptions, IProfile } from "@/utils/utils";


export type SortBy = {
    field: string;
    by: number;
};

interface IUserContext {
    pageSize: number;
    page: number;
    searchQuery: string | null;
    sortBy: SortBy;
    tableData: User[] | null;
    loading: boolean;
    createUser: (val: User) => void;
    updateUser: (val: User) => void;
    updatePassword: (val: User) => void;
    getUserById: (val: User) => void;
    setSize: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string | null>>;
    setPage: Dispatch<SetStateAction<number>>;
    setSortBy: Dispatch<SetStateAction<SortBy>>;
    roles: IOptions[] | null;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    totalUsers: number | null;
    myPermissions: Profile | null
}

const layoutContext: IUserContext = {
    pageSize: 5,
    page: 1,
    searchQuery: null,
    sortBy: {
        field: "createdAt",
        by: -1,
    },
    tableData: null,
    loading: true,
    createUser: () => { },
    updateUser: () => { },
    updatePassword: () => { },
    getUserById: () => { },
    setSize: (val) => { },
    setSearchQuery: (val) => { },
    setPage: (val) => { },
    setSortBy: (val) => { },
    roles: null,
    user: null,
    setUser: (val) => { },
    totalUsers: null,
    myPermissions: null
};

const UserContext = createContext(layoutContext);

type UserContextProps = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [pageSize, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>({
        field: "createdAt",
        by: -1,
    });
    const [tableData, setTableData] = useState<User[] | null>(null);
    const [loading, setloading] = useState<boolean>(true);
    const [roles, setRoles] = useState<IOptions[] | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [totalUsers, settotalUsers] = useState<number | null>(null);
    const [myPermissions, setMyPermissions] = useState<Profile | null>(null);

    const gettableData = async () => {
        const body = {
            pageSize,
            page,
            searchQuery,
            sortBy,
        };
        setloading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/getallUsers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",

                body: JSON.stringify(body),
            });
            const data = await res.json();
            settotalUsers(+data.totalUsers);
            console.log("data: ", data);
            setTableData(data.users as User[]);
            const rolesData = data.roles.map((el: IProfile) => {
                return { value: el._id, label: el.profileName };
            });
            setRoles(rolesData ?? null);
            setloading(false);
            setMyPermissions(data.permission);
        } catch (error) {
            setTableData(null);

            setloading(false);
            setMyPermissions(null);
        }
    };


    const createUser = async (val: User) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            const data = await response.json();
            console.log("user created:", data);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };
    const updateUser = async (updatedUser: User) => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/updateUser/${updatedUser._id}`;

            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to update user. HTTP status ${response.status}`
                );
            }

            const data = await response.json();
            console.log("user updated successfully:", data);

            // Ensure that you correctly handle the data and update the table
            const newData = tableData?.map((el) =>
                el._id === data.user._id ? { ...data.user, password: updatedUser.password } : el
            ) as User[];

            setTableData(newData);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const updatePassword = async (updatedUser: User) => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/updatePassword/${updatedUser._id}`;

            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to update user. HTTP status ${response.status}`
                );
            }

            const data = await response.json();
            console.log("user updated successfully:", data);

            // Ensure that you correctly handle the data and update the table
            const newData = tableData?.map((el) =>
                el._id === data.user._id ? { ...data.user, password: updatedUser.password } : el
            ) as User[];

            setTableData(newData);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };


    const getUserById = async () => { };

    useEffect(() => {
        gettableData();
    }, [pageSize, page, searchQuery, sortBy]);
    return (
        <UserContext.Provider
            value={{
                pageSize,
                page,
                searchQuery,
                sortBy,
                tableData,
                loading,
                createUser,
                updateUser,
                updatePassword,
                getUserById,
                setSize,
                setSearchQuery,
                setPage,
                setSortBy,
                roles,
                user,
                setUser,
                totalUsers,
                myPermissions
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
