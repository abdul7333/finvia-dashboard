import React from "react";
import { ClientComplaintsContextProvider } from "./context/clientComplaintContext";
import ClientComplaintTable from "./clientComplaintTable";

const ClientcomplaintPage = () => {
  return (
    <div>
      <ClientComplaintsContextProvider>
        <ClientComplaintTable/>
      </ClientComplaintsContextProvider>
    </div>
  );
};

export default ClientcomplaintPage;
