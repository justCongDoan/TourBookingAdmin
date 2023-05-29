import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const UserForm = () => {
    const editURL = "http://localhost:8000/user/";
    const navigate = useNavigate();
    const param = useParams();
    const [usID, setCusID] = useState('');
    const [usUsername, setUsername] = useState('');
    const [usFullName, setFullName] = useState('');
    const [usEmail, setEmail] = useState('');
    const [usPassword, setPassword] = useState('');
    const [usPhoneNumber, setPhoneNumber] = useState('');
    const [usAddress, setAddress] = useState('');
    const [usDateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
        axios.get(editURL + param.id).then((response) => {
            const usData = response.data;
            setCusID(usData.id);
            setUsername(usData.username);
            setFullName(usData.fullName);
            setEmail(usData.email);
            setPassword(usData.password);
            setPhoneNumber(usData.phoneNumber);
            setAddress(usData.address);
            setDateOfBirth(usData.dateOfBirth);
        })
        .catch(error => {
            alert("Error ocurred getting customer detail:"+ error)
        }); 
    }, []);

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
            .put(editURL + param.id, {
                id: usID,
                username: usUsername,
                fullName: usFullName,
                email: usEmail,
                password: usPassword,
                phoneNumber: usPhoneNumber,
                address: usAddress,
                dateOfBirth: usDateOfBirth
            })
            .then((response) => {
                alert("User "+ usUsername +" updated!");
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
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={usUsername} onChange={usernameChangeHandler} placeholder="Enter username" required/>
            </Form.Group>
            <Form.Group  controlId="form.FullName">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="text" value={usFullName} onChange={fullNameChangeHandler} placeholder="Enter full name" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={usEmail} onChange={emailChangeHandler} placeholder="Enter email" required/>
            </Form.Group>
            <Form.Group  controlId="form.Password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={usPassword} onChange={passwordChangeHandler} placeholder="Enter password" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.PhoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" value={usPhoneNumber} onChange={phoneNumberChangeHandler} placeholder="Enter phone number" required/>
            </Form.Group>
            <Form.Group  controlId="form.Address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={usAddress} onChange={addressChangeHandler} placeholder="Enter address" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.DateOfBirth">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control type="text" value={usDateOfBirth} onChange={dateOfBirthChangeHandler} placeholder="Enter date of birth" required/>
            </Form.Group>
            <br></br>
            <Button type='submit'>Update User</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type='submit' onClick={()=>navigate("/read")}>Cancel</Button>
        </Form>

        </Container>
        </Alert>
    );
};

export default UserForm;