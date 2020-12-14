import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {ListUsers} from '../actions/userActions'

const UserListScreen = () => {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading , users , error} = userList
    const deleteHandler = (id) =>{
        console.log('user deleted')
    }
useEffect(()=>{
    dispatch(ListUsers())
},[dispatch])
    return (
        <>
            <h2>Users List</h2>
            {loading ? <Loader /> :  error ? <Message variant="danger">{error} </Message>:(
                    <Table className="table-sm" striped bordered hover responsive >
                        <thead> <tr>
                            <th>ID</th>                            
                            <th>NAME</th>                            
                            <th>EMAIL</th>                            
                            <th>ADMIN</th>                            
                            <th></th>                            
                        </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} >
                                    <td>{user._id} </td>
                                    <td>{user.name} </td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a> </td>
                                    <td> {user.isAdmin ?<i className="fas fa-check" style={{color:"green"}} /> :<i className="fas fa-times" style={{color:"red"}} /> } </td>
                                    <td> 
                                        <LinkContainer to={`/user/${user._id}/edit`} >
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        </LinkContainer>
                                        <Button variant='light' className='btn-sm' onClick={()=> deleteHandler(user._id)}>
                                            <i className='fas fa-trash'/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            )}
        </>
    )
}

export default UserListScreen
