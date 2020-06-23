import React, { useState } from 'react';

import { Grid, TextField, Button, Typography, Card, CardActionArea, CardMedia, CardContent, CardActions } from '@material-ui/core';

import axios from 'axios';



const QRCard = (props) => {
    return (
        <Card style={{width: '350px', margin: '2em auto'}}>
        <CardActionArea>
            <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="200"
            width="200"
            image={props.imgsrc}
            title="QR"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            Share
            </Button>
            <Button size="small" color="primary">
            Learn More
            </Button>
        </CardActions>
    </Card>)}


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