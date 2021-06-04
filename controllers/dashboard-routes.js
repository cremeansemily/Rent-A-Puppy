const router = require('express').Router();
const FetchData = require('../utils/api/fetches');
// const FetchUser = require()
const {userAuth, ownerAuth,} = require('../utils/auth');
router.get('/user/:id', userAuth, async (req, res) => {

    try {
        const id = req.params.id;
        const fetch = await FetchData.user(id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const user = await fetch.get({ plain: true });
            const data = {
                user: user,
                bookings: user.bookings,
                ownerMessages: '',
                noMessage: true,
                loggedIn: req.session.loggedIn,
                activeUser: req.session.username.loggedIn,
                pet: '',

            };

            const bookingData = data.bookings.map(el => {
                return {
                    id: el.id,
                    owner_id: el.owner_id
                }
            });
            const msgs = await FetchData.userMessages(bookingData);
            data.ownerMessages = msgs;

            if (msgs[0]) {
                data.noMessage = false;
            }
            // GRAB PETS 

            const petFetch = await FetchData.allPets();
            if (petFetch === null) {

            } else {
                data.pet = petFetch;
            }
         console.log("\x1b[34m%s\x1b[0m", "user dashboard -- in dashboard-routes")
            console.log(data.ownerMessages[0].comments)
            return res.render('user-views/dashboard', data)
        }
    } catch (err) {
        return console.log('An error occurred hitting the user-dashboard route', err);
    }
});

router.get('/owner/:id', ownerAuth, async (req, res) => {


    try {
        const fetch = await FetchData.owner(id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const owner = await fetch.get({ plain: true });
            const data = {
                owner: owner,
                loggedIn: req.session.loggedIn,
                activeOwner: req.session.ownername
            }
            return res.render('owner-views/dashboard', data);
        }

    } catch (err) {
        return console.log('An error occurred hitting the owner-dashboard route', err);
    }
});

module.exports = router;
