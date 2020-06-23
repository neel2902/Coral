import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import './Home.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { FormGroup } from '@material-ui/core';


 
class QRreader extends Component {
  state = {
    result: 'No result'
  }
 
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}


const Home = () => {

    const [productid, setProductid] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [modalData, setModalData] = useState({});


    const getProductDetails = () => {

        axios.post('http://localhost:5000/getData', {
            upc: productid
        })
            .then(res => {
                setShow(true);
                console.log(res.data);

                setModalData({
                    productID: res.data.upc,
                    manufacturer: res.data.manufacturer,
                    distributor: res.data.distributor,
                    retailer: res.data.retailer,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="row1">
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Drug Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                modalData.productID ?
                <div>
            <h1 className="my-5">Your drug is verified!</h1>
            <table className="my-5" style={{width: '100%'}}>
                <tr>
                    <th>Product ID</th>
                    <th>Manufacturer</th>
                    <th>Distributor</th>
                    <th>Retailer</th>
                </tr>
                <tr>
                    <td>{modalData.productID}</td>
                    <td>{modalData.manufacturer}</td>
                    <td>{modalData.distributor}</td>
                    <td>{modalData.retailer}</td>
                </tr>
            </table>
            </div> : <h1 className="text-danger">This product is not verified and is possibly counterfeit!</h1>
            }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
            <div className="left">
                <h1>Coral</h1>
                <h2>A decentralised application to detect counterfeit drugs</h2>
                <div className="my-5">
                    <Form.Group style={{flexDirection: 'row'}} >
                        <Form.Control type="text" placeholder="Product ID" onChange={(event)=> {setProductid(event.target.value)}} value={productid} className="w-25 mr-3" style={{display: 'inline-block'}}/>
                        <Button onClick={getProductDetails} variant="success">Get info</Button>
                    </Form.Group>
                </div>
                <div className="qr">
                    <h2>Scan QR</h2>
                    <QRreader />
                </div>
            </div>
            <div className="right">
                <h4>
                <a href='/signup' className="homelinks">Sign up</a> or <a href='/login' className="homelinks">Login</a> to ensure your products are verified<br />every step of the way.
                </h4>
            </div>
        </div>
    )
}





export default Home;