import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const BookingForm = () => {
    const editURL = "http://localhost:8000/booking/";
    const navigate = useNavigate();
    const param = useParams();
    const [usID, setCusID] = useState('');
    const [usUserID, setUserID] = useState('');
    const [usEmail, setEmail] = useState('');
    const [usTourName, setTourName] = useState('');
    const [usFullName, setFullName] = useState('');
    const [usGuestSize, setGuestSize] = useState('');
    const [usPhone, setPhone] = useState('');
    const [usBookAt, setBookAt] = useState('');

    useEffect(() => {
        axios.get(editURL + param.id).then((response) => {
            const usData = response.data;
            setCusID(usData.id);
            setUserID(usData.userId)
            setEmail(usData.userEmail);
            setTourName(usData.tourName);
            setFullName(usData.fullName);
            setGuestSize(usData.guestSize);
            setPhone(usData.phone);
            setBookAt(usData.bookAt);
        })
        .catch(error => {
            alert("Error ocurred getting customer detail:"+ error)
        }); 
    }, []);

    const userIDChangeHandler = (event) => {
        setUserID(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const tourNameChangeHandler = (event) => {
        setTourName(event.target.value);
    };

    const fullNameChangeHandler = (event) => {
        setFullName(event.target.value);
    };

    const guestSizeChangeHandler = (event) => {
        setGuestSize(event.target.value);
    };

    const phoneChangeHandler = (event) => {
        setPhone(event.target.value);
    };

    const bookAtChangeHandler = (event) => {
        setBookAt(event.target.value);
    };

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
            .put(editURL + param.id, {
                id: usID,
                userId: usUserID,
                userEmail: usEmail,
                tourName: usTourName,
                fullName: usFullName,
                guestSize: usGuestSize,
                phone: usPhone,
                bookAt: usBookAt
            })
            .then((response) => {
                alert("Booking "+ usID +" updated!");
                navigate("/readBooking");
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
            <Form.Group  controlId="form.id">
                <Form.Label>User's Id</Form.Label>
                <Form.Control value={usUserID} readonly='readonly'/>
            </Form.Group>
            <Form.Group controlId="form.Username">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={usEmail} onChange={emailChangeHandler} readonly='readonly' required/>
            </Form.Group>
            <Form.Group  controlId="form.FullName">
                <Form.Label>Tour name</Form.Label>
                <Form.Control type="text" value={usTourName} onChange={tourNameChangeHandler} readonly='readonly' required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Email">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="text" value={usFullName} onChange={fullNameChangeHandler} readonly='readonly' required/>
            </Form.Group>
            <Form.Group  controlId="form.Password">
                <Form.Label>Guest size</Form.Label>
                <Form.Control type="number" value={usGuestSize} onChange={guestSizeChangeHandler} readonly='readonly' required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.PhoneNumber">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" value={usPhone} onChange={phoneChangeHandler} readonly='readonly' required/>
            </Form.Group>
            <Form.Group  controlId="form.Address">
                <Form.Label>Book at</Form.Label>
                <Form.Control type="date" value={usBookAt} onChange={bookAtChangeHandler} readonly='readonly' required/>
            </Form.Group>
            <br></br>
            {/* <Button type='submit'>Update Booking</Button> */}
            &nbsp;&nbsp;&nbsp;
            <Button type='submit' onClick={()=>navigate("/readBooking")}>Cancel</Button>
        </Form>

        </Container>
        </Alert>
    );
};

export default BookingForm;