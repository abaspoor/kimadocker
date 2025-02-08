import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {DeleteTransport, GetAllTransports} from "../../services/transport-services";
import {AnswerConverter} from "../../utils/adaptor";

function createData(name, emissionfactor, fueladjustmentfactor,) {
    return { name, emissionfactor, fueladjustmentfactor };
}

const rows = [
    createData('Car', 159, 6.0),
    createData('Train', 237, 9.0),
    createData('Plane', 262, 16.0),
];

export default function BasicTable({Data,setData}) {
    const [rows,setRows]=useState(Data);
    const [refresh, setRefresh] = React.useState(false);

    useEffect(() => {
        setRows(Data);
    }, [refresh]);

    const handleDelete = async (id) => {
        console.log("Deleting transfer with ID:", id);

        try {
            await DeleteTransport({ setData, id });

            await GetAllTransports(setData);

            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error deleting answer:", error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{width:'auto !important', display:'flex', justifyContent:'center !important', marginTop:'5%'}}>
            <Table sx={{ minWidth: 'inherit !important' , width:'inherit !important', maxWidth:'inherit !important'}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Data && <TableCell>Name</TableCell>}
                        {Data && <TableCell align="center">emission factor</TableCell>}
                        {Data && <TableCell align="center"> fuel adjustment factor</TableCell>}
                        {Data && <TableCell align="left">Action</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(Data) && Data.map((row,index) => (
                        <TableRow
                            key={row}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.transportname}
                            </TableCell>
                            <TableCell align="center">{row.emission_factor}</TableCell>
                            <TableCell align="center">{row.fuel_factor}</TableCell>
                            <Button
                                variant="outlined"
                                sx={{marginTop:'5px'}}
                                onClick={()=>{handleDelete(row.id)}}
                            >
                                Delete
                            </Button>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
