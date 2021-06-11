const router = require('express').Router();
const konsole = require('../utils/api/konsole');
const log = konsole();


// login page-owner
router.get('/login', async (req, res) => {
    console.log(log.cyan, `+++++++++++++++OWNER-LOGIN-ROUTE+++++++++++++++`);
    return res.render('owner-views/login',{owner:true})
});
// Signup page-owner
router.get('/signup', (req, res) => {
    console.log(log.cyan, `+++++++++++++++OWNER-SIGNUP-ROUTE+++++++++++++++`);
    return res.render('owner-views/sign-up',{owner:true})
});

module.exports = router;