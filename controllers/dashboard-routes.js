const router = require('express').Router();
const owner = require('../utils/api/owner-fetches');
const o = owner();
const user = require('../utils/api/user-fetches');
const u = user();
const pet = require('../utils/api/pet-fetches');
const p = pet();
const konsole = require('../utils/api/konsole');
const log = konsole();
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
            user.bookings.forEach(async el => {
                const petId = el.pet_id;
                const petData = await p.findOne(petId);
                el.pet_name = petData.name
                el.pet_name[petData.name];
                if (el.comments.length) {
                    if (el.comments[1]) {
                        const x = el.comments[0].id;
                        const y = el.comments[1].id;
                        if (x > y) {
                            return (el.comments = el.comments.reverse())
                        }
                    }

                }
            });

            if(user.bookings[0]){
                if (user.bookings[0].comments.length > 0) {
                    data.noMessage = false
                }
            }
          
            // NEED ALL PET DATA FOR PET CARD ON DASH
            const petFetch = await p.findAll();
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
    console.log(log.cyan, `+++++++++++++++OWNER-DASH-ROUTE+++++++++++++++`);
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
            if(owner.bookings[0]){
                if (owner.bookings[0].comments.length > 0) {
                    data.noMessage = false;
                }
                if (owner.bookings[0].comments[1]) {
    
                    if (owner.bookings[0].comments[0].id > owner.bookings[0].comments[1].id) {
                        (owner.bookings[0].comments = owner.bookings[0].comments.reverse());
                    }
    
                } else {
    
                }
            }
           

            return res.render('owner-views/dashboard', data);
        }
    } catch (err) {
        console.log(log.red, 'An error occurred hitting the owner-dashboard route');
        console.log(log.red, err);
        return err;
    }
});

module.exports = router;
