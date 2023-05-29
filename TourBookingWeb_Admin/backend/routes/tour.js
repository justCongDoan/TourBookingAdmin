var express = require('express');
const connection = require('../config/database-config');
const upload = require('../middleware/upload');
const tour = require('../models/tour');
var router = express.Router();

/* Add new tour */
router.post('/tour', upload.single('photo'), async (req, resp, next) => {
    const { title, city, address, distance, desc, tourItinerary, price, startDate, endDate, maxGroupSize, featured } = req.body;

    try {
        const newTour = new tour({
            title: title,
            city: city,
            address: address,
            distance: distance,
            photo: req.file,
            desc: desc,
            tourItinerary: tourItinerary,
            price: price,
            startDate: startDate,
            endDate: endDate,
            maxGroupSize: maxGroupSize,
            featured: featured
        });

        const savedTour = await newTour.save();
        resp.json(savedTour);
    } catch (error) {
        next(error);
    }
});

/* GET all tours listing. */
router.get('/tours', async (req, resp, next) => {
    try {
        const tours = await tour.find();
        var records = [];

        tours.forEach(t => {
            if(t) {
                const tourRecord = {
                    id: t._id,
                    title: t.title,
                    city: t.city,
                    address: t.address,
                    distance: t.distance,
                    photo: t.photo,
                    desc: t.desc,
                    tourItinerary: t.tourItinerary,
                    price: t.price,
                    startDate: t.startDate,
                    endDate: t.endDate,
                    maxGroupSize: t.maxGroupSize,
                    featured: t.featured
                };
                records.push(tourRecord);
            }
        });

        resp.json(records);
    } catch (error) {
        next(error);
    }
});

/* Get tour based on id*/
router.get('/tour/:id', async (req, resp, next) => {

  try {
    const t = await tour.findById(req.params.id);

    resp.json(
      {
        id: t._id,
        title: t.title,
        city: t.city,
        address: t.address,
        distance: t.distance,
        photo: t.photo,
        desc: t.desc,
        tourItinerary: t.tourItinerary,
        price: t.price,
        startDate: t.startDate,
        endDate: t.endDate,
        maxGroupSize: t.maxGroupSize,
        featured: t.featured
      }
    );

  } catch (error) {
    next(error);
  }
});

/* Edit existing tour based on id*/
router.put('/tour/:id', async (req, resp, next) => {

  try {
    const requestBody = {
      title: req.body.title,
      city: req.body.city,
      address: req.body.address,
      distance: req.body.distance,
      photo: req.body.photo,
      desc: req.body.desc,
      tourItinerary: req.body.tourItinerary,
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      maxGroupSize: req.body.maxGroupSize,
      featured: req.body.featured
    };

    let us_rec = await tour.findById(req.params.id);

    if (!us_rec)
    return res.status(404).json({ msg: 'Tour record not found' });

    const updatedTour = await tour.findByIdAndUpdate(
      req.params.id, requestBody, { new: true });

    resp.json(updatedTour);

  } catch (error) {
    next(error);
  }
});

/* Delete tour based on id*/
router.delete('/tour/:id', async (req, resp, next) => {

  try {
    const us = await tour.findByIdAndDelete(req.params.id);
    resp.send(`Tour ${us.name} record deleted!`);
  } catch (error) {
    next(error);
  }
});

/* Delete all tours*/
router.delete('/tours', async (req, resp, next) => {

  try {
    const us = await tour.remove({});
    resp.send(`All tour records has been deleted!`)
  } catch (error) {
    next(error);
  }

});

module.exports = router;