import React from 'react';
import {enquUser, status, statusAnswers, statusUser, statusUserSignin, statusUserSignup} from '../utils/utils';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;


// signup user
export function fSignUp(userData){
    return fetch(`${API_BASE_URL}/api/users/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    }).then((res)=>statusUser(res,"signup")).catch(e => {console.log(e);
    })
}

// authorize user
export function auth(credentials){
    // console.log(`${API}`);
    return fetch(`${API_BASE_URL}/api/users/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then((res)=>statusUser(res)).catch((e)=>enquUser(e,'error'));
}


export function ProfileSet(userData){
    return fetch(`${API_BASE_URL}ers/profiles/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    }).then(status).catch(e => {console.log(e);
    })
}


export function DeleteUser({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`${API_BASE_URL}/api/users/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, //
            "Content-Type": "application/json"
        }
    })
        .then((res) => statusAnswers(res))
        .then((data) => setData(data))
        .catch((e) => {
            console.log("Error fetching answers:", e);
        });

}

export function DeleteUserCascade({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`${API_BASE_URL}/api/users/delete/cascade/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, //
            "Content-Type": "application/json"
        }
    })
        .then((res) => statusAnswers(res))
        .then((data) => setData(data))
        .catch((e) => {
            console.log("Error fetching answers:", e);
        });

}

export function DeleteUserButKeepAnswers({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`${API_BASE_URL}/api/users/delete/keep-answers/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, //
            "Content-Type": "application/json"
        }
    })
        .then((res) => statusAnswers(res))
        .then((data) => setData(data))
        .catch((e) => {
            console.log("Error fetching answers:", e);
        });

}
