import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.rating} reviews`} />
        </Card.Text>

        <Card.Text as="div">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
