import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { payOrderMethods } from "../actions/orderActions";
import FromContainer from "../components/FromContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import axios from "axios";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const orderPayMethod = useSelector((state) => state.orderPayMethod);
  const { loading, success, methods } = orderPayMethod;
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      payOrderMethods({
        InvoiceAmount: cart.totalPrice,
        CurrencyIso: "SAR",
      })
    );
  }, [dispatch, cart]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FromContainer>
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
    </FromContainer>
  );
};

export default PaymentScreen;
