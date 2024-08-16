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
import { Profile } from "../profileData";

export type SortBy = {
    field: string;
    by: number;
};

interface IProfileContext {
    pageSize: number;
    page: number;
    searchQuery: string | null;
    sortBy: SortBy;
    tableData: Profile[] | null;
    loading: boolean;
    crateProfile: (val: Profile) => void;
    UpdateProfile: (val: Profile) => void;
    getProfileById: (val: Profile) => void;
    setSize: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string | null>>;
    setPage: Dispatch<SetStateAction<number>>;
    setSortBy: Dispatch<SetStateAction<SortBy>>;
    profile: Profile | null;
    setProfile: Dispatch<SetStateAction<Profile | null>>;
    totalProfiles: number | null;
    myPermissions: Profile | null;
}

const layoutContext: IProfileContext = {
    pageSize: 5,
    page: 1,
    searchQuery: null,
    sortBy: {
        field: "createdAt",
        by: -1,
    },
    tableData: null,
    loading: true,
    crateProfile: () => { },
    UpdateProfile: () => { },
    getProfileById: () => { },
    setSize: (val) => { },
    setSearchQuery: (val) => { },
    setPage: (val) => { },
    setSortBy: (val) => { },
    profile: null,
    setProfile: (val) => { },
    totalProfiles: null,
    myPermissions: null,
};

const ProfileContext = createContext(layoutContext);

type ProfileContextProps = {
    children: ReactNode;
};

export const ProfileContextProvider = ({ children }: ProfileContextProps) => {
    const [pageSize, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>({
        field: "createdAt",
        by: -1,
    });
    const [tableData, setTableData] = useState<Profile[] | null>(null);
    const [loading, setloading] = useState<boolean>(true);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [totalProfiles, setTotalprofile] = useState<number | null>(null);
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
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/profile/getAllProfiles`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",

                    body: JSON.stringify(body),
                }
            );
            const data = await res.json();
            console.log("data: ", data);
            setTotalprofile(isNaN(+data.totalProfiles) ? null : +data.totalProfiles);
            setTableData(data.profiles as Profile[]);
            setloading(false);
            setMyPermissions(data.permission);
        } catch (error) {
            setTableData(null);
            setloading(false);
            setMyPermissions(null);
        }
    };
    const crateProfile = async (val: Profile) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/createProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to create Profile");
            }
            const data = await response.json();
            console.log("Profile created:", data);
        } catch (error) {
            console.error("Error creating Profile:", error);
        }
    };
    const UpdateProfile = async (updatedProfile: Profile) => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/profile/updateProfile/${updatedProfile._id}`;

            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to update profile. HTTP status ${response.status}`
                );
            }

            const data = await response.json();
            console.log("Profile updated successfully:", data);

            const newData = tableData?.map((el) =>
                el._id == data._id ? data : el
            ) as Profile[];
            setTableData(newData);
        } catch (error) {
            console.error("Error updating Profile:", error);
        }
    };
    const getProfileById = async () => { };

    useEffect(() => {
        gettableData();
        //getRoles();
    }, [pageSize, page, searchQuery, sortBy]);
    // useEffect(() => {
    // getRoles();
    // }, []);
    return (
        <ProfileContext.Provider
            value={{
                pageSize,
                page,
                searchQuery,
                sortBy,
                tableData,
                loading,
                crateProfile,
                UpdateProfile,
                getProfileById,
                setSize,
                setSearchQuery,
                setPage,
                setSortBy,
                profile,
                setProfile,
                totalProfiles,
                myPermissions,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = () => useContext(ProfileContext);
