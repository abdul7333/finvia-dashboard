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
import { Calls } from "../callsData";
import { Profile } from "../../profiletab/profile/profileData";



export type SortBy = {
  field: string;
  by: number;
};

interface ICallsContext {
  pageSize: number;
  page: number;
  searchQuery: string | null;
  sortBy: SortBy;
  tableData: Calls[] | null;
  loading: boolean;
  crateCalls: (val: Calls) => void;
  UpdateCalls: (val: Calls) => void;
  setSize: Dispatch<SetStateAction<number>>;
  setSearchQuery: Dispatch<SetStateAction<string | null>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  Calls: Calls | null;
  setCalls: Dispatch<SetStateAction<Calls | null>>;
  totalCalls: number | null;
  myPermissions: Profile | null
}

const layoutContext: ICallsContext = {
  pageSize: 5,
  page: 1,
  searchQuery: null,
  sortBy: {
    field: "createdAt",
    by: -1,
  },
  tableData: null,
  loading: true,
  crateCalls: () => {},
  UpdateCalls: () => {},
  setSize: (val) => {},
  setSearchQuery: (val) => {},
  setPage: (val) => {},
  setSortBy: (val) => {},
  Calls: null,
  setCalls: (val) => {},
  totalCalls: null,
  myPermissions: null,
};

const CallsContext = createContext(layoutContext);

type CallsContextProps = {
  children: ReactNode;
};

export const CallsContextProvider = ({ children }: CallsContextProps) => {
  const [pageSize, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>({
    field: "createdAt",
    by: -1,
  });
  const [tableData, setTableData] = useState<Calls[] | null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [Calls, setCalls] = useState<Calls | null>(null);
  const [totalCalls, settotalCalls] = useState<number | null>(null);
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
      const res = await fetch(`${url}/calls/getAllCalls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      settotalCalls(+data.totalCalls ?? null);
      console.log("data: ", data);
      setTableData(data.calls as Calls[]);
      setloading(false);
      setMyPermissions(data.permission)
    } catch (error) {
      setTableData(null);
      setloading(false);
      setMyPermissions(null);
    }
  };

  const crateCalls= async (val: Calls) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/calls/createCalls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(val),
      });

      if (!response.ok) {
        throw new Error("Failed to create Calls");
      }

      const data = await response.json();
      console.log("Calls created:", data);
    } catch (error) {
      console.error("Error creating Calls:", error);
    }
  };

  const UpdateCalls = async (updatedCalls: Calls) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${url}/calls/updateCalls/${updatedCalls._id}`;

      const response = await fetch(apiUrl,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedCalls),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update Calls. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Calls updated successfully:", data);

      const newData = tableData?.map((el) =>
        el._id == data._id ? data : el
      ) as Calls[];
      setTableData(newData);
    } catch (error) {
      console.error("Error updating Calls:", error);
    }
  };
 
  useEffect(() => {
    gettableData();
  }, [pageSize, page, searchQuery, sortBy]);
  return (
    <CallsContext.Provider
      value={{
        pageSize,
        page,
        searchQuery,
        sortBy,
        tableData,
        loading,
        crateCalls,
        UpdateCalls,
        setSize,
        setSearchQuery,
        setPage,
        setSortBy,
        Calls,
        setCalls,
        totalCalls,
        myPermissions
      }}
    >
      {children}
    </CallsContext.Provider>
  );
};

export const useCallsContext = () => useContext(CallsContext);
