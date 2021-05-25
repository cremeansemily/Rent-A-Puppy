const router = require('express').Router();
const { User, Owner, Pet, Booking, Review, Vote, Comment} = require('../models')

router.get('/', async (req, res) => {

    res.render('home')

})


module.exports = router