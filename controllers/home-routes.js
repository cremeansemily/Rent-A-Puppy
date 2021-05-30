const router = require('express').Router();
const { User, Owner, Pet, Booking, Review, Vote, Comment } = require('../models');
const Fetch = require('../utils/api/Fetch.js');
const Request = require('../utils/api/Request.js');
// main route- landing page
router.get('/', async (req, res) => {
    try {
        // custom function 
        // takes 3 arguments, 
        // 1.) the api route name
        // 2.) the request type, GET, POST, PUT, DELETE
        // 3.) Optional, View to be rendered
        // THE .handler(req,res) MUST ACCOMPANY a Request
        // passes in the req if any and gives access to the res

        const fetch = new Request('pets', 'GET', 'home');
        await fetch.handler(req, res);
    } catch (error) {
        console.log("HomeRoute\n",error)
    }
});
// error route
router.get('/error', async (req, res) => {
    res.render('error')
});
// login route, not for returning a page
router.get('/user-login', async (req, res) => {
    try {
        const fetch = new Request('login', 'POST');
        await fetch.handler(req, res);
    } catch (error) {
        console.log("UserLogin\n",error)
    }

});
// 
router.get('/signup', (req, res) => {
    res.status(200).json('Successfully routed to Sign-Up')
})





module.exports = router