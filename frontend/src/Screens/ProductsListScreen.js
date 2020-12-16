import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct } from "../actions/productActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {loading:loadingDelete,error:errorDelete, success:successDelete } = productDelete;

  const deleteHandler = (productId) => {
    if (window.confirm("are you sure ?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const creatProductHandler = () => {
    console.log("new Product");
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Products List</h2>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={creatProductHandler}>
            <i className="fas fa-plus" /> Creat Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete} </Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error} </Message>
      ) : (
        <Table className="table-sm" striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>$PRICE</th>
              <th>IN STOCK</th>
              <th>REVIEWS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id} </td>
                <td>{product.name} </td>
                <td>{product.category} </td>
                <td>{product.brand} </td>
                <td>$ {product.price}</td>
                <td>
                  {product.countInStock > 0
                    ? product.countInStock
                    : "Out Of Stock"}
                </td>
                <td>{product.rating}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="light"
                    className="btn-sm"
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash" style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
