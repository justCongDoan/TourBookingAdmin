import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import viewIcon from "./../assets/view.png";
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";

const UserDataTable = () => {
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000";
    const [bookings, setBookings] = useState([]);

    const setBookingData = () => {
        axios.get(baseURL + "/bookings").then((response) => {
            setBookings(response.data);
        }).catch(error => {
            alert("Error Ocurred while loading data: " + error);
        });
    };

    useEffect(() => {
        setBookingData();
    }, []);

    const removeBooking = (id) => {
        axios.delete(baseURL + "/booking/" + id).then((response) => {
            alert("Booking record " + id + " deleted!");
            setBookingData();
            navigate('/readBooking');
        }).catch(error => {
            alert("Error Ocurred in removeBooking:" + error);
        });
    }

    const removeAllUser = (id) => {
        axios.delete(baseURL + "/users").then((response) => {
            alert("All bookings deleted!");
            setBookingData();
            navigate('/readBooking');
        }).catch(error => {
            alert("Error Ocurred in removeBooking:" + error);
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
                Create New Booking
                </button>
            </nav>


            <br></br>
            <div className="col-md-6">
                <h4>Bookings List</h4>

                <div class="container">
                <div class="row">
                    <div class="col-12">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Tour name</th>
                            <th>Full name</th>
                            <th>Guest name</th>
                            <th>Phone</th>
                            <th>Book at</th>
                            <th scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            bookings &&
                            bookings.map((booking, index) => (

                            <tr>
                                <th scope="row">{booking.id}</th>
                                <td>{booking.userEmail}</td>
                                <td>{booking.tourName}</td>
                                <td>{booking.fullName}</td>
                                <td>{booking.guestSize}</td>
                                <td>{booking.phone}</td>
                                <td>{booking.bookAt}</td>

                                <td >

                                <Link to={"/editBooking/" + booking.id}><img src={viewIcon} alt="Edit" width="50" height="30" title="Edit" />
                                </Link>


                                <button
                                    onClick={() => removeBooking(booking.id)} className="button"
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