import { createTheme} from '@mui/material/styles';
import {orange} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            // main: '#662549',
            light:'#D9E1DF',
            main: "#498A7A",
            dark: '#26463d',
            contrastText: '#D9E1DF',
            backcont:'#79c3b2',
        },
        secondary: {
            main: '#473e66',
            light: '#BD83B8',
            dark: '#1B3358',
            contrastText: '#06142E',
        },
        tertiary: {
            blue:'#29429C',
            bluelight: '#1A9EA7',
            bluelight2: '#6DA8FF',
            gray: '#5B6673',
            red:'#A23E3E',
            green: '#18A648',
            yellow:'#A7901A',
            red2:'#C60202',
            red3:'#F06161',
            green2:'#7AA71A',
            blue2:'#2B2E4A',
        },
        volkswagen: {
            blue:'rgb(0, 30, 80)'
        }
    },
    status: {
        danger: orange[500],
    },
    typography: {
        fontFamily: [
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});