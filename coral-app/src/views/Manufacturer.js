import React, { useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, makeStyles, Container} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Coral
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Manufacturer(props) {
  const classes = useStyles();

  const [productname, setProductname] = useState('');
  const [upc, setUpc] = useState('');
  const [batch, setBatch] = useState('');
  const [lot, setLot] = useState('');
  const [distributor, setDistributor] = useState('');
  const ownAddress = props.address;

  const token = sessionStorage.getItem('token');


  const handleSubmit = () => {

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    axios.post('http://localhost:5000/manufacturer/save', {
      productname: productname,
      upc: upc,
      batch: batch,
      lot: lot,
      manufacturer: ownAddress,
      distributor: distributor
    }, config)
    .then(res => {
      alert(res.data);
    })
    .catch(err => {
      alert(err);
    })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocalHospitalIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Drug entry
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="productName"
                variant="outlined"
                required
                fullWidth
                id="productName"
                label="Product Name"
                autoFocus
                value={productname}
                onChange={(event) => {setProductname(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="UPC"
                label="UPC"
                name="UPC"
                value={upc}
                onChange={(event) => {setUpc(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="batch"
                label="Batch number"
                name="batch"
                value={batch}
                onChange={(event) => {setBatch(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lot"
                label="Lot number"
                name="lot"
                value={lot}
                onChange={(event) => {setLot(event.target.value)}}
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
                value={ownAddress}
                disabled
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
                value={distributor}
                onChange={(event) => {setDistributor(event.target.value)}}
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
            Submit entry
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}