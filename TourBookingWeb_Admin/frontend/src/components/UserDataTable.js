import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";

const UserDataTable = () => {
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000";
    const [users, setUsers] = useState([]);

    const setUserData = () => {
        axios.get(baseURL + "/users").then((response) => {
            setUsers(response.data);
        }).catch(error => {
            alert("Error Ocurred while loading data: " + error);
        });
    };

    useEffect(() => {
        setUserData();
    }, []);

    const removeUser = (id) => {
        axios.delete(baseURL + "/user/" + id).then((response) => {
            alert("User record " + id + " deleted!");
            setUserData();
            navigate('/read');
        }).catch(error => {
            alert("Error Ocurred in removeUser:" + error);
        });
    }

    const removeAllUser = (id) => {
        axios.delete(baseURL + "/users").then((response) => {
            alert("All Users deleted!");
            setUserData();
            navigate('/read');
        }).catch(error => {
            alert("Error Ocurred in removeUser:" + error);
        });
    }

    return (
        <div class="card-body">
            <br>
            </br>
            <nav>
                <button
                className="btn btn-primary nav-item active"
                onClick={() => navigate("/create")}>
                Create New User
                </button>
            </nav>


            <br></br>
            <div className="col-md-6">
                <h4>Users List</h4>

                <div class="container">
                <div class="row">
                    <div class="col-12">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>Date of birth</th>
                            <th scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            users &&
                            users.map((user, index) => (

                            <tr>
                                <th scope="row">{user.id}</th>
                                <td>{user.username}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.address}</td>
                                <td>{user.dateOfBirth}</td>

                                <td >

                                <Link to={"/edit/" + user.id}><img src={editIcon} alt="Edit" width="50" height="30" title="Edit" />
                                </Link>


                                <button
                                    onClick={() => removeUser(user.id)} className="button"
                                > <img src={deleteIcon} alt="Remove" title="Remove" width="30" height="30" />
                                </button>

                                </td>
                            </tr>

                            ))
                        }

                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                <button className="btn btn-sm btn-danger"
                onClick={() => removeAllUser()}>
                Remove All
                </button>
            </div>

    </div>
    );
};

export default UserDataTable;