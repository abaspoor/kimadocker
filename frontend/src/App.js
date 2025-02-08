import './App.css';
import Main from "./layouts/main";
import {DeviceProvider} from "./context/devicecontext";
import {AuthProvider} from "./hooks/useAuth";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./themes/Theme";
import DateTimeAdapter from "./context/datetimeadapter";
import zIndex from "@mui/material/styles/zIndex";
function App() {

    const user = JSON.parse(localStorage.getItem('signed-user'));

  return (
      <ThemeProvider theme={theme}>
          <DateTimeAdapter>
              <DeviceProvider>
                  <AuthProvider user={user}>
                      <SnackbarProvider maxSnack={3} sx={{zIndex:'10000 !important'}}>
                          <Router>
                            <Main/>
                          </Router>
                      </SnackbarProvider>
                  </AuthProvider>
              </DeviceProvider>
          </DateTimeAdapter>
      </ThemeProvider>
  );
}

export default App;
