const router = require('express').Router();
const owner = require('../utils/api/owner-fetches');
const o = owner();
const user = require('../utils/api/user-fetches');
const u = user();
const FetchData = require('../utils/api/fetches');
const konsole = require('../utils/api/konsole');
const log = konsole();
// const FetchUser = require()
const { userAuth, ownerAuth, } = require('../utils/auth');

router.get('/user/:id', userAuth, async (req, res) => {
    console.log(log.cyan, `+++++++++++++++USER-DASH-ROUTE+++++++++++++++`);
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

            // msgs are backwards
            // add a condition to check the order, sometimes it is right? 
            // sometimes they are backwards
            // grabs pet name as well 
            user.bookings.forEach(async el => {
                const petId = el.pet_id;
                const petData = await FetchData.petById(petId);
                el.pet_name = petData.name
                el.pet_name[petData.name];
                if (el.comments.length) {
                    const x = el.comments[0].id;
                    const y = el.comments[1].id;
                    if (x > y) {
                        return (el.comments = el.comments.reverse())
                    }
                }
            });


            if (user.bookings[0].comments.length > 0) {
                data.noMessage = false
            }
            // NEED ALL PET DATA FOR PET CARD ON DASH
            const petFetch = await FetchData.allPets();
            if (petFetch === null) {
                console.log(log.red, 'ISSUE grabbing pet data for the user dashboard')
            } else {
                data.pet = petFetch;
            }
            return res.render('user-views/dashboard', data)
        }
    } catch (err) {
        console.log(log.red, 'An error occurred hitting the user-dashboard route');
        console.log(log.red, err);
        return err;
    }
});

router.get('/owner/:id', ownerAuth, async (req, res) => {
    console.log(log.cyan, `+++++++++++++++USER-DASH-ROUTE+++++++++++++++`);
    const id = req.session.owner_id
    if (req.session.owner_id === undefined) {
        ownerAuth();
    }
    try {
        const fetch = await o.findOne(id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const owner = fetch
            const data = {
                owner: owner,
                loggedIn: req.session.loggedIn,
                activeOwner: req.session.ownername,
                ownerDash: true,
                owner_id: req.session.owner_id,
                noMessage: true
            }
            console.log(owner.bookings)
            return res.render('owner-views/dashboard', data);
        }
    } catch (err) {
        console.log(log.red, 'An error occurred hitting the owner-dashboard route');
        console.log(log.red, err);
        return err;
    }
});

module.exports = router;
