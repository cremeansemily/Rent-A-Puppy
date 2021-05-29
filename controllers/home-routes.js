const router = require('express').Router();
const { User, Owner, Pet, Booking, Review, Vote, Comment } = require('../models');
const Fetch = require('../utils/api/Fetch.js');



// login route, not for returning a page
router.get('/login', async (req, res) => {

    // REMOVE AFTER TESTING
    const data = {
        email: 'user1@email.com',
        password: 'testtest',
    }
    // 
    const fetch = new Fetch('login', data);
    const fetchResponse = await fetch.fetchReq('POST');
    if (fetchResponse.user) {
        req.session.save(() => {
            req.session.user_id = fetchResponse.user.id;
            req.session.username = fetchResponse.user.username;
            req.session.loggedIn = true;
            fetch.userResponseHandler(fetchResponse, res)
            return
        });
    }
    else {
        fetch.userResponseHandler(fetchResponse, res);
    }
});

router.get('/', async (req, res) => {

    res.render('home')

})



module.exports = router