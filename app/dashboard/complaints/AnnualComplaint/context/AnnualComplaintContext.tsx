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
import { AnnualComplaint } from "../AnnualComplaintData";
import { Profile } from "@/app/dashboard/profiletab/profile/profileData";


export type SortBy = {
  field: string;
  by: number;
};

interface IAnnualComplaintContext {
  pageSize: number;
  page: number;
  searchQuery: string | null;
  sortBy: SortBy;
  tableData: AnnualComplaint[] | null;
  loading: boolean;
  crateAnnualComplaint: (val: AnnualComplaint) => void;
  UpdateAnnualComplaint: (val: AnnualComplaint) => void;
  setSize: Dispatch<SetStateAction<number>>;
  setSearchQuery: Dispatch<SetStateAction<string | null>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  AnnualComplaints: AnnualComplaint | null;
  setAnnualComplaint: Dispatch<SetStateAction<AnnualComplaint | null>>;
  totalAnnualComplaint: number | null;
  myPermissions: Profile | null
}

const layoutContext: IAnnualComplaintContext = {
  pageSize: 5,
  page: 1,
  searchQuery: null,
  sortBy: {
    field: "createdAt",
    by: -1,
  },
  tableData: null,
  loading: true,
  crateAnnualComplaint: () => {},
  UpdateAnnualComplaint: () => {},
  setSize: (val) => {},
  setSearchQuery: (val) => {},
  setPage: (val) => {},
  setSortBy: (val) => {},
  AnnualComplaints: null,
  setAnnualComplaint: (val) => {},
  totalAnnualComplaint: null,
  myPermissions: null,
};

const AnnualComplaintsContext = createContext(layoutContext);

type AnnualComplaintsContextProps = {
  children: ReactNode;
};

export const AnnualComplaintsContextProvider = ({ children }: AnnualComplaintsContextProps) => {
  const [pageSize, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>({
    field: "createdAt",
    by: -1,
  });
  const [tableData, setTableData] = useState<AnnualComplaint[] | null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [AnnualComplaints, setAnnualComplaint] = useState<AnnualComplaint | null>(null);
  const [totalAnnualComplaint, settotalAnnualComplaint] = useState<number | null>(null);
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
      const res = await fetch(`${url}/AnnualComplaint/getAllAnnualComplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      settotalAnnualComplaint(+data.totalAnnualComplaint ?? null);
      console.log("data: ", data);
      setTableData(data.AnnualComplaints as AnnualComplaint[]);
      setloading(false);
      setMyPermissions(data.permission)
    } catch (error) {
      setTableData(null);
      setloading(false);
      setMyPermissions(null);
    }
  };

  const crateAnnualComplaint= async (val: AnnualComplaint) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/AnnualComplaint/createAnnualComplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(val),
      });

      if (!response.ok) {
        throw new Error("Failed to create AnnualComplaint");
      }

      const data = await response.json();
      console.log("AnnualComplaint created:", data);
    } catch (error) {
      console.error("Error creating AnnualComplaint:", error);
    }
  };

  const UpdateAnnualComplaint = async (updatedAnnualComplaint: AnnualComplaint) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${url}/AnnualComplaint/updateAnnualComplaints/${updatedAnnualComplaint._id}`;

      const response = await fetch(apiUrl,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedAnnualComplaint),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update AnnualComplaint. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("AnnualComplaint updated successfully:", data);

      const newData = tableData?.map((el) =>
        el._id == data._id ? data : el
      ) as AnnualComplaint[];
      setTableData(newData);
    } catch (error) {
      console.error("Error updating AnnualComplaint:", error);
    }
  };
 
  useEffect(() => {
    gettableData();
  }, [pageSize, page, searchQuery, sortBy]);
  return (
    <AnnualComplaintsContext.Provider
      value={{
        pageSize,
        page,
        searchQuery,
        sortBy,
        tableData,
        loading,
        crateAnnualComplaint,
        UpdateAnnualComplaint,
        setSize,
        setSearchQuery,
        setPage,
        setSortBy,
        AnnualComplaints,
        setAnnualComplaint,
        totalAnnualComplaint,
        myPermissions,
      }}
    >
      {children}
    </AnnualComplaintsContext.Provider>
  );
};

export const useAnnualComplaintContext = () => useContext(AnnualComplaintsContext);
