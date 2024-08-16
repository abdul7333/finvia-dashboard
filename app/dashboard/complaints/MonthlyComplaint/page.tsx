import React from "react";
import { MonthlyComplaintContextProvider } from "./context/MonthlyComplaintContext";
import MonthlyComplaintTable from "./MonthlyComplaintTable";

const MonthlyComplaintPage = () => {
  return (
    <div>
      <MonthlyComplaintContextProvider>
        <MonthlyComplaintTable />
      </MonthlyComplaintContextProvider>
    </div>
  );
};

export default MonthlyComplaintPage;
