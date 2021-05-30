const router = require('express').Router();
const Request = require('../utils/api/Request');


// login page-user
router.get('/login', async (req, res) => {
    return res.render('user-views/login')
});
// Signup page-user
router.get('/signup', (req, res) => {
    return res.render('user-views/sign-up')
});

module.exports = router;