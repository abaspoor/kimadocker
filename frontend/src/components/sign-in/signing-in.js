import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import {auth} from "../../services/user-services";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import SigningUp from "../sign-up/signing-up";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.th-deg.de/en">
                THD University
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.



export default function SignIn() {


    const {AuthD,setAuth} = useAuth();
    const history = useNavigate();
    const [UserSigningState,setUserSigningState] = useState('signing-in');

    const theme = useTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        const datas = await auth({username, password});
        if(datas !== undefined) {
            setAuth(datas);
            history('/sectionmain');
        }
    };

    const hanldeRegister = () =>{
        setUserSigningState('register');
    }

    return (
        <>
            {
                UserSigningState === 'signing-in' ?
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" style={{ color: theme.palette.primary.headercolor}}>
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                {/*<FormControlLabel*/}
                                {/*    control={<Checkbox value="remember" color="primary" />}*/}
                                {/*    label="Remember me"*/}
                                {/*/>*/}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 , color:theme.palette.primary.headercolor}}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    {/*<Grid item xs>*/}
                                    {/*    <Link href="#" variant="body2">*/}
                                    {/*        Forgot password?*/}
                                    {/*    </Link>*/}
                                    {/*</Grid>*/}
                                    <Grid item>
                                        <Link href="#" variant="body2" onClick={hanldeRegister}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                    </Container>
                    :
                    <SigningUp/>
            }
            </>
    );
}