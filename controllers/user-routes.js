const router = require('express').Router();
const FetchData = require('../utils/api/fetches');


// login page-user
router.get('/login', async (req, res) => {
    if (req.session.user_id) {
        return res.redirect(`/dashboard/user/${req.session.user_id}`);
    } else {
        return res.render('user-views/login');
    }

});
// Signup page-user
router.get('/signup', (req, res) => {
    return res.render('user-views/sign-up');
});

// user home
router.get('/home', async (req, res) => {

    try {
        const fetch = await FetchData.allPets();
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const data = {
                pet: fetch,
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            console.log(fetch)
            return res.render('user-views/home', data);
        }

    } catch (err) {
        return console.log('An error occurred hitting the pet-dashboard route', err);
    }

});



module.exports = router;