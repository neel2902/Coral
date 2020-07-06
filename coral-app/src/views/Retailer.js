import React, { Component } from 'react';
import axios from 'axios';
import {Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper, Typography} from '@material-ui/core';



class Retailer extends Component {

    state = {
        orders: []
    }
    
    componentDidMount() {
        let config = {
            headers : {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        }
        axios.get('http://localhost:5000/retailer/getOrders', config)
        .then((result) => {
            const orderarray = result.data;
            this.setState({
                orders : orderarray
            })
        })
        .catch (err => {
            alert(err);
        })
    }

    render () {
        const orders = this.state.orders.map(order => {
            return (
            <TableRow key={order.upc}>
            <TableCell component="th" align="center" scope="row">
              {order.id}
            </TableCell>
            <TableCell align="center">{order.productname}</TableCell>
            <TableCell align="center">{order.upc}</TableCell>
            <TableCell align="center">{order.lot}</TableCell>
            <TableCell align="center">{order.batch}</TableCell>
            <TableCell align="center">{order.manufacturer}</TableCell>
            <TableCell align="center">{order.distributor}</TableCell>
          </TableRow> )
        })
        return (
            <React.Fragment>
            <Typography variant="h2" style={{textAlign: 'center', margin: '1em 0 0 '}}>Your orders</Typography> 
            <TableContainer component={Paper} style={{width: '50%', margin: '5em auto'}}>
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell align="center">Order ID</TableCell>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">UPC</TableCell>
                    <TableCell align="center">Lot Number</TableCell>
                    <TableCell align="center">Batch Number</TableCell>
                    <TableCell align="center">Manufacturer</TableCell>
                    <TableCell align="center">Distributor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders}
                </TableBody>
                </Table>
            </TableContainer>
            </React.Fragment>
        )
    }
}

export default Retailer;
