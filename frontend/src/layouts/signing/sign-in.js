import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import {useTheme} from "@mui/material/styles";
import {auth, fSignUp} from "../../services/user-services";
import {enqueueSnackbar} from "notistack";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const SignIn = ()=>{
    const {AuthD,setAuth} = useAuth();
    const naVigate = useNavigate();

    const theme = useTheme();
    const commonStyles = {
        bgcolor: 'background.paper',
        m: 1,
        borderColor: 'text.primary',
        width: '5rem',
        height: '5rem',
    };

    const completeFields = (target)=>{
        if(target.username ==='' | target.password===''){
            return false;
        }else{
            return true;
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user_name = data.get('username');
        const password = data.get('password');
        const target = {
            username:user_name,
            password:password,
        }
        if(completeFields(target)){
            const regData = await auth({username:user_name,password:password});
            if(regData){
                setAuth(regData);
                naVigate('/dashboard');
                enqueueSnackbar("Logged in successfully", {variant:'success',style:{borderRadius:'17px',},anchorOrigin:{
                        vertical:"top",
                        horizontal:"right",
                    }});
            }
        }else{
            enqueueSnackbar("Please Fill All the Fields", {variant:'error',style:{borderRadius:'17px',},anchorOrigin:{
                    vertical:"top",
                    horizontal:"right",
                }});
        }
    }

    return(
        <Box sx={{backgroundColor:`${theme.palette.primary.light}`, width:'100vw',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <Box component="form" noValidate onSubmit={(event)=>handleSubmit(event)} sx={{display:'flex',flexDirection:'column',borderStyle: 'solid',margin:'0 10% 0 10%',
                borderWidth: '1px',borderColor:`${theme.palette.primary.main}`,backgroundColor:`white`,padding:'10% 5% 10% 5%',borderRadius:'15px'}}>
                <Typography variant={"h4"}>Welcome to CO2 Tracker!</Typography>
                <TextField required  variant={"outlined"} id="username" label="UserName" name="username" sx={{backgroundColor:`${theme.palette.primary.light}`,marginTop:'2%'}}/>
                <TextField required variant={"outlined"} name="password" label="Password" type="password" id="password" autoComplete="new-password" sx={{backgroundColor:`${theme.palette.primary.light}`,marginTop:'2%'}}/>
                <Button variant={"contained"} type={"submit"} sx={{marginTop:'3%'}}>Sign In</Button>
                <Button sx={{marginTop:'3%'}}>forgot your password ?</Button>
                <Button sx={{marginTop:'3%'}}>Dont have an account?Signup</Button>
            </Box>
        </Box>
    );
}

export default SignIn;