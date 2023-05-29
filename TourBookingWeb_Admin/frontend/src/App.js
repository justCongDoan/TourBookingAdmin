import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import UserDataTable from './components/UserDataTable';

import AddTour from './components/AddTour';
import EditTour from './components/EditTour';
import TourDataTable from './components/TourDataTable';
import Sidebar from './Sidebar/Sidebar';
import { Col, Row } from 'reactstrap';

function App() {
  return (
    // <div  class="container card mb-4 box-shadow">

    //     <div class="card-header">
    //         <h4 class="my-0 font-weight-normal">Tour Booking Web - Admin</h4>
    //     </div>

      <Row className='row g-0' style={{display: "flex", width: "100%"}}>
                <Col lg="2">
                    <Sidebar />
                </Col>
                <Col lg="10">
                    <Routes>
                      <Route path="/" element={<Navigate to="/read" />} />
                      <Route exact path="/create" element={<AddUser/>}/>
                      <Route exact path="/read" element={<UserDataTable/>}/>
                      <Route path="/edit/:id" element={<EditUser/>}/>

                      <Route exact path="/createTour" element={<AddTour/>}/>
                      <Route exact path="/readTour" element={<TourDataTable/>}/>
                      <Route path="/editTour/:id" element={<EditTour/>}/>
                    </Routes>
                </Col>
      </Row>

      

    // </div>
  );
}

export default App;
