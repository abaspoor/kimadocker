import React from "react";

const MethodData = ()=>{
    const methoddata = [
        {
            name:'car',
            emissionfactor:'150',
            fueladjustmentfactor:'1'
        },
        {
            name:'train',
            emissionfactor:'180',
            fueladjustmentfactor:'1.5'
        },
        {
            name:'plane',
            emissionfactor:'250',
            fueladjustmentfactor:'2'
        },
        {
            name:'bicyle',
            emissionfactor:'250',
            fueladjustmentfactor:'2'
        },
    ];
    return (
        methoddata
    );
}

const UserData = ()=>{
    const userdata = [
        {
            firstname:'azsarakhsh',
            lastname:'abazari',
            email:'1chizi@yechizi.com',
            isadmin:'true'
        },
        {
            firstname:'kimia',
            lastname:'omidi',
            email:'2chizi@yechizi.com',
            isadmin:'false'
        },
        {
            firstname:'reza',
            lastname:'abaspoor',
            email:'3chizi@yechizi.com',
            isadmin:'true'
        },
        {
            firstname:'susan',
            lastname:'babayi',
            email:'4chizi@yechizi.com',
            isadmin:'false'
        },
    ];
    return (
        userdata
    );
}
export {MethodData,UserData}