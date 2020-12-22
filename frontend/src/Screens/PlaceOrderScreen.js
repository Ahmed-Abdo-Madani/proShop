import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder, sendPayment } from "../actions/orderActions";
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const orderSendPayment = useSelector((state) => state.orderSendPayment);
  const { loading, error:errorPayment,success:successPayment, paymentDetails } = orderSendPayment;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        itemsPrice: cart.itemsPrice,
        paymentMethod: cart.paymentMethod || 'myfatoora',
        shippingAddress: cart.shippingAddress,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })

    );

    dispatch(sendPayment({
      "CustomerName": "Ahmed",
      "NotificationOption": "sms",
      "MobileCountryCode": "+966",
      "CustomerMobile": "545983410",
      "CustomerEmail": "doni.des.ni@gmail.com",
      "InvoiceValue": 1000,
      "DisplayCurrencyIso": "SAR",
      "CallBackUrl": "https://givtapp.herokuapp.com/",
      "ErrorUrl": "https://givtapp.herokuapp.com/",
      "Language": "EN",
      "CustomerReference": "Mr",
      "CustomerCivilId": "0123456789",
      "UserDefinedField": "string",
      "CustomerAddress": {
        "Block": "13",
        "Street": "Harun Al Rasheed",
        "HouseBuildingNo": "4339",
        "Address": "4267-4297 Harun Al Rasheed, Al Aziziyah",
        "AddressInstructions": "after othaim supermarket"
      },
      "ExpiryDate": "2020-12-23T07:54:37.072Z",
      "SupplierCode": 0,
      "SupplierValue": 0,
      "InvoiceItems": [
        {
          "ItemName": "iphone12",
          "Quantity": 1,
          "UnitPrice": 1000,
          "Weight": 1.2,
          "Width": 7,
          "Height": 14,
          "Depth": 1
        }
      ]
     
    }))
  };


  useEffect(() => {
    if (success && successPayment) {
      history.push(`/orders/${order._id}`);
      
    }
    // eslint-disable-next-line
  }, [success, successPayment,history]);
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // calculate Prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address} ,{cart.shippingAddress.city} ,
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item> */}
            <ListGroup.Item>
              <h2>Cart Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summery</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col> ${cart.itemsPrice} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col> ${cart.taxPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col> ${cart.shippingPrice} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col> ${cart.totalPrice} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant="danger">
                    Order didn`t went through, Message: "{error}"
                  </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
