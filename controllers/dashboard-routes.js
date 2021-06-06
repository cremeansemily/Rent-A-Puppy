const router = require('express').Router();
const FetchData = require('../utils/api/fetches');
// const FetchUser = require()
const { userAuth, ownerAuth, } = require('../utils/auth');

router.get('/user/:id', userAuth, async (req, res) => {

    try {
        const id = req.params.id;
        const fetch = await FetchData.user(id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {

            const user = await fetch
            const data = {
                user: user,
                bookings: user.bookings,
                noMessage: true,
                loggedIn: req.session.loggedIn,
                activeUser: req.session.username,
                loggedIn: true,
                pet: '',
            };
            // NEED ALL PET DATA FOR PET CARD ON DASH
            const petFetch = await FetchData.allPets();
            if (petFetch === null) {
                console.log('ISSUE')
            } else {
                data.pet = petFetch;
            }
            console.log(data.user)
            //  console.log("\x1b[34m%s\x1b[0m", "user dashboard -- in dashboard-routes")
            return res.render('user-views/dashboard', data)
        }
    } catch (err) {
        return console.log('An error occurred hitting the user-dashboard route', err);
    }
});

router.get('/owner/:id', ownerAuth, async (req, res) => {


    try {
        const fetch = await FetchData.owner(req.params.id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const owner = await fetch
            const data = {
                owner: owner,
                loggedIn: req.session.loggedIn,
                activeOwner: req.session.ownername,
                ownerDash: true,
                owner_id: req.session.owner_id
            }
            console.log(data.owner)
            return res.render('owner-views/dashboard', data);
        }

    } catch (err) {
        return console.log('An error occurred hitting the owner-dashboard route', err);
    }
});

module.exports = router;
