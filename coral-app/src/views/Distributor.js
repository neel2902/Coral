import React, { useState, useEffect, Component} from 'react';
import {Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Chip, Paper, TableHead, TableBody, TableContainer, TableRow, Table, TableCell} from '@material-ui/core';
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

export default function Distributor(props) {

  //modal code here
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [productList, setProductList] = useState('');
  const [orders, setOrders] = useState([]);
  const ownusername = props.username;
  const token = sessionStorage.getItem('token');



  useEffect(()=>{
    let config = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    }
    axios.get('http://localhost:5000/distributor/getProducts', config)
    .then((res) => {
      console.log(res.data.products);
      const products = res.data.products.map(product => {
        return {
          productid: product.productid,
          shipmentid: product.shipmentid,
          quantity: 0
        }
      });
      setProductList(products);
    })
    .catch((err) => {
      console.log(err);
    });


    axios.get('http://localhost:5000/distributor/getCompletedOrders', config)
    .then((res) => {
      setOrders(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);


  const logger = () => {
    console.log(orders);
  }

  return (
    <Grid container>
      <CssBaseline />
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
              <Grid item xs={12} style={{margin: '2em 0'}}>
                  <OrderComponent orders={orders} />
              </Grid>
            </Grid>
          </div>
        </Grid>
    </Grid>
  );
}


class OrderComponent extends Component {
  render() {
    let orderrows = this.props.orders.map(order => {
      return (
        <TableRow key={order.id}>
        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell>{order.lot}</TableCell>
        <TableCell>{order.batch}</TableCell>
        <TableCell>{order.date}</TableCell>
      <TableCell>{order.sender}</TableCell>
      </TableRow>
      );
    })
  return (
  <React.Fragment>
    <TableContainer component={Paper}>
    <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Shipment ID</TableCell>
        <TableCell>Lot Number</TableCell>
        <TableCell>Batch Number</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Sender</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {orderrows}
      </TableBody>
      </Table>
      </TableContainer>
  </React.Fragment>
)
}}



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
    if(validProducts.length == 0) {
      alert("Please add quantity of to be shipped drug!");
      return;
    }
    const data = {
      products: validProducts,
      lot: this.state.lot,
      batch: this.state.batch,
      sender: this.state.sender,
      receiver: this.state.receiver
    }
    console.log(data);
    axios.post('http://localhost:5000/distributor/createShipment', data, config)
    .then((res) => {
      alert(res.data);
      window.location.reload();
    })
    .catch((err) => {
      alert(err);
    })
  }

  render() {
    const ownedproducts = this.state.products.map((product,index) => {
      return (
        <div key={product.productid} style={{display: "flex", justifyContent: "space-between", margin: '1.5em'}}>
          <Chip label={product.productid} />
          <Chip label={"Shipment "+product.shipmentid} />
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