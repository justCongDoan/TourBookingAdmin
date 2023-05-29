import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const UserForm = () => {
    const editURL = "http://localhost:8000/tour/";
    const navigate = useNavigate();
    const param = useParams();
    const [usID, setTourID] = useState('');
    const [usTitle, setTitle] = useState('');
    const [usCity, setCity] = useState('');
    const [usAddress, setAddress] = useState('');
    const [usDistance, setDistance] = useState('');
    const [usPhoto, setPhoto] = useState('');
    const [usDesc, setDesc] = useState('');
    const [usTourItinerary, setTourItinerary] = useState('');
    const [usPrice, setPrice] = useState('');
    const [usStartDate, setStartDate] = useState('');
    const [usEndDate, setEndDate] = useState('');
    const [usMaxGroupSize, setMaxGroupSize] = useState('');
    const [usFeatured, setFeatured] = useState('');

    useEffect(() => {
        axios.get(editURL + param.id).then((response) => {
            const usData = response.data;
            setTourID(usData.id);
            setTitle(usData.username);
            setCity(usData.fullName);
            setAddress(usData.email);
            setDistance(usData.password);
            setPhoto(usData.phoneNumber);
            setDesc(usData.address);
            setTourItinerary(usData.dateOfBirth);
            setPrice(usData.dateOfBirth);
            setStartDate(usData.dateOfBirth);
            setEndDate(usData.dateOfBirth);
            setMaxGroupSize(usData.dateOfBirth);
            setFeatured(usData.dateOfBirth);
        })
        .catch(error => {
            alert("Error ocurred getting customer detail:"+ error)
        }); 
    }, []);

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const cityChangeHandler = (event) => {
        setCity(event.target.value);
    };

    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    };

    const distanceChangeHandler = (event) => {
        setDistance(event.target.value);
    };

    const photoChangeHandler = (event) => {
        setPhoto(event.target.value);
    };

    const descChangeHandler = (event) => {
        setDesc(event.target.value);
    };

    const tourItineraryChangeHandler = (event) => {
        setTourItinerary(event.target.value);
    };

    const priceChangeHandler = (event) => {
        setPrice(event.target.value);
    };

    const startDateChangeHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateChangeHandler = (event) => {
        setEndDate(event.target.value);
    };

    const maxGroupSizeChangeHandler = (event) => {
        setMaxGroupSize(event.target.value);
    };

    const featuredChangeHandler = (event) => {
        setFeatured(event.target.value);
    };

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
            .put(editURL + param.id, {
                id: usID,
                title: usTitle,
                city: usCity,
                address: usAddress,
                distance: usDistance,
                photo: usPhoto,
                desc: usAddress,
                tourItinerary: usTourItinerary,
                price: usPrice,
                startDate: usStartDate,
                endDate: usEndDate,
                maxGroupSize: usMaxGroupSize,
                featured: usFeatured
            })
            .then((response) => {
                alert("Tour "+ usTitle +" updated!");
                navigate("/read");
            })
            .catch(error => {
                alert("Error ocurred updating customer: " + error);
            });
    };

    return (
        <Alert variant='primary'>
        <Container>
        <Form onSubmit={submitActionHandler} id='data'>
            <Form.Group  controlId="form.id">
                <Form.Label>Id</Form.Label>
                <Form.Control value={usID} readonly='readonly'/>
            </Form.Group>
            <Form.Group controlId="form.Username">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={usTitle} onChange={titleChangeHandler} required/>
            </Form.Group>
            <Form.Group  controlId="form.FullName">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={usCity} onChange={cityChangeHandler} required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Email">
                <Form.Label>Address</Form.Label>
                <Form.Control type="email" value={usAddress} onChange={addressChangeHandler} required/>
            </Form.Group>
            <Form.Group  controlId="form.Password">
                <Form.Label>Distance</Form.Label>
                <Form.Control type="password" value={usDistance} onChange={distanceChangeHandler} required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Photo">
                <Form.Label>Photo</Form.Label>
                <br></br>
                <Form.Label>Upload your photo</Form.Label>
                <br></br>
                <Form.Label className='uploadTourPhotoButton' htmlFor='file'>Choose File</Form.Label>
                <Form.Control type='file' id='file' style={{display: 'none'}} accept='image/jpg, image/jpeg, image/png' value={usPhoto}/>
            </Form.Group>
            <Form.Group  controlId="form.Address">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={usDesc} onChange={descChangeHandler} required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.DateOfBirth">
                <Form.Label>Itinerary</Form.Label>
                <Form.Control type="text" value={usTourItinerary} onChange={tourItineraryChangeHandler} required/>
            </Form.Group>
            <Form.Group controlId="form.DateOfBirth">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={usPrice} onChange={priceChangeHandler} required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.PhoneNumber">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="text" value={usStartDate} onChange={startDateChangeHandler} required/>
            </Form.Group>
            <Form.Group  controlId="form.Address">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="text" value={usEndDate} onChange={endDateChangeHandler} required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.PhoneNumber">
                <Form.Label>Max Group Size</Form.Label>
                <Form.Control type="text" value={usMaxGroupSize} onChange={maxGroupSizeChangeHandler} required/>
            </Form.Group>
            <Form.Group  controlId="form.Address">
                <Form.Label>Featured?</Form.Label>
                <Form.Control type="text" value={usFeatured} onChange={featuredChangeHandler} required/>
            </Form.Group>
            <br></br>
            <Button type='submit'>Update User</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type='submit' onClick={()=>navigate("/readTour")}>Cancel</Button>
        </Form>

        </Container>
        </Alert>
    );
};

export default UserForm;