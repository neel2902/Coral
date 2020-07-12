import React, { useState, useEffect, Component} from 'react';
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, makeStyles, Chip} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';

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
  modalpaper: {
    position: 'absolute',
    width: '40%',
    top: '40%',
    left: '50%',
    transform: "translate(-50%,-50%)",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    margin: theme.spacing(8),
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

  //modal code here
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [productname, setProductname] = useState('');
  const [upc, setUpc] = useState('');
  const [id, setid] = useState('');
  const [sku, setsku] = useState('');
  const [productList, setProductList] = useState('');
  const ownusername = props.username;
  const token = sessionStorage.getItem('token');



  useEffect(()=>{
    let config = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    }
    axios.get('http://localhost:5000/manufacturer/getProducts', config)
    .then((res) => {

      let products = [];
      if (typeof(res.data) != 'string') {
        products = res.data.map(product => {
          return {
            productid: product.id,
            quantity: 0
          }
        })
      }

      setProductList(products);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);


  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }

  const handleSubmit = () => {
    axios.post('http://localhost:5000/manufacturer/save', {
      id: id,
      productname: productname,
      upc: upc,
      sku: sku
    }, config)
    .then(res => {
      alert(res.data);
      window.location.reload();
    })
    .catch(err => {
      alert(err);
    })
  }

  return (
    <Grid container>
      <CssBaseline />
      <Grid item xs={12} md={4}>
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
                variant="outlined"
                required
                fullWidth
                id="id"
                label="Product ID"
                name="id"
                value={id}
                onChange={(event) => {setid(event.target.value)}}
              />
            </Grid>
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
                id="sku"
                label="SKU"
                name="sku"
                value={sku}
                onChange={(event) => {setsku(event.target.value)}}
              />
            </Grid>
            .
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
      </Grid>
      <Grid item xs={12} md={8}>
          <div className={classes.paper}>
          <Grid container>
              <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={handleOpen}>
                Add shipment
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                    <div className={classes.modalpaper}>
                      <ModalBody products={productList} username={ownusername} productList={productList}/>
                    </div>
                </Modal>
              </Grid>
            </Grid>
          </div>
        </Grid>
    </Grid>
  );
}




class ModalBody extends Component {
  state = {
    products: this.props.productList,
    lot: "",
    batch: "",
    sender: this.props.username,
    receiver: ""
  }

  inputOnChange = (value, index) => {
    this.setState(state => {
      const products = state.products.map((product, j) => {
        if (j === index) {
          return {
            ...product,
            quantity: Number(value)
          };
        } else {
          return product
        }
      });
      return {
        products: products
      };
    });
  };

  componentDidMount() {
    console.log(this.state)
  }


  submitEventHandler = () => {
    
    let config = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    }
    const validProducts = this.state.products.filter(product => product.quantity>0)
    const data = {
      products: validProducts,
      lot: this.state.lot,
      batch: this.state.batch,
      sender: this.state.sender,
      receiver: this.state.receiver
    }
    console.log(data);
    axios.post('http://localhost:5000/manufacturer/createShipment', data, config)
    .then((res) => {
      alert(res.data);
    })
    .catch((err) => {
      alert(err);
    })
  }

  render() {
    const ownedproducts = this.state.products.map((product,index) => {
      return (
        <div key={product.productid} style={{display: "flex", justifyContent: "space-between", margin: '1.5em'}}>
          <Chip label={product.productid}></Chip>
          <TextField size="small" id="quantity" label="Quantity" variant="outlined" value={product.quantity} onChange={(event)=>{
            this.inputOnChange(event.target.value, index)}} />
        </div>
      )
    }); 
    return(
      <div>
        <Typography variant="h3" style={{margin: "1em auto"}}>Enter shipment details</Typography>
        <form noValidate>
          <Grid container spacing={2}>
          <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lot"
                label="Lot number"
                name="lot"
                value={this.state.lot}
                onChange={(event) => {this.setState({lot: event.target.value})}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="batch"
                variant="outlined"
                required
                fullWidth
                id=""
                label="Batch Number"
                autoFocus
                value={this.state.batch}
                onChange={(event) => {this.setState({batch: event.target.value})}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="sender"
                label="Sender's username"
                name="sender"
                value={this.state.sender}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="receiver"
                label="Receiver's username"
                name="reciever"
                value={this.state.receiver}
                onChange={(event) => {this.setState({receiver: event.target.value})}}
              />
            </Grid>
            .
          </Grid>
          <Grid item sm={12}>
            {ownedproducts}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.submitEventHandler}
          >
            Add shipment
          </Button>
        </form>
      </div>
    );
  }
}