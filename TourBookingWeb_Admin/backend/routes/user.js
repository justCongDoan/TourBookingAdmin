var express = require('express');
const connection = require('../config/database-config');
const user = require('../models/user');
var router = express.Router();

/* Add new user */
router.post('/user', async (req, resp, next) => {
    const {username, fullName, email, password, phoneNumber, address, dateOfBirth} = req.body;

    try {
        const newUser = new user({
            username: username,
            fullName: fullName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            address: address,
            dateOfBirth: dateOfBirth,
        });

        const savedUser = await newUser.save();
        resp.json(savedUser);
    } catch (error) {
        next(error);
    }
});

/* GET all users listing. */
router.get('/users', async (req, resp, next) => {
    try {
        const users = await user.find();
        var records = [];

        users.forEach(us => {
            if(us) {
                const userRecord = {
                    id: us._id,
                    username: us.username,
                    fullName: us.fullName,
                    email: us.email,
                    password: us.password,
                    phoneNumber: us.phoneNumber,
                    address: us.address,
                    dateOfBirth: us.dateOfBirth
                };
                records.push(userRecord);
            }
        });

        resp.json(records);
    } catch (error) {
        next(error);
    }
});

/* Get user based on id*/
router.get('/user/:id', async (req, resp, next) => {

  try {
    const us = await user.findById(req.params.id);

    resp.json(
      {
        id: us._id,
        username: us.username,
        fullName: us.fullName,
        email: us.email,
        password: us.password,
        phoneNumber: us.phoneNumber,
        address: us.address,
        dateOfBirth: us.dateOfBirth
      }
    );

  } catch (error) {
    next(error);
  }
});

/* Edit existing user based on id*/
router.put('/user/:id', async (req, resp, next) => {

  try {
    const requestBody = {
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      dateOfBirth: req.body.dateOfBirth
    };

    let us_rec = await user.findById(req.params.id);

    if (!us_rec)
    return res.status(404).json({ msg: 'User record not found' });

    const updatedUser = await user.findByIdAndUpdate(
      req.params.id, requestBody, { new: true });

    resp.json(updatedUser);

  } catch (error) {
    next(error);
  }
});

/* Delete user based on id*/
router.delete('/user/:id', async (req, resp, next) => {

  try {
    const us = await user.findByIdAndDelete(req.params.id);
    resp.send(`User ${us.name} record deleted!`);
  } catch (error) {
    next(error);
  }
});

/* Delete all users*/
router.delete('/users', async (req, resp, next) => {

  try {
    const us = await user.remove({});
    resp.send(`All customer records has been deleted!`)
  } catch (error) {
    next(error);
  }

});

module.exports = router;