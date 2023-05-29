import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";

const TourDataTable = () => {
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000";
    const [tours, setTours] = useState([]);

    const setTourData = () => {
        axios.get(baseURL + "/tours").then((response) => {
            setTours(response.data);
        }).catch(error => {
            alert("Error Ocurred while loading data: " + error);
        });
    };

    useEffect(() => {
        setTourData();
    }, []);

    const removeTour = (id) => {
        axios.delete(baseURL + "/tour/" + id).then((response) => {
            alert("Tour record " + id + " deleted!");
            setTourData();
            navigate('/readTour');
        }).catch(error => {
            alert("Error Ocurred in removeTour:" + error);
        });
    }

    const removeAllUser = (id) => {
        axios.delete(baseURL + "/tours").then((response) => {
            alert("All Tours deleted!");
            setTourData();
            navigate('/readTour');
        }).catch(error => {
            alert("Error Ocurred in removeTour:" + error);
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
                Create New Tour
                </button>
            </nav>


            <br></br>
            <div className="col-md-6">
                <h4>Tours List</h4>

                <div class="container">
                <div class="row">
                    <div class="col-12">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Distance</th>
                            <th>Description</th>
                            <th>Itinerary</th>
                            <th>Price</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Max Group Size</th>
                            <th>Featured</th>
                            <th scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            tours &&
                            tours.map((tour, index) => (

                            <tr>
                                <th scope="row">{tour.id}</th>
                                <td>{tour.title}</td>
                                <td>{tour.city}</td>
                                <td>{tour.address}</td>
                                <td>{tour.distance}</td>
                                <td>{tour.desc}</td>
                                <td>{tour.tourItinerary}</td>
                                <td>{tour.price}</td>
                                <td>{tour.startDate}</td>
                                <td>{tour.endDate}</td>
                                <td>{tour.maxGroupSize}</td>
                                <td>{tour.featured}</td>

                                <td >

                                <Link to={"/editTour/" + tour.id}><img src={editIcon} alt="Edit" width="50" height="30" title="Edit" />
                                </Link>


                                <button
                                    onClick={() => removeTour(tour.id)} className="button"
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

export default TourDataTable;