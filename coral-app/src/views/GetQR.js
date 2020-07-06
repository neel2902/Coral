import React, { useState } from 'react';

import { Grid, TextField, Button, Typography } from '@material-ui/core';

import axios from 'axios';

const GetQR = () => {

    const [qr, setqr] = useState(null);

    const [upc, setUpc] = useState('');


    const handleSubmit = () => {
        axios.post('http://localhost:5000/getQR', {
            upc: upc
        })
            .then(res => {
                console.log(res.data);
                let rawResponse = btoa(res.data);
                setqr('data:image/png;base64,'+rawResponse);
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <React.Fragment>
        <form style={{width: '300px', margin: '3em auto'}} noValidate>
          <Grid container spacing={2}>
            <Typography variant="h5" style={{margin: '2em auto', textAlign: 'center'}}>Enter product ID</Typography>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="upc"
                label="Product id"
                name="upc"
                value={upc}
                onChange={(event) => {setUpc(event.target.value)}}
              />
            </Grid>
          </Grid>
          <Button
            style={{margin: '2em auto'}}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Get QR
          </Button>
        </form>
        {qr ? <img src={qr} height="10" width="10" alt="Red dot" />: null }
        </React.Fragment>
    )
}

export default GetQR;