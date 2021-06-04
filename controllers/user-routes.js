const router = require('express').Router();
const FetchData = require('../utils/api/fetches');
const withAuth = require('../utils/auth');


// login page-user
router.get('/login', async (req, res) => {
    if (req.session.user_id) {
        // console.log(req)
        return res.redirect('/user/home');
    } else {
        return res.render('user-views/login', {user:true});
    }

});
// Signup page-user
router.get('/signup', (req, res) => {
    return res.render('user-views/sign-up', {user:true});
});

// user home
router.get('/home', withAuth, async (req, res) => {
    try {
        const fetch = await FetchData.allPets();
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
        return console.log('An error occurred hitting the pet-dashboard route', err);
    }

});



module.exports = router;