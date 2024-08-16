import React from 'react'
import { CallsContextProvider } from './context/callsContext'
import CallsTable from './callsTable'

const CallsPage = () => {
    return (
        <div>
            <CallsContextProvider>
            <CallsTable/>
            </CallsContextProvider>
        </div>
    )
}

export default CallsPage