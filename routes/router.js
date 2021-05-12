var express = require('express');
var router = express.Router();
// var verifyToken = require('../service/sharedService');
const UserController = require('../controller/userController');
const PumpController = require('../controller/pumpController');
const BookingController = require('../controller/bookingController');
var verifyToken = require('../service/sharedService');

router.get('/user', verifyToken ,UserController.getAll)
router.get('/user/:id', verifyToken, UserController.get)
router.post('/user', verifyToken ,UserController.post)
router.put('/user/:id', verifyToken, UserController.put)
router.delete('/user/:id', verifyToken, UserController.delete)

router.get('/pump', verifyToken, PumpController.getAll)
router.get('/pump/:id', verifyToken, PumpController.get)
router.post('/pump', verifyToken, PumpController.post)
router.put('/pump/:id', verifyToken, PumpController.put)
router.delete('/pump/:id', verifyToken, PumpController.delete)

router.get('/booking', verifyToken, BookingController.getAll)
router.get('/booking/:id', verifyToken, BookingController.get)
router.post('/booking', verifyToken, BookingController.post)
router.put('/booking/:id', verifyToken, BookingController.put)
router.delete('/booking/:id', verifyToken, BookingController.delete)

module.exports = router;
