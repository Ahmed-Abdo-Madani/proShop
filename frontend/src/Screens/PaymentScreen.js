import React, { useState, useEffect } from "react";
import { Button, Col,Row,Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { savePaymentMethod } from "../actions/cartActions";
import { payOrderMethods } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const orderPayMethod = useSelector((state) => state.orderPayMethod);
  const { loading,error, success, methods } = orderPayMethod;
  const { shippingAddress } = cart;
  console.log(methods)
  const [paymentMethod, setPaymentMethod] = useState("");
  
  if (!shippingAddress) {
    history.push("/shipping");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      payOrderMethods({
        InvoiceAmount: cart.totalPrice,
        CurrencyIso: "SAR",
      })
      );
      
    }, [dispatch, cart]);
    
    const paymentMethodHandler = (method) => {
      dispatch(savePaymentMethod(method.PaymentMethodEn));
    history.push("/placeorder");
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
        <Row>
          {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message>: methods && methods.map(m =>(
            <Col key={m.PaymentMethodId} md={3}>
              <Button type='button' variant='outline-info' onClick={()=>paymentMethodHandler(m)}>
                <Image src={m.ImageUrl} alt={m.PaymentMethodEn} fluid/>
              </Button>
            </Col>
          )) }
        </Row>
    </>
  );
};

export default PaymentScreen;



{/* <FromContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Creadit card"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="My Fatoora"
              id="myFatoora"
              name="paymentMethod"
              value="myFatoora"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FromContainer> */}