import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Typography, useTheme} from "@mui/material";
import StickyHeadTable from "../../components/components/table";
import BasicTable from "../../components/components/basictable";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {MethodData,UserData} from "../../Manipulation Data/manipulateddata";
import UserTable from "../../components/components/usertable";
import {GetAllAnswersExtra, SetAnswer} from "../../services/answer-services";
import {GetAllUsersforAdmin} from "../../services/admin-services";
import {GetAllTransports, SetTransport} from "../../services/transport-services";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {AnswerConverter} from "../../utils/adaptor";

const AdminDashboard = ()=>{
    const [refresh, setRefresh] = React.useState(false);
    const theme = useTheme();
    const naVigate = useNavigate();
    const userData = UserData();
    const defMethodData = MethodData();
    const [MethodDaata,setMethodDaata] = useState(defMethodData);
    const [method,setMethod] = useState("");
    const [emissionfactor,setEmissionfactor] = useState("");
    const [fuelAdjustment,setFuelAdjustment] = useState("");
    const [datauserforadmin,setDataUserForAdmin] = useState('');
    const [datatranports,setDataTransports] = useState('');
    const {AuthD,setAuthD} = useAuth();
    const[DataTransport,setDataTransport] = useState();

    useEffect(()=>{
        if(AuthD && AuthD.admin){
            const getDataUserforAdmin = async () => {
                const data = await GetAllUsersforAdmin(setDataUserForAdmin);
            }
            const getDataTransport = async () => {
                const data = await GetAllTransports(setDataTransports);
            }
            getDataTransport();
            getDataUserforAdmin();
        }else {
            AuthD ? naVigate("/dashboard") : naVigate("/signing");
        }
    }, []); // Runs only once on component mount

    //
    useEffect(() => {
        if(AuthD && AuthD.admin){
            const getDataUserforAdmin = async () => {
                const data = await GetAllUsersforAdmin(setDataUserForAdmin);
            }
            const getDataTransport = async () => {
                const data = await GetAllTransports(setDataTransports);
            }
            getDataTransport();
            getDataUserforAdmin();
        }else {
            AuthD ? naVigate("/dashboard") : naVigate("/signing");
        }
    }, [refresh]);
    //
    const handleAdd = async () => {
        if (method && emissionfactor && fuelAdjustment) {
            // // Create new method object
            // const newMethod = {
            //     name: method,
            //     emissionfactor: emissionfactor,
            //     fueladjustmentfactor: fuelAdjustment
            // };
            //
            // // Add the new method to the existing state
            // setMethodDaata((prevData) => [...prevData, newMethod]);
            //
            // // Reset the input fields after adding
            // setMethod("");
            // setEmissionfactor("");
            // setFuelAdjustment("");
            const transportJson = {
                transportname: method,  //
                fuel_factor: fuelAdjustment,  //
                emission_factor: emissionfactor,
            };
            try {
                await SetTransport({ setDataTransport, transportJson });
            } catch (error) {
                console.error("Error setting answer:", error);
            }finally {
                setMethod("");
                setEmissionfactor("");
                setFuelAdjustment("");
                setRefresh(prev => !prev);
            }
        } else {
            alert("Please fill in all fields.");
        }
    };
    return(
        <Box sx={{width:'100vw',height:'auto',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',
            backgroundColor:`${theme.palette.primary.light}`, paddingTop:'5%'}}>
            <Box sx={{display:'flex',flexDirection:'column',borderStyle: 'solid',margin:'0 10% 0 10%',
                borderWidth: '1px',borderColor:`${theme.palette.primary.main}`,backgroundColor:`white`,padding:'5% 5% 5% 5%',borderRadius:'15px'}}>

                <Typography variant={'h5'} sx={{marginBottom:'5%'}}>Welcome to Admin page</Typography>

                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                        <TextField variant={"outlined"} label={"Method"} defaultValue={method} value={method} onChange={(event)=>{setMethod(event.target.value)}}></TextField>
                        <Box sx={{minWidth:'10%'}}></Box>
                        <TextField variant={"outlined"} label={"emission factor"} defaultValue={emissionfactor} value={emissionfactor} onChange={(event)=>{setEmissionfactor(event.target.value)}}></TextField>
                        <Box sx={{minWidth:'10%'}}></Box>
                        <TextField variant={"outlined"} label={"fuel adjustment factor"} defaultValue={fuelAdjustment} value={fuelAdjustment} onChange={(event)=>{setFuelAdjustment(event.target.value)}}></TextField>
                    </Box>

                    <Box sx={{display:'flex',justifyContent:'center',marginTop:'5%'}}>
                        <Button variant={"contained"} onClick={()=>{handleAdd();}}>Add</Button>
                    </Box>

                </Box>

                <Box sx={{marginTop:'5%'}}>
                    <BasicTable Data={datatranports && datatranports} setData={setDataTransports}/>
                </Box>

                <Box>
                    <UserTable Data={datauserforadmin && datauserforadmin}/>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboard;