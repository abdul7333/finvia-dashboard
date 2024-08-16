import React from "react";
import LeadTable from "./LeadTable";
import { LeadContextProvider } from "./context/LeadContext";


const LeadsPage = () => {
    return (
        <div>
            <LeadContextProvider>
                <LeadTable />
            </LeadContextProvider>
        </div>
    );
};

export default LeadsPage;