import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, makeStyles} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Manufacturer from './Manufacturer';
import Distributor from './Distributor';
import Retailer from './Retailer';




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Dashboard = () => {
    const classes = useStyles();
    const [,setAuthstatus] = useContext(AuthContext);
    const [userData, setUserData] = useState({});

    const logout = () => {
        setAuthstatus(false);
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('token');
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        console.log(token);
        axios.get('http://localhost:5000/dashboard', {
            headers: {
              Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            console.log(res.data);
            setUserData({
                username: res.data.username,
                role: res.data.role,
                ethaddress: res.data.ethaddress,
            });
        }
        )
        .catch(err => console.log(err))
    }, [])


    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                Coral
                </Typography>
                <Button color="inherit">
                    <PersonIcon />
                    {userData.username}
                </Button>
                <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            {
                (() => {
                    if (userData.role === 'manufacturer') {
                        return <Manufacturer username={userData.username}/>
                    }
                    else if (userData.role === 'distributor') {
                        return <Distributor username={userData.username}/>
                    }
                    else if (userData.role === 'retailer') {
                        return <Retailer username={userData.username}/>
                    }
                    else {
                        return <h1>Role not found</h1>
                    }
                })()
            }
        </React.Fragment>
    )
}





export default Dashboard;