"use client";
import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import { Lead } from "./leadData";
import { timestampConversion } from "@/utils/utils";
import { Input } from "reactstrap";
import { Box, Button, ClickAwayListener, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useDebounce } from "@/utils/useDebounceHook";
import { useLeadContext } from "./context/LeadContext";
import styles from '../dashboard.module.css'
import AddLead from "./context/AddLead";
import EditLead from "./context/EditLead";
import Image from "next/image";
import { lightBlue } from "@mui/material/colors";

const LeadTable = () => {
    const {
        page,
        pageSize,
        searchQuery,
        sortBy,
        tableData,
        loading,
        setSearchQuery,
        createLead,
        lead,
        setLead,
        setPage,
        setSize,
        updateLead,
        totalLeads,
        myPermissions
    } = useLeadContext();


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

    const handleEditSubmitForm = (payload: Lead) => {
        updateLead(payload);

        setisEdit(false);
    };
    const handleAddSubmitForm = (payload: Lead) => {
        createLead(payload);
        setisAdd(false);
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handlePageSizeChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSize(Number(event.target.value));
        setPage(1);
    };
    return (
        <div>
            <div className={styles.TableFlexTop} >
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
                        {myPermissions?.permission.leads.create ? (
                            <Button
                                variant="contained"
                                className={styles.BlueButton}
                                onClick={() => {
                                    setisAdd(true);
                                }}
                            >
                                Add Lead
                            </Button>) : (<Button
                                variant='contained'
                                className={styles.BlueButton}
                                disabled
                            >
                                Add Lead
                            </Button>)}
                    </div>
                </div>
            </div>

            <TableContainer sx={{ borderRadius: 2.5, fontWeight: 600 }} component={Paper}>
                {!loading ? (
                    <>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead >
                                <TableRow >
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Language</TableCell>
                                    <TableCell align="right">Message</TableCell>
                                    <TableCell align="right">Created At</TableCell>
                                    <TableCell align="right">Updated At</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <>
                                    {tableData && tableData.length > 0 ? (
                                        tableData.map((row: Lead) => (
                                            <TableRow
                                                key={row.email}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell align="right">{row.name}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.phone}</TableCell>
                                                <TableCell align="right">{row.language}</TableCell>
                                                <TableCell align="right">{row.message}</TableCell>
                                                <TableCell align="right">
                                                    {row.createdAt && timestampConversion(row.createdAt)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.updatedAt && timestampConversion(row.updatedAt)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {myPermissions?.permission.leads.edit ? (
                                                        <Button
                                                            onClick={() => {
                                                                setLead(row);
                                                                setisEdit(true);
                                                            }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="25px" height="25px"><path d="M57.828,22.266c1.562,1.562,1.562,4.095,0,5.657L32.108,53.644L16.52,58.857c-2.088,0.698-4.076-1.29-3.378-3.378	l5.213-15.587l25.721-25.721c1.562-1.562,4.095-1.562,5.657,0L57.828,22.266z M42.905,25.243L24.471,43.676l-1.703,5.092	l0.463,0.463l5.092-1.703l18.434-18.434L42.905,25.243z" /></svg>
                                                        </Button>) : (
                                                        <Button
                                                            disabled
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="25px" height="25px"><path d="M57.828,22.266c1.562,1.562,1.562,4.095,0,5.657L32.108,53.644L16.52,58.857c-2.088,0.698-4.076-1.29-3.378-3.378	l5.213-15.587l25.721-25.721c1.562-1.562,4.095-1.562,5.657,0L57.828,22.266z M42.905,25.243L24.471,43.676l-1.703,5.092	l0.463,0.463l5.092-1.703l18.434-18.434L42.905,25.243z" /></svg>
                                                        </Button>)
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={9} align="center">
                                                <Image width={400} height={400} src={'/loading.svg'} alt="loading" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20, 25, 50]}
                            component="div"
                            count={totalLeads || 0}
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
            <AddLead
                open={isAdd}
                setOpen={setisAdd}
                handleSubmitForm={handleAddSubmitForm}
            />
            <EditLead
                open={isEdit}
                setOpen={setisEdit}
                handleSubmitForm={handleEditSubmitForm}
                lead={lead}
            />
        </div>
    );
};

export default LeadTable;
