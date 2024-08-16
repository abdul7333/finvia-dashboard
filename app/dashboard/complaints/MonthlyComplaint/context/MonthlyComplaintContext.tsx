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
import { MonthlyComplaint } from "../MonthlyComplaintData";
import { Profile } from "@/app/dashboard/profiletab/profile/profileData";


export type SortBy = {
  field: string;
  by: number;
};

interface IMonthlyComplaintContext {
  pageSize: number;
  page: number;
  searchQuery: string | null;
  sortBy: SortBy;
  tableData: MonthlyComplaint[] | null;
  loading: boolean;
  crateMonthlyComplaint: (val: MonthlyComplaint) => void;
  UpdateMonthlyComplaint: (val: MonthlyComplaint) => void;
  setSize: Dispatch<SetStateAction<number>>;
  setSearchQuery: Dispatch<SetStateAction<string | null>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  MonthlyComplaints: MonthlyComplaint | null;
  setMonthlyComplaint: Dispatch<SetStateAction<MonthlyComplaint | null>>;
  totalmonthlyComplaint: number | null;
  myPermissions: Profile | null
}

const layoutContext: IMonthlyComplaintContext = {
  pageSize: 5,
  page: 1,
  searchQuery: null,
  sortBy: {
    field: "createdAt",
    by: -1,
  },
  tableData: null,
  loading: true,
  crateMonthlyComplaint: () => {},
  UpdateMonthlyComplaint: () => {},
  setSize: (val) => {},
  setSearchQuery: (val) => {},
  setPage: (val) => {},
  setSortBy: (val) => {},
  MonthlyComplaints: null,
  setMonthlyComplaint: (val) => {},
  totalmonthlyComplaint: null,
  myPermissions: null,
};

const MonthlyComplaintsContext = createContext(layoutContext);

type MonthlyComplaintsContextProps = {
  children: ReactNode;
};

export const MonthlyComplaintContextProvider = ({ children }: MonthlyComplaintsContextProps) => {
  const [pageSize, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>({
    field: "createdAt",
    by: -1,
  });
  const [tableData, setTableData] = useState<MonthlyComplaint[] | null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [MonthlyComplaints, setMonthlyComplaint] = useState<MonthlyComplaint | null>(null);
  const [totalmonthlyComplaint, settotalmonthlyComplaint] = useState<number | null>(null);
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
      const res = await fetch(`${url}/MonthlyComplaint/getAllmonthlyComplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      settotalmonthlyComplaint(+data.totalmonthlyComplaint ?? null);
      console.log("data: ", data);
      setTableData(data.monthlyComplaints as MonthlyComplaint[]);
      setloading(false);
      setMyPermissions(data.permission)
    } catch (error) {
      setTableData(null);
      setloading(false);
      setMyPermissions(null)
    }
  };

  const crateMonthlyComplaint= async (val: MonthlyComplaint) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/MonthlyComplaint/createmonthlyComplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(val),
      });

      if (!response.ok) {
        throw new Error("Failed to create MonthlyComplaint");
      }

      const data = await response.json();
      console.log("MonthlyComplaint created:", data);
    } catch (error) {
      console.error("Error creating MonthlyComplaint:", error);
    }
  };

  const UpdateMonthlyComplaint = async (updatedMonthlyComplaint: MonthlyComplaint) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${url}/MonthlyComplaint/updatemonthlyComplaint/${updatedMonthlyComplaint._id}`;

      const response = await fetch(apiUrl,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedMonthlyComplaint),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update MonthlyComplaint. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("MonthlyComplaint updated successfully:", data);

      const newData = tableData?.map((el) =>
        el._id == data._id ? data : el
      ) as MonthlyComplaint[];
      setTableData(newData);
    } catch (error) {
      console.error("Error updating MonthlyComplaint:", error);
    }
  };
 
  useEffect(() => {
    gettableData();
  }, [pageSize, page, searchQuery, sortBy]);
  return (
    <MonthlyComplaintsContext.Provider
      value={{
        pageSize,
        page,
        searchQuery,
        sortBy,
        tableData,
        loading,
        crateMonthlyComplaint,
        UpdateMonthlyComplaint,
        setSize,
        setSearchQuery,
        setPage,
        setSortBy,
        MonthlyComplaints,
        setMonthlyComplaint,
        totalmonthlyComplaint,
        myPermissions,
      }}
    >
      {children}
    </MonthlyComplaintsContext.Provider>
  );
};

export const useMonthlyComplaintsContext = () => useContext(MonthlyComplaintsContext);
