import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useDevice} from "../../context/devicecontext";
import {Typography} from "@mui/material";

export default function SimpleContainer() {
    const deviceType = useDevice();

    const text = {
        xs:'This is Mobile',
        sm:'This is Tablet',
        md:'This is Desktop',
        lg:'This is large Desktop',
        xl:'This is extra-large Desktop'
    }[deviceType]||'Unknown device type';

    return (

        <Box sx={{ backgroundColor:{xs:'#ffcccb',sm:'#add8e6',md:'#90ee90',lg:'#f5deb3',xl:'#d8bfd8'},
            minHeight: '100vh' , minWidth:'100vw',
            display:'flex', alignItems:'center',justifyContent:'center'}}>
            <Typography>
                {text}
            </Typography>
        </Box>
    );
}
