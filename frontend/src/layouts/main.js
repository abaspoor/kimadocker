import * as React from "react";
import Homepage from "../pages/Home/homepage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import SignIn from "./signing/sign-in";
import SignUp from "./signing/sign-up";
import AdminDashboard from "./dashboard/admin";
import Button from "@mui/material/Button";
import MenuAppBar from "../components/components/appbar";
import SimpleDialog from "../components/components/dialog";

function Main(){
    return(
        <>
            <MenuAppBar sx={{zIndex:'1000 !important'}}/>
            <Routes>
                <Route exact path="/dashboard" Component={Dashboard}/>
                <Route exact path="/signing" Component={SignIn}/>
                <Route exact path="/signup" Component={SignUp}/>
                <Route exact path="/admin" Component={AdminDashboard}/>
            </Routes>
        </>
    );
}

export default Main;