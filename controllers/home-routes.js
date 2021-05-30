const router = require('express').Router();
const { User, Owner, Pet, Booking, Review, Vote, Comment } = require('../models');
const Fetch = require('../utils/api/Fetch.js');
const Request = require('../utils/api/Request.js');
// main route- landing page
router.get('/', async (req, res) => {

    // need to retrieve all pet info, send to homepage
    const fetch = new Request('pets', 'GET', 'home');
    await fetch.handler(req, res);
});
// error route
router.get('/error', async (req, res) => {
    res.render('error')
});
// login route, not for returning a page
router.get('/user-login', async (req, res) => {
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
            res.redirect('/')
            return
        });
    }
    else {

        const data = {
            message: fetchResponse,
            redirect: '/user-login'
        }
        res.render('error', data);
        return
    }
});
// 
router.get('/signup', (req, res) => {
    res.status(200).json('Successfully routed to Sign-Up')
})





module.exports = router