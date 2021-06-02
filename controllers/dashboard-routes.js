const router = require('express').Router();
const FetchData = require('../utils/api/fetches');
// const FetchUser = require()
const withAuth = require('../utils/auth');
router.get('/user/:id', withAuth, async (req, res) => {
    const id = req.params.id;
    try {
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
                activeUser: req.session.username.loggedI,
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
           
            return res.render('user-views/dashboard', data)
        }
    } catch (err) {
        return console.log('An error occurred hitting the user-dashboard route', err);
    }
});

router.get('/owner/:id', async (req, res) => {
    const id = req.params.id;
    if (req.session.owner_id != id && req.session.owner_id) {
        return res.render('error', { message: 'Not Authorized!', redirect: `/dashboard/owner/${req.session.owner_id}` })
    } else if (req.session.user_id && !req.session.owner_id) {
        return res.render('error', { message: `Nice try, ${req.params.username}`, redirect: `/dashboard/user/${req.session.user_id}` })
    } else if (!req.session.user_id && !req.session.owner_id) {
        return res.render('error');
    }

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
