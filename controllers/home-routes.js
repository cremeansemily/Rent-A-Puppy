const router = require('express').Router();
const { User, Owner, Pet, Booking, Review, Vote } = require('../models')

router.get('/', async (req, res) => {

    res.render('home')

})


module.exports = router