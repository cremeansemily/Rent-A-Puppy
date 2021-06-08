const router = require('express').Router();
const FetchData = require('../utils/api/fetches');
const user = require('../utils/api/user-fetches');
const u = user();
const konsole = require('../utils/api/konsole');
const log = konsole();
// const FetchUser = require()
const { userAuth, ownerAuth, } = require('../utils/auth');

router.get('/user/:id', userAuth, async (req, res) => {

    try {
        const id = req.params.id;
        const fetch = await u.findOne(id);
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
                pet: '',
            };
<<<<<<< Updated upstream
=======

            // msgs are backwards
            // add a condition to check the order, sometime it is right? 
            // sometimes they are backwards
            user.bookings.forEach(el => {
                return el.comments.reverse()
            });

>>>>>>> Stashed changes
            // NEED ALL PET DATA FOR PET CARD ON DASH
            const petFetch = await FetchData.allPets();
            if (petFetch === null) {
                console.log(log.red,'ISSUE grabbing pet data for the user dashboard')
            } else {
                data.pet = petFetch;
            }
<<<<<<< Updated upstream
           
            //  console.log("\x1b[34m%s\x1b[0m", "user dashboard -- in dashboard-routes")
=======

>>>>>>> Stashed changes
            return res.render('user-views/dashboard', data)
        }
    } catch (err) {
        return console.log('An error occurred hitting the user-dashboard route', err);
    }
});

router.get('/owner/:id', ownerAuth, async (req, res) => {

<<<<<<< Updated upstream
const id = req.session.owner_id
if(req.session.owner_id === undefined){
    ownerAuth();
    next();
}
=======
    const id = req.session.owner_id
    if (req.session.owner_id === undefined) {
        ownerAuth();
    }
>>>>>>> Stashed changes

    try {
        const fetch = await FetchData.owner(id);
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
