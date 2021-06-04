const router = require('express').Router();



// login page-owner
router.get('/login', async (req, res) => {
    return res.render('owner-views/login',{owner:true})
});
// Signup page-owner
router.get('/signup', (req, res) => {
    return res.render('owner-views/sign-up',{owner:true})
});

module.exports = router;