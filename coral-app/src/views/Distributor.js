import React, {Component, useState} from 'react';
import {Avatar, Button, TextField, Paper, Link, Grid, Box, Typography, makeStyles, ListItem,ListItemText, List, ListItemAvatar} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '92.5vh',
        overflow: 'hidden'
    },
    paper: {
        height: '100%',
        padding: '2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));
  





class Pending extends Component {

    state = {
        pendingOrders: []
    }

    componentDidMount() {
        let config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        axios.get('http://localhost:5000/distributor/getPendingOrders', config)
        .then((res) => {
            this.setState({pendingOrders: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {

        let orders = "You have no pending orders";
        if (this.state.pendingOrders.length !== 17) {
            orders = this.state.pendingOrders.map(order => {
                return (
                <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AddTwoToneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Product id: "+order.upc} secondary={"Manufacturer: "+order.manufacturer} />
                </ListItem>
                );
            });
        }

    return (
        <List style={{marginTop: '2em'}}>{orders}</List>
    );
    }
}











const Distributor = (props) => {
    const classes = useStyles();
    const ownAddress = props.address;
    const [upc, setUpc] = useState(null);
    const [retailer, setRetailer] = useState(null);



    const handleSubmit = () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        };

        axios.post('http://localhost:5000/distributor/update',{
            upc: upc,
            retailer: retailer
        }, config)
        .then(result => {
            alert(result.data);
            window.location.reload();
        })
        .catch(err => {
            alert(err);
        })
    }



    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LocalHospitalIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Stage 2
                    </Typography>
                    <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="upc"
                            label="Product id"
                            name="upc"
                            value={upc}
                            onChange={(event)=>{setUpc(event.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            name="se"
                            variant="outlined"
                            required
                            fullWidth
                            id="disabled"
                            label="Your ethereum address"
                            disabled
                            value={ownAddress}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="receiver"
                            label="Receiver's address"
                            type="receiver"
                            id="receiver"
                            value={retailer}
                            onChange={(event)=>{setRetailer(event.target.value)}}
                        />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Forward order
                    </Button>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" style={{marginTop: '1.5em'}}>List of pending orders</Typography>
                    <Pending />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Distributor;