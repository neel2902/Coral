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
        axios.get('http://localhost:5000/retailer/getCompletedOrders', config)
        .then((result) => {
            
            let orderarray = [];
            if (typeof(result.data) != 'string') {
                orderarray = result.data;
            }
            this.setState({
                orders : orderarray
            })
        })
        .catch (err => {
            alert(err);
        })
    }

    render () {
        let orders=[];
        console.log(orders);
        console.log(this.state.orders.length);
        if (this.state.orders.length > 0) {
            orders = this.state.orders.map(order => {
                return (
                <TableRow key={order.id}>
                <TableCell component="th" align="center" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="center">{order.date}</TableCell>
                <TableCell align="center">{order.lot}</TableCell>
                <TableCell align="center">{order.batch}</TableCell>
                <TableCell align="center">{order.sender}</TableCell>
              </TableRow> )
            })
        }
        else {
            orders= <Typography>You have not received any orders</Typography>
        }
        return (
            <React.Fragment>
            <Typography variant="h2" style={{textAlign: 'center', margin: '1em 0 0 '}}>Your orders</Typography> 
            <TableContainer component={Paper} style={{width: '50%', margin: '5em auto'}}>
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell align="center">Order ID</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Lot Number</TableCell>
                    <TableCell align="center">Batch Number</TableCell>
                    <TableCell align="center">Sender</TableCell>
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
