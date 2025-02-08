import React,{createContext,useContext,useMemo} from "react";
import {useTheme,useMediaQuery} from "@mui/material";

const Devicecontext = createContext();

export const DeviceProvider = ({children})=> {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));
    const isLg = useMediaQuery(theme.breakpoints.only('lg'));
    const isXl = useMediaQuery(theme.breakpoints.only('xl'));

    const deviceType = useMemo(() => {
        if (isXs) return 'xs'; // Mobile
        if (isSm) return 'sm'; // Tablet
        if (isMd) return 'md'; // Desktop
        if (isLg) return 'lg'; // Large Desktop
        if (isXl) return 'xl'; // Extra-Large Desktop
    },[isXs,isSm,isMd,isLg,isXl]);

    return(
        <Devicecontext.Provider value={deviceType}>
            {children}
        </Devicecontext.Provider>
    );

};

export const useDevice = ()=> useContext(Devicecontext);