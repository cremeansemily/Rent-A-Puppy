const router = require('express').Router();
const {withAuth,} = require('../utils/auth');
const pet = require('../utils/api/pet-fetches');
const p = pet();
const konsole = require('../utils/api/konsole');
const log = konsole();

// login page-user
router.get('/login', async (req, res) => {
    console.log(log.cyan, `+++++++++++++++USER-LOGIN-ROUTE+++++++++++++++`);
    if (req.session.user_id) {
        // console.log(req)
        return res.redirect('/user/home');
    } else {
        return res.render('user-views/login', {user:true});
    }

});
// Signup page-user
router.get('/signup', (req, res) => {
    console.log(log.cyan, `+++++++++++++++USER-SIGNUP-ROUTE+++++++++++++++`);
    return res.render('user-views/sign-up', {user:true});
});

// user home
router.get('/home', withAuth, async (req, res) => {
    console.log(log.cyan, `+++++++++++++++USER-HOME-ROUTE+++++++++++++++`);

    
    try {
        const fetch = await p.findAll();
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            
            const data = {
                pet: fetch,
                loggedIn: req.session.loggedIn,
                user: req.session.user_id,
                // RENDERS USER DASH, cant use req.session.user_id
                // THE PET PAGE WONT WORK CAUSE USER ID IS AVAIL 
                userDash: true,
               
            }
            
            return res.render('user-views/home', data);
        }

    } catch (err) {
        console.log(log.red, 'An error occurred hitting the user-home route');
        console.log(log.red, err);
        return err;
    }

});



module.exports = router;