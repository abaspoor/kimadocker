import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {IconButton, InputAdornment, Typography, useTheme} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {auth, fSignUp} from "../../services/user-services";
import {enqueueSnackbar} from "notistack";

const SignUp = () => {

    const theme = useTheme();
    const naVigate=useNavigate();
    const [showPass,setShowPass] = useState(false);

    const {AuthD,setAuth} = useAuth();
    const history = useNavigate();

    const passMatch = (pass1,pass2) => {
        return (pass1 === pass2);
    }
    const completeFields = (target)=>{
        if(target.firstname ==='' | target.lastname==='' | target.email==='' | target.password==='' | target.password2===''){
            return false;
        }else{
            return true;
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user_name = data.get('username');
        const first_name = data.get('firstname');
        const last_name = data.get('lastname');
        const email = data.get('email');
        const password = data.get('password');
        const password2 = data.get('password2');
        const target = {
            username:user_name,
            firstname:first_name,
            lastname: last_name,
            email:email,
            password:password,
            password2:password2
        }
        console.log(target);
        if(completeFields(target)){
            if(passMatch(password,password2)){
                const regData = await fSignUp({username:user_name,email:email,firstname:first_name,lastname:last_name,password:password});
                if(regData){
                    // const datas = await auth({user_name, password});
                    // setAuth(datas);
                    naVigate('/signing');
                    enqueueSnackbar("Registered successfully", {variant:'success',style:{borderRadius:'17px',},anchorOrigin:{
                            vertical:"top",
                            horizontal:"right",
                        }});
                }else{
                    enqueueSnackbar("bad response", {variant:'error',style:{borderRadius:'17px',},anchorOrigin:{
                            vertical:"top",
                            horizontal:"right",
                        }});
                    console.log(regData);
                }
            }else{
                enqueueSnackbar("Password Doesn't Match", {variant:'error',style:{borderRadius:'17px',},anchorOrigin:{
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
        <Box sx={{width:'auto',height:'100vh',backgroundColor:`${theme.palette.primary.light}`,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box component="form" noValidate onSubmit={(event)=>handleSubmit(event)} sx={{display:'flex',flexDirection:'column',borderStyle: 'solid',margin:'0 10% 0 10%',
                borderWidth: '1px',borderColor:`${theme.palette.primary.main}`,backgroundColor:`white`,padding:'5% 5% 5% 5%',borderRadius:'15px'}}>
                <Typography>Sign Up Form</Typography>
                <TextField required  variant={"outlined"} id="username" label="UserName" name="username" sx={{backgroundColor:`${theme.palette.primary.light}`,marginTop:'5%'}}/>
                <TextField required  variant={"outlined"} id="firstname" label="FirstName" name="firstname" sx={{backgroundColor:`${theme.palette.primary.light}`,marginTop:'5%'}}/>
                <TextField required variant={"outlined"} id="lastname" label="LastName" name="lastname" sx={{backgroundColor:`${theme.palette.primary.light}`,marginTop:'5%'}}/>
                <TextField required variant={"outlined"} id="email" label="Email Address" name="email" autoComplete="email" sx={{backgroundColor:`${theme.palette.primary.light}`,marginTop:'5%'}}/>
                <Box sx={{marginTop:'5%',display:'flex'}}>
                    <TextField required variant={"outlined"} name="password" label="Password" type="password" id="password" autoComplete="new-password" type={showPass ? 'text' : 'password'} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">
                                <IconButton edge="end" onMouseEnter={()=>{setShowPass(true)}} onMouseLeave={()=>{setShowPass(false)}}>
                                    <Typography fontSize={"large"}>show</Typography>
                                </IconButton>
                            </InputAdornment>,
                        },
                    }} sx={{backgroundColor:`${theme.palette.primary.light}`}}/>
                </Box>
                <Box sx={{marginTop:'5%',display:'flex'}}>
                    <TextField required variant={"outlined"} name="password2" label="Confirm Password" type="password" id="password2" autoComplete="new-password" type={showPass ? 'text' : 'password'}
                               slotProps={{
                                   input: {
                                       endAdornment: <InputAdornment position="end">
                                           <IconButton edge="end" onMouseEnter={()=>{setShowPass(true)}} onMouseLeave={()=>{setShowPass(false)}}>
                                               <Typography fontSize={"large"}>show</Typography>
                                           </IconButton>
                                       </InputAdornment>,
                                   },
                               }} sx={{backgroundColor:`${theme.palette.primary.light}`}}/>
                </Box>
                <Box sx={{display:'flex',justifyContent:'center',marginTop:'5%',marginBottom:'5%'}}>
                    <Button variant={"contained"} type={"submit"} sx={{width:'50%'}}>Submit</Button>
                </Box>
            </Box>

        </Box>
    );
}

export default SignUp;