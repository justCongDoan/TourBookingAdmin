import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const UserForm = () => {
    const baseURL = "http://localhost:8000/user";
    const navigate = useNavigate();
    const [enteredUsername, setUsername] = useState('');
    const [enteredFullName, setFullName] = useState('');
    const [enteredEmail, setEmail] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [enteredPhoneNumber, setPhoneNumber] = useState('');
    const [enteredAddress, setAddress] = useState('');
    const [enteredDateOfBirth, setDateOfBirth] = useState('');

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    };

    const fullNameChangeHandler = (event) => {
        setFullName(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.target.value);
    };

    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    };

    const dateOfBirthChangeHandler = (event) => {
        setDateOfBirth(event.target.value);
    };

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
            .post(baseURL, {
                username: enteredUsername,
                fullName: enteredFullName,
                email: enteredEmail,
                password: enteredPassword,
                phoneNumber: enteredPhoneNumber,
                address: enteredAddress,
                dateOfBirth: enteredDateOfBirth
            })
            .then((response) => {
                alert("User "+ enteredUsername +" added!");
                navigate("/read");
            })
            .catch(error => {
                alert("Error: " + error);
            });
    };

    const cancelHandler = () => {
        setUsername('');
        setFullName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setAddress('');
        setDateOfBirth('');
        navigate("/read");
    };

    return (
        <Alert variant='primary'>
        <Container>
        <Form onSubmit={submitActionHandler}>
            <Form.Group controlId="form.Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={enteredUsername} onChange={usernameChangeHandler} placeholder="Enter username" required/>
            </Form.Group>
            <Form.Group  controlId="form.FullName">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="text" value={enteredFullName} onChange={fullNameChangeHandler} placeholder="Enter full name" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={enteredEmail} onChange={emailChangeHandler} placeholder="Enter email" required/>
            </Form.Group>
            <Form.Group  controlId="form.Password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={enteredPassword} onChange={passwordChangeHandler} placeholder="Enter password" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.PhoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" value={enteredPhoneNumber} onChange={phoneNumberChangeHandler} placeholder="Enter phone number" required/>
            </Form.Group>
            <Form.Group  controlId="form.Address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={enteredAddress} onChange={addressChangeHandler} placeholder="Enter address" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.DateOfBirth">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control type="date" value={enteredDateOfBirth} onChange={dateOfBirthChangeHandler} placeholder="Enter date of birth" required/>
            </Form.Group>
            <br></br>
            <Button type='submit'>Add User</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
        </Form>

        </Container>
        </Alert>
    );
};

export default UserForm;