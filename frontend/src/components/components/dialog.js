import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
import {DeleteTransport, GetAllTransports} from "../../services/transport-services";
import {DeleteUser, DeleteUserButKeepAnswers, DeleteUserCascade} from "../../services/user-services";
import {useNavigate} from "react-router-dom";

const deleteOptions = ['SafeDelete', 'CascadeDelete','ForceDelete'];

function SimpleDialog(props) {

    const theme = useTheme();
    const { onClose, selectedValue, open ,setDeleteOption,id} = props;
    const[data,setData]=useState();
    const naVigate = useNavigate();

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick =  async (value) => {
        onClose(value);
        setDeleteOption(value);
        console.log(value);
        console.log("Deleting id with ID:");
        if(value==='SafeDelete'){
            try {
                await DeleteUserButKeepAnswers({ setData, id });
            }catch (error) {
                console.error("Error deleting user:", error);
            }
        }else if (value==='CascadeDelete'){
            try {
                await DeleteUserCascade({ setData, id });
            }catch (error) {
                console.error("Error deleting user:", error);
            }
        }else {
            try {
                await DeleteUser({ setData, id });
            }catch (error) {
                console.error("Error deleting user:", error);
            }
        }
        // naVigate("/signing");
        // localStorage.clear();
        // window.location.reload();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{backgroundColor:"primary.main",color:'primary.light'}}>Delete Options</DialogTitle>
            <List sx={{ pt: 0 }} sx={{backgroundColor:"primary.light",color:'primary.main',justifyContent:"center !important", alignItems:"center !important"}}>
                {deleteOptions.map((deleteOption,index) => (
                    <ListItem disablePadding key={deleteOption} sx={{backgroundColor:"inherit"}}>
                        <ListItemButton onClick={() => handleListItemClick(deleteOption)} sx={{backgroundColor:"inherit"}}>
                            <ListItemText primary={deleteOption} sx={{justifyContent:"center !important", alignItems:"center !important"}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function DialogDeleteUser({btnTitle}) {
    const [open, setOpen] = React.useState(false);

    const [deleteOption,setDeleteOption] = useState(deleteOptions[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <Box sx={{display:'flex',flexDirection:'column'}}>
            <Button variant="outlined" onClick={handleClickOpen} sx={{color:"primary.light",":hover":{color:'black'}}}>
                {btnTitle}
            </Button>
            <SimpleDialog
                selectedValue={deleteOption}
                open={open}
                onClose={handleClose}
                setDeleteOption={setDeleteOption}
                id={2}
            />
        </Box>
    );
}
