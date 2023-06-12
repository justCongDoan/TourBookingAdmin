import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert, Image } from 'react-bootstrap';

const UserForm = () => {
    const baseURL = "http://localhost:8000/tour";
    const navigate = useNavigate();
    const [enteredTitle, setTitle] = useState('');
    const [enteredCity, setCity] = useState('');
    const [enteredAddress, setAddress] = useState('');
    const [enteredDistance, setDistance] = useState('');
    const [enteredPhoto, setPhoto] = useState({photo: ""});
    const [enteredDesc, setDesc] = useState('');
    const [enteredTourItinerary, setTourItinerary] = useState('');
    const [enteredPrice, setPrice] = useState('');
    const [enteredStartDate, setStartDate] = useState('');
    const [enteredEndDate, setEndDate] = useState('');
    const [enteredMaxGroupSize, setMaxGroupSize] = useState('');
    const [enteredFeatured, setFeatured] = useState('');

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

    // const photoChangeHandler = (event) => {
    //     setPhoto(event.target.value);
    // };

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

    const handleUpload = async (e) => {
        // console.log(e.target.files);
        // setPhoto(URL.createObjectURL(e.target.files[0]));
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setPhoto({ ...enteredPhoto, photo : base64 });
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
            .post(baseURL, {
                // username: enteredUsername,
                title: enteredTitle,
                city: enteredCity,
                address: enteredAddress,
                distance: enteredDistance,
                photo: enteredPhoto.photo,
                desc: enteredDesc,
                tourItinerary: enteredTourItinerary,
                price: enteredPrice,
                startDate: enteredStartDate,
                endDate: enteredEndDate,
                maxGroupSize: enteredMaxGroupSize,
                featured: enteredFeatured
            })
            .then((response) => {
                alert("Tour "+ enteredTitle +" added!");
                navigate("/read");
            })
            .catch(error => {
                alert("Error: " + error);
            });
    };

    const cancelHandler = () => {
        // setUsername('');
        navigate("/readTour");
    };

    return (
        <Alert variant='primary'>
        <Container>
        <Form onSubmit={submitActionHandler}>
            <Form.Group controlId="form.Title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={enteredTitle} onChange={titleChangeHandler} placeholder="Enter username" required/>
            </Form.Group>
            <Form.Group  controlId="form.City">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={enteredCity} onChange={cityChangeHandler} placeholder="Enter full name" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={enteredAddress} onChange={addressChangeHandler} placeholder="Enter email" required/>
            </Form.Group>
            <Form.Group  controlId="form.Distance">
                <Form.Label>Distance</Form.Label>
                <Form.Control type="number" value={enteredDistance} onChange={distanceChangeHandler} placeholder="Enter password" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Photo">
                <Form.Label>Photo</Form.Label>
                <br></br>
                <Form.Label>Upload your photo</Form.Label>
                <br></br>
                <Form.Label className='uploadTourPhotoButton' htmlFor='file'>Choose File</Form.Label>
                <Form.Control type='file' id='file' style={{display: 'none'}} accept='image/jpg, image/jpeg, image/png' onChange={handleUpload}/>
            </Form.Group>
            <br></br>
            <Image id='tourPhoto' className='tour__img' src={enteredPhoto.photo} alt='Tour Image'/>
            <br></br>
            <Form.Group  controlId="form.Description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" value={enteredDesc} onChange={descChangeHandler} placeholder="Enter description" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Itinerary">
                <Form.Label>Itinerary</Form.Label>
                <Form.Control as="textarea" value={enteredTourItinerary} onChange={tourItineraryChangeHandler} placeholder="Enter itinerary" required/>
            </Form.Group>
            <br></br>
            <Form.Group  controlId="form.Price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" value={enteredPrice} onChange={priceChangeHandler} placeholder="Enter price" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.StartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" value={enteredStartDate} onChange={startDateChangeHandler} placeholder="Enter start date" required/>
            </Form.Group>
            <br></br>
            <Form.Group  controlId="form.EndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" value={enteredEndDate} onChange={endDateChangeHandler} placeholder="Enter end date" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.MaxGroupSize">
                <Form.Label>Max Group Size</Form.Label>
                <Form.Control type="number" value={enteredMaxGroupSize} onChange={maxGroupSizeChangeHandler} placeholder="Enter max group size" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="form.Featured">
                <Form.Label>Featured</Form.Label>
                {/* <Form.Control type="text" value={enteredFeatured} onChange={featuredChangeHandler} placeholder="Enter date of birth" required/> */}
                <Form.Select value={enteredFeatured} onChange={featuredChangeHandler} aria-label="Default select example">
                    <option>Select Option</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                </Form.Select>
            </Form.Group>
            <br></br>
            <Button type='submit'>Add Tour</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
        </Form>

        </Container>
        </Alert>
    );
};

export default UserForm;

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}