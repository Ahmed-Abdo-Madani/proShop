import React, { useEffect, useState } from "react";
import {Table, Form, Button, Row, Col } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import {getUserOrdersList} from '../actions/orderActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  
  const userOrdersList = useSelector((state) => state.userOrdersList);
   const { loadgin:loadingOrder , orders , error:errorOrders } = userOrdersList;
  //const orders = []

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getUserOrdersList());
        
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);
  
  const handelSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not macth");
    } else {
       dispatch(updateUserProfile({id:user._id,name, email, password}));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated.</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handelSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="enter name address"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrder ? <Loader/> :errorOrders ? <Message variant='danger'>{errorOrders} </Message> :(
          <Table striped hover bordered responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id} </td>
                  <td>{order.createdAt.substring(0,10)} </td>
                  <td>{order.totalPrice} </td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10): (<i className='fas fa-times' style={{color:'red'}} />)} </td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0,10): (<i className='fas fa-times' style={{color:'red'}} />)} </td>
                  <td><LinkContainer to={`/orders/${order._id}`}>
                    <Button variant="light">Details</Button>
                    </LinkContainer> </td>
                </tr>
              ))}
            </tbody>

          </Table>
        ) }
      </Col>
    </Row>
  );
};

export default RegisterScreen;
