import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";
import FromContainer from "../components/FromContainer";

const ProductEditScreen = ({ match }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
      console.log(product, productId);
    } else {
      setPrice(product.price);
      setName(product.name);
      setImage(product.image);
      setCategory(product.category);
      setBrand(product.brand);
      setDescription(product.dscription);
      setCountInStock(product.countInStock);
      setRating(product.rating);
      setNumReviews(product.numReviews);
    }
  }, [dispatch, productId, product]);

  const handelSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FromContainer>
        <h1>Edit User</h1>
        {/*  {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate} </Message>} */}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handelSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>image</Form.Label>
            <Form.Control
              type="text"
              placeholder="image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>category</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="rating">
            <Form.Label>rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="enter rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="numReviews">
            <Form.Label>numReviews</Form.Label>
            <Form.Control
              type="number"
              placeholder="enter numReviews"
              value={numReviews}
              onChange={(e) => setNumReviews(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>countInStock</Form.Label>
            <Form.Control
              type="number"
              placeholder="enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>description</Form.Label>
            <Form.Control
              type="number"
              placeholder="enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FromContainer>
    </>
  );
};

export default ProductEditScreen;
