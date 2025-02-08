import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {DeleteTransport, GetAllTransports} from "../../services/transport-services";
import {GetAllUsersforAdmin, SetAdmin} from "../../services/admin-services";
import {useEffect, useState} from "react";
import {AnswerConverter} from "../../utils/adaptor";


export default function UserTable({Data}) {
    const [tableData,setTableData] = useState(Data);
    const [Datalog,setDatalog] = useState();
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        const getDataUserforAdmin = async () => {
            const data = await GetAllUsersforAdmin(setTableData);
        }
        getDataUserforAdmin();
    }, [refresh]);


    const handleSetAdmin = async (row)=>{
        const newData = {
            username: row.username,
            firstname: row.firstname,
            lastname: row.lastname,
            email: row.email,
            admin: !row.admin
        }
        try {
            await SetAdmin({ setData:setDatalog, adminJson:newData });

            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error deleting answer:", error);
        }
        console.log(newData);
    };


    return (
        <TableContainer component={Paper} sx={{width:'auto !important', display:'flex', justifyContent:'center !important', marginTop:'5%'}}>
            <Table sx={{ minWidth: 'inherit !important' , width:'inherit !important', maxWidth:'inherit !important'}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableData && <TableCell>UserName</TableCell>}
                        {tableData && <TableCell>FirstName</TableCell>}
                        {tableData && <TableCell align="center">LastName</TableCell>}
                        {tableData && <TableCell align="center">Email</TableCell>}
                        {tableData && <TableCell align="center">IsAdmin?</TableCell>}
                        {tableData && <TableCell align="center">Action</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(tableData) && tableData.map((row,index) => (
                        <TableRow
                            key={row}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.username}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.firstname}
                            </TableCell>
                            <TableCell align="center">{row.lastname}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{JSON.stringify(row.admin)}</TableCell>
                            <Box key={index} sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    <Button
                                        variant="outlined"
                                        sx={{marginTop:'5px'}}
                                        onClick={()=>{handleSetAdmin(row)}}
                                    >
                                        {(JSON.stringify(row.admin)==='true') ? "UnsetAdmin" : "SetAdmin"}
                                    </Button>
                            </Box>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
