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

import { Lead } from "../leadData";
import { Profile } from "../../profiletab/profile/profileData";
// import { Profile } from "../../profile/makeData";


export type SortBy = {
    field: string;
    by: number;
};

interface ILeadContext {
    pageSize: number;
    page: number;
    searchQuery: string | null;
    sortBy: SortBy;
    tableData: Lead[] | null;
    loading: boolean;
    createLead: (val: Lead) => void;
    updateLead: (val: Lead) => void;
    getLeadById: (val: Lead) => void;
    setSize: Dispatch<SetStateAction<number>>;
    setSearchQuery: Dispatch<SetStateAction<string | null>>;
    setPage: Dispatch<SetStateAction<number>>;
    setSortBy: Dispatch<SetStateAction<SortBy>>;
    lead: Lead | null;
    setLead: Dispatch<SetStateAction<Lead | null>>;
    totalLeads: number | null;
    myPermissions: Profile | null
}

const layoutContext: ILeadContext = {
    pageSize: 5,
    page: 1,
    searchQuery: null,
    sortBy: {
        field: "createdAt",
        by: -1,
    },
    tableData: null,
    loading: true,
    createLead: () => { },
    updateLead: () => { },
    getLeadById: () => { },
    setSize: (val) => { },
    setSearchQuery: (val) => { },
    setPage: (val) => { },
    setSortBy: (val) => { },
    lead: null,
    setLead: (val) => { },
    totalLeads: null,
    myPermissions: null,
};

const LeadContext = createContext(layoutContext);

type LeadContextProps = {
    children: ReactNode;
};

export const LeadContextProvider = ({ children }: LeadContextProps) => {
    const [pageSize, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>({
        field: "createdAt",
        by: -1,
    });
    const [tableData, setTableData] = useState<Lead[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [lead, setLead] = useState<Lead | null>(null);
    const [totalLeads, setTotalLeads] = useState<number | null>(null);
    const [myPermissions, setMyPermissions] = useState<Profile | null>(null);


    const gettableData = async () => {
        const body = {
            pageSize,
            page,
            searchQuery,
            sortBy,
        };
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/getallLeads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",

                body: JSON.stringify(body),
            });
            const data = await res.json();
            setTotalLeads(isNaN(+data.totalLeads) ? null : +data.totalLeads);
            console.log("data: ", data);
            setTableData(data.leads as Lead[]);
            setLoading(false);
            setMyPermissions(data.permission)
        } catch (error) {
            setTableData(null);
            setLoading(false);
            setMyPermissions(null)
        }
    };


    const createLead = async (val: Lead) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/createLead`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(val),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to create lead");
            }

            const data = await response.json();
            console.log("lead created:", data);
        } catch (error) {
            console.error("Error creating lead:", error);
        }
    };
    const updateLead = async (updatedLead: Lead) => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/leads/updateLead/${updatedLead._id}`;

            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedLead),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to update lead. HTTP status ${response.status}`
                );
            }

            const data = await response.json();
            console.log("lead updated successfully:", data);

            const newData = tableData?.map((el) =>
                el._id == data._id ? data : el
            ) as Lead[];
            setTableData(newData);
        } catch (error) {
            console.error("Error updating lead:", error);
        }
    };
    const getLeadById = async () => { };

    useEffect(() => {
        gettableData();
    }, [pageSize, page, searchQuery, sortBy]);
    return (
        <LeadContext.Provider
            value={{
                pageSize,
                page,
                searchQuery,
                sortBy,
                tableData,
                loading,
                createLead,
                updateLead,
                getLeadById,
                setSize,
                setSearchQuery,
                setPage,
                setSortBy,
                lead,
                setLead,
                totalLeads,
                myPermissions,
            }}
        >
            {children}
        </LeadContext.Provider>
    );
};

export const useLeadContext = () => useContext(LeadContext);
