import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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

const SignUp = () => {
  const classes = useStyles();

  const [userCreated, setUsercreated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const [location, setLocation] = useState(null)


  useEffect(() => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation(latitude + ',' + longitude);
    }

    function error() {
      alert('Unable to retrieve your location');
    }


    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }, [])



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password, role, ethAddress, location);
    axios.post('http://localhost:5000/auth/signup', {
      username: username,
      password: password,
      role: role,
      ethAddress: ethAddress,
      location: location
    })
      .then(function (response) {
        if (response.status === 201) {
          setUsercreated(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div>
      {userCreated ? (<div>
        <p>You have successfully signed up. Please <a href='/login'>login</a> now.</p>
      </div>) : (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus


                  value={username}
                  onChange={event => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="ethAddress"
                  label="Ethereum Address"
                  name="ethAddress"
                  autoComplete="ethAddress"

                  value={ethAddress}
                  onChange={event => setEthAddress(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="role">Role in supply chain</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={role}
                  onChange={event => setRole(event.target.value)}
                >
                  <MenuItem value="manufacturer">Manufacturer</MenuItem>
                  <MenuItem value="distributor">Distributor</MenuItem>
                  <MenuItem value="retailer">Retailer</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"

                  value={password}
                  onChange={event => setPassword(event.target.value)}

                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href='/login' variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>)}
    </div>
  );
}

export default SignUp;