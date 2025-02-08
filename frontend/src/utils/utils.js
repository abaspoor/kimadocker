import {enqueueSnackbar} from "notistack";

export const enquUser = async (res,status)=>{
    const resObj = await res;
    console.log(resObj);
    let msg;
    let myVariant;
    if(status==="signup"){
        myVariant='success';
        msg = `Dear ${resObj["username"]} You are successfully Registered`;
    }else if (status==="signin"){
        myVariant='success';
        msg = `Dear ${resObj["user"]["username"]} Logged in Successfully`;
    }else{
        myVariant='error';
        msg = resObj;
    }
    enqueueSnackbar((resObj && msg), {
        variant:myVariant,
        style:{borderRadius:'17px',},
        anchorOrigin:{
            vertical:"top",
            horizontal:"right",
        }});
}

const handleError = async (res) => {
    const obj = await res;
    const key = Object.keys(obj)[0];
    const msg = obj[key];
    return msg;
}

export function status(res){
    if(res.status >= 200 && res.status <300){
        return res.json();}
    throw new Error(res.statusText);
}

export async function statusUser(res,status){
    const resObj = res.json();
    if(res.status >= 200 && res.status <300){
        // enquUser(resObj,status);
        return resObj;}
    else {
        const errorMessage = await handleError(resObj);
        console.log(errorMessage);
        throw errorMessage;
    }
}

export async function statusAnswers(res){
    const resObj = await res.json();
    if(res.status >= 200 && res.status <300){
        // enquUser(resObj,status);
        return resObj;}
    else {
        const errorMessage = await handleError(resObj);
        throw errorMessage;
    }
}