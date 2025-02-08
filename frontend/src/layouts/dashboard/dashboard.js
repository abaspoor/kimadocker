import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {useState} from "react";
import {Typography} from "@mui/material";
import CustomizedTables from "../../components/components/table";
import ActionAreaCard from "../../components/components/card";
import {GetAllAnswersExtra, SetAnswer} from "../../services/answer-services";
import {GetAllAdmins, GetAllUsersforAdmin} from "../../services/admin-services";
import {GetAllTransports} from "../../services/transport-services";
import {DeleteUserButKeepAnswers} from "../../services/user-services";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const {AuthD,setAuth} = useAuth();
    const [age, setAge] = React.useState('');
    const [data,setData] = useState('');
    const [datatransport,setDataTransport] = useState('');

    //
    const[date,setDate]=useState(null);
    const[time,setTime]=useState(null);
    const[distance,setDistance]=useState(null);
    const[passengercount,setPassengercount]=useState(null);
    const[transportmethodId,setTransportmethodId]=useState(null);
    //

    const naVigate = useNavigate();
    useEffect(()=>{
       if(AuthD){
           const getData = async () => {
               const data = await GetAllAnswersExtra(setData);
           }
           getData();
           const getDataTransport = async () => {
               const data = await GetAllTransports(setDataTransport);
           }
           getDataTransport();
       }else {
           naVigate("/signing");
       }
    }, []); // Runs only once on component mount


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleTransport = (transportMethodId)=>{
        setTransportmethodId(transportMethodId);
    }

    const handleSetAnswer = async () => {
        const dataUser = localStorage.getItem("signed-user");
        const jsonData = JSON.parse(dataUser);
        const UserId = jsonData ? jsonData.id : "notFound";

        const testdate = new Date(date).toISOString()
        console.log(testdate);
        // Convert `date` to `YYYY-MM-DD`
        const formattedDate = new Date(date).toISOString().split("T")[0];

        // Convert `time` to `HH:mm:ss`
        const formattedTime = new Date(time).toISOString().split("T")[1].split(".")[0];

        const Answerjson = {
            date: formattedDate,  //
            time: formattedTime,  //
            distance: distance,
            passenger_count: passengercount,
            userid: UserId,
            transportid: transportmethodId,
        };

        try {
            await SetAnswer({ setDataTransport, Answerjson });
        } catch (error) {
            console.error("Error setting answer:", error);
        }
    };

    return (AuthD &&
                <Box sx={{backgroundColor:"#D9E1DF",width:'auto',height:'auto'}}>
                    <Box sx={{width:'100%',height:'25%',display:'flex',flexDirection:'column'}}>
                        <Typography variant={"h4"}>Welcome {AuthD && (AuthD.lastname.charAt(0).toUpperCase() + AuthD.lastname.slice(1).toLowerCase())}</Typography>
                        <Typography variant={"title"}>Your CO2 Footprint Summary</Typography>
                        <Box sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Box sx={{marginLeft:'10%',marginRight:'0'}}><ActionAreaCard props={{text:'Daily',value:'25%'}}/></Box>
                            <Box sx={{width:'20%'}}/>
                            <Box sx={{width:'auto'}}><ActionAreaCard props={{text:'Monthly',value:'15%'}}/></Box>
                            <Box sx={{width:'20%'}}/>
                            <Box sx={{marginRight:'10%',width:'auto'}}><ActionAreaCard props={{text:'Yearly',value:'7%'}}/></Box>
                        </Box>
                    </Box>
                    <Box sx={{width:'100%',height:'55%', marginTop:'10px', alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column'}}>
                        <DatePicker sx={{width:'80%', marginBottom:'1rem',background:"white"}} onChange={(value)=>(setDate(value))}/>
                        <TimePicker label="pick a time" sx={{width:'80%', marginBottom:'1rem',backgroundColor:"white"}} onChange={(value)=>(setTime(value))}/>
                        <TextField id="outlined-basic1" label="Distance in KM" variant="outlined" sx={{width:'80%', marginBottom:'1rem',backgroundColor:"white"}} onChange={(event)=>(setDistance(event.target.value))}/>
                        <TextField id="outlined-basic2" label="Passenger Count" variant="outlined" sx={{width:'80%', marginBottom:'1rem',backgroundColor:"white"}} onChange={(event)=>(setPassengercount(event.target.value))}/>
                        <FormControl sx={{width:'80%', marginBottom:'1rem',backgroundColor:"#D9E1DF"}}>
                            <InputLabel id="demo-simple-select-label" sx={{backgroundColor:"#D9E1DF"}}>Transportation Method</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                {
                                    datatransport && datatransport.map((transport,index)=>(
                                        <MenuItem id={transport.id} value={transport.id} onClick={()=>{handleTransport(transport.id)}}>{transport.transportname}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Button variant="contained" sx={{width:'10rem', marginBottom:'1rem',marginLeft:'auto',marginRight:'10px', backgroundColor:'#498A7A'}} onClick={handleSetAnswer}>Add Activity</Button>
                    </Box>
                    <Box sx={{width:'100%',height:'25%', display:'flex', flexDirection:'column'}}>
                        <Typography sx={{color:"#498A7A", fontWeight:"bold", marginLeft:'10px'}}>Your Transportation Activities
                        </Typography>
                        <Box sx={{margin:"0 2% 0 2%"}}>
                            {data && <CustomizedTables datas={data} setData={setData}/>}
                        </Box>
                    </Box>
                </Box>
    );
}

export default Dashboard;