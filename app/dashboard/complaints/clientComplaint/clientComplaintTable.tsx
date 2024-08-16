"use client";
import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";;
import { timestampConversion } from "@/utils/utils";
import { Input } from "reactstrap";
import { Box, Button, ClickAwayListener, TablePagination } from "@mui/material";
import { useDebounce } from "@/utils/useDebounceHook";
import styles from '../../dashboard.module.css'
import Image from "next/image";
import { useClientComplaintsContext } from "./context/clientComplaintContext";
import { ClientComplaint } from "./clientComplaintData";
import AddClientComplaint from "./context/AddclientComplaint";
import EditClientComplaints from "./context/EditclientComplaint";


const ClientComplaintTable = () => {
    const {
        page,
        pageSize,
        searchQuery,
        sortBy,
        tableData,
        loading,
        setSearchQuery,
        crateClientComplaint,
        clientComplaints,
        setclientComplaints,
        setPage,
        setSize,
        UpdateClientComplaint,
        totalClientComplaint,
        myPermissions,
    } = useClientComplaintsContext();


    const [isSearch, setIsSearch] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery || "");
    const debouncedSearchTerm = useDebounce(inputValue, 800);
    const [isAdd, setisAdd] = useState<boolean>(false);
    const [isEdit, setisEdit] = useState<boolean>(false);

    useEffect(() => {
        setSearchQuery(debouncedSearchTerm);
    }, [debouncedSearchTerm, setSearchQuery]);

    const handleDebounce = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleEditSubmitForm = (payload: ClientComplaint) => {
        UpdateClientComplaint(payload);
        setisEdit(false);
    };
    const handleAddSubmitForm = (payload: ClientComplaint) => {
        crateClientComplaint(payload);
        setisAdd(false);
    };

    const handlePageSizeChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSize(Number(event.target.value));
        setPage(1);
    };
    return (
        <div>
            <div className={styles.TableFlexTop}>
                <div></div>
                <div className={styles.TableButtonContainer}>
                    <div>
                        {isSearch && (
                            <>
                                <ClickAwayListener onClickAway={() => setIsSearch(false)}>
                                    <Box sx={{ position: "relative" }}>
                                        <Input
                                            className={styles.SearchInput}
                                            placeholder="Search"
                                            type="search"
                                            value={inputValue}
                                            onChange={handleDebounce}
                                        />
                                    </Box>
                                </ClickAwayListener>
                            </>
                        )}
                    </div>
                    <div>
                        <div
                            className={styles.TableSearchIcon}
                            onClick={() => setIsSearch(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="25px" height="25px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" /></svg>
                        </div>
                    </div>
                    <div>
                        {
                            myPermissions?.permission.Complaint.create ?(<Button
                                variant="contained"
                                className={styles.BlueButton}
                                onClick={() => {
                                   setisAdd(true);
                                }}
                            >
                                Add ClientComplaint
                            </Button>):(<Button
                                variant="contained"
                                className={styles.BlueButton}
                               disabled
                            >
                                Add ClientComplaint
                            </Button>)
                        }
                        
                    </div>
                </div>
            </div>
            <TableContainer component={Paper}>
                {!loading ? (
                    <>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ReceivedFrom</TableCell>
                                    <TableCell align="left">PendingAtTheEndOfLastMonth</TableCell>
                                    <TableCell align="left">Received</TableCell>
                                    <TableCell align="left">Resolved</TableCell>
                                    <TableCell align="left">TotalPending</TableCell>
                                    <TableCell align="left">PendingMoreThanThreeMonths</TableCell>
                                    <TableCell align="left">AverageResolutionTime</TableCell>
                                    <TableCell align="left">Created At</TableCell>
                                    <TableCell align="left">Updated At</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <>
                                    {tableData && tableData.length > 0 ? (
                                        tableData.map((row: ClientComplaint) => (
                                            <TableRow
                                                key={row._id}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell align="left">{row.ReceivedFrom}</TableCell>
                                                <TableCell align="left">{row.PendingAtTheEndOfLastMonth}</TableCell>
                                                <TableCell align="left">{row.Received}</TableCell>
                                                <TableCell align="left">{row.Resolved}</TableCell>
                                                <TableCell align="left">{row.TotalPending}</TableCell>
                                                <TableCell align="left">{row.PendingMoreThanThreeMonths}</TableCell>
                                                <TableCell align="left">{row.AverageResolutionTime}</TableCell>
                                                <TableCell align="left">
                                                    {row.createdAt && timestampConversion(row.createdAt)}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.updatedAt && timestampConversion(row.updatedAt)}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {myPermissions?.permission.Complaint.edit ?(<Button
                                                    onClick={() => {
                                                        setclientComplaints(row); 
                                                        setisEdit(true);
                                                    }}
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="25px" height="25px"><path d="M57.828,22.266c1.562,1.562,1.562,4.095,0,5.657L32.108,53.644L16.52,58.857c-2.088,0.698-4.076-1.29-3.378-3.378	l5.213-15.587l25.721-25.721c1.562-1.562,4.095-1.562,5.657,0L57.828,22.266z M42.905,25.243L24.471,43.676l-1.703,5.092	l0.463,0.463l5.092-1.703l18.434-18.434L42.905,25.243z"/></svg>
                                                </Button>):(<Button
                                                   disabled
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="25px" height="25px"><path d="M57.828,22.266c1.562,1.562,1.562,4.095,0,5.657L32.108,53.644L16.52,58.857c-2.088,0.698-4.076-1.29-3.378-3.378	l5.213-15.587l25.721-25.721c1.562-1.562,4.095-1.562,5.657,0L57.828,22.266z M42.905,25.243L24.471,43.676l-1.703,5.092	l0.463,0.463l5.092-1.703l18.434-18.434L42.905,25.243z"/></svg>
                                                </Button>)}
                                                
                                               </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <div> No data Found</div>
                                    )}
                                </>
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20, 25, 50]}
                            component="div"
                            count={totalClientComplaint || 0}
                            rowsPerPage={pageSize as number}
                            page={(page - 1) as number}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handlePageSizeChange}
                        />
                    </>
                ) : (
                    <>
                        <div className={styles.LoadingImage}>
                        <Image src={'/Animation1722863133952.gif'} width={250} height={250} alt="loading" />
                        </div>
                    </>
                )}
            </TableContainer>
            <AddClientComplaint
            open={isAdd}
            setOpen={setisAdd}
            handleSubmitForm={handleAddSubmitForm}
            />
            <EditClientComplaints
             open={isEdit}
            setOpen={setisEdit}
            handleSubmitForm={handleEditSubmitForm}
            clientComplaints={clientComplaints}
            />
        </div>
    );
};

export default ClientComplaintTable;
