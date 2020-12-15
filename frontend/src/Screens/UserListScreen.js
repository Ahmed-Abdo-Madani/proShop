import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { ListUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success, error: errorDelete } = userDelete;

  const deleteHandler = (userId) => {
    if (window.confirm("are you sure ?")) {
      dispatch(deleteUser(userId));
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(ListUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, success]);
  return (
    <>
      <h2>Users List</h2>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id} </td>
                <td>{user.name} </td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }} />
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="light"
                    className="btn-sm"
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteHandler(user._id)}
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
