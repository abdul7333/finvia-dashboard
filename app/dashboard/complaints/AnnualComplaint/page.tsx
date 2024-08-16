import React from 'react'
import { AnnualComplaintsContextProvider } from './context/AnnualComplaintContext'
import AnnualComplaintTable from './AnnualComplaintTable'


const AnnualComplaintPage = () => {
    return (
        <div>
        <AnnualComplaintsContextProvider>
        <AnnualComplaintTable/>
        </AnnualComplaintsContextProvider>
        </div>
    )
}

export default AnnualComplaintPage