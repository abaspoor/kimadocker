import React from 'react';
import {enquUser, status, statusAnswers, statusUser, statusUserSignin, statusUserSignup} from '../utils/utils';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export function GetAllAdmins(setData){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`${API_BASE_URL}/api/users/admins`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // ✅ Include the JWT token in the request
            "Content-Type": "application/json"
        }
    })
        .then((res) => statusAnswers(res))
        .then((data) => setData(data))
        .catch((e) => {
            console.log("Error fetching answers:", e);
        });

}

export function GetAllUsersforAdmin(setData){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`${API_BASE_URL}/api/users/admins/getusers`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // ✅ Include the JWT token in the request
            "Content-Type": "application/json"
        }
    })
        .then((res) => statusAnswers(res))
        .then((data) => setData(data))
        .catch((e) => {
            console.log("Error fetching answers:", e);
        });

}

export function SetAdmin({ setData, adminJson }) {

    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";

    return fetch(`${API_BASE_URL}/api/users/setadmin`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adminJson) //
    })
        .then((res) => res.json()) //
        .then((data) => {
            setData(data);
        })
        .catch((e) => {
            console.error("Error setting answer:", e);
        });
}