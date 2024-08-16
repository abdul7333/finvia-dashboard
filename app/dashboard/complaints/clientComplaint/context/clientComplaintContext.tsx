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
import { ClientComplaint } from "../clientComplaintData";
import { Profile } from "@/app/dashboard/profiletab/profile/profileData";


export type SortBy = {
  field: string;
  by: number;
};

interface IClientComplaintContext {
  pageSize: number;
  page: number;
  searchQuery: string | null;
  sortBy: SortBy;
  tableData: ClientComplaint[] | null;
  loading: boolean;
  crateClientComplaint: (val: ClientComplaint) => void;
  UpdateClientComplaint: (val: ClientComplaint) => void;
  setSize: Dispatch<SetStateAction<number>>;
  setSearchQuery: Dispatch<SetStateAction<string | null>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  clientComplaints: ClientComplaint | null;
  setclientComplaints: Dispatch<SetStateAction<ClientComplaint | null>>;
  totalClientComplaint: number | null;
  myPermissions: Profile | null
}

const layoutContext: IClientComplaintContext = {
  pageSize: 5,
  page: 1,
  searchQuery: null,
  sortBy: {
    field: "createdAt",
    by: -1,
  },
  tableData: null,
  loading: true,
  crateClientComplaint: () => {},
  UpdateClientComplaint: () => {},
  setSize: (val) => {},
  setSearchQuery: (val) => {},
  setPage: (val) => {},
  setSortBy: (val) => {},
  clientComplaints: null,
  setclientComplaints: (val) => {},
  totalClientComplaint: null,
  myPermissions: null,
};

const ClientComplaintsContext = createContext(layoutContext);

type ClientComplaintsContextProps = {
  children: ReactNode;
};

export const ClientComplaintsContextProvider = ({ children }: ClientComplaintsContextProps) => {
  const [pageSize, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>({
    field: "createdAt",
    by: -1,
  });
  const [tableData, setTableData] = useState<ClientComplaint[] | null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [clientComplaints, setclientComplaints] = useState<ClientComplaint | null>(null);
  const [totalClientComplaint, settotalClientComplaint] = useState<number | null>(null);
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
      const url = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${url}/ClientComplaint/getAllClientComplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      settotalClientComplaint(+data.totalClientComplaint ?? null);
      console.log("data: ", data);
      setTableData(data.ClientComplaints as ClientComplaint[]);
      setloading(false);
      setMyPermissions(data.permission)
    } catch (error) {
      setTableData(null);
      setloading(false);
      setMyPermissions(null)
    }
  };

  const crateClientComplaint= async (val: ClientComplaint) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/ClientComplaint/createClientComplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(val),
      });

      if (!response.ok) {
        throw new Error("Failed to create ClientComplaint");
      }

      const data = await response.json();
      console.log("ClientComplaint created:", data);
    } catch (error) {
      console.error("Error creating ClientComplaint:", error);
    }
  };

  const UpdateClientComplaint = async (updatedClientComplaint: ClientComplaint) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${url}/ClientComplaint/updateClientComplaint/${updatedClientComplaint._id}`;

      const response = await fetch(apiUrl,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedClientComplaint),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update ClientComplaint. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("ClientComplaint updated successfully:", data);

      const newData = tableData?.map((el) =>
        el._id == data._id ? data : el
      ) as ClientComplaint[];
      setTableData(newData);
    } catch (error) {
      console.error("Error updating ClientComplaint:", error);
    }
  };
 
  useEffect(() => {
    gettableData();
  }, [pageSize, page, searchQuery, sortBy]);
  return (
    <ClientComplaintsContext.Provider
      value={{
        pageSize,
        page,
        searchQuery,
        sortBy,
        tableData,
        loading,
        crateClientComplaint,
        UpdateClientComplaint,
        setSize,
        setSearchQuery,
        setPage,
        setSortBy,
        clientComplaints,
        setclientComplaints,
        totalClientComplaint,
        myPermissions,
      }}
    >
      {children}
    </ClientComplaintsContext.Provider>
  );
};

export const useclientComplaintsContext = () => useContext(ClientComplaintsContext);
