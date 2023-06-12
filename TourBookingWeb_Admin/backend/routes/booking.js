var express = require('express');
const connection = require('../config/database-config');
const booking = require('../models/booking');
var router = express.Router();

// get all bookings
router.get('/bookings', async (req, resp, next) => {
    try {
        const bookings = await booking.find();
        var records = [];

        bookings.forEach(us => {
            if(us) {
                const bookingRecord = {
                    id: us._id,
                    userId: us.userId,
                    userEmail: us.userEmail,
                    tourName: us.tourName,
                    fullName: us.fullName,
                    guestSize: us.guestSize,
                    phone: us.phone,
                    bookAt: us.bookAt
                };
                records.push(bookingRecord);
            }
        });

        resp.json(records);
    } catch (error) {
        next(error);
    }
});

/* Get booking based on id*/
router.get('/booking/:id', async (req, resp, next) => {
    try {
        const us = await booking.findById(req.params.id);

        resp.json({
            id: us._id,
            userId: us.userId,
            userEmail: us.userEmail,
            tourName: us.tourName,
            fullName: us.fullName,
            guestSize: us.guestSize,
            phone: us.phone,
            bookAt: us.bookAt
        });
    } catch (error) {
        next(error);
    }
});

/* Edit existing booking based on id*/
router.put('/booking/:id', async (req, resp, next) => {

    try {
        const requestBody = {
            userId: req.body.userId,
            userEmail: req.body.userEmail,
            tourName: req.body.tourName,
            fullName: req.body.fullName,
            guestSize: req.body.guestSize,
            phone: req.body.phone,
            bookAt: req.body.bookAt
        };

    let us_rec = await booking.findById(req.params.id);

    if (!us_rec)
    return res.status(404).json({ msg: 'Booking record not found' });

        const updatedBooking = await booking.findByIdAndUpdate(
        req.params.id, requestBody, { new: true });

        resp.json(updatedBooking);

    } catch (error) {
        next(error);
    }
});

/* Delete booking based on id*/
router.delete('/booking/:id', async (req, resp, next) => {

  try {
    const us = await booking.findByIdAndDelete(req.params.id);
    resp.send(`Booking ${us.name} record deleted!`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;