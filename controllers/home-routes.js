const router = require('express').Router();
const { User, Owner, Pet, Booking, Review, Vote, Comment } = require('../models');
const Fetch = require('../utils/api/Fetcher.js');


// login route, not for returning a page
router.get('/login', async (req, res) => {
    
    const data = {
        email: 'user2@email.com',
        password: 'testtest',
    }
    const fetch = new Fetch('login', data);
    const fetchResponse = await fetch.fetchReq('POST')
    if (fetchResponse === true) {
        res.status(201).json(fetchResponse.message);
        return
    } else {
        res.status(400).json(fetchResponse.message);
        return
    }

    // const loginResponse = await fetch(`${url}api/users/login`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //     email: 'user2@email.com',
    //     password: 'testtest',
    //     }),
    //     headers: { 'Content-Type': 'application/json' }
    // }).catch(e => {
    //     console.log('Error while fetching login api',e);
    // });
    // const loginResData = await loginResponse.json();
    // const responseMsg = loginResData.message;
    // if(loginResponse.ok){
    //     res.status(201).json(responseMsg);
    //     return
    // }else{
    //     res.status(400).json(responseMsg);
    //     return
    // }
});

router.get('/', async (req, res) => {

    res.render('home')

})



module.exports = router