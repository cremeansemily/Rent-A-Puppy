const router = require('express').Router();
const Request = require('../utils/api/Request');


// login page-owner
router.get('/login', async (req, res) => {
    return res.render('owner-views/login')
});
// Signup page-owner
router.get('/signup', (req, res) => {
    return res.render('owner-views/sign-up')
});

module.exports = router;