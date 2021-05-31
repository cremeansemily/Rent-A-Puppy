const router = require('express').Router();
const e = require('express');
const FetchData = require('../utils/api/fetches');
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const fetch = await FetchData.user(id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const user = await fetch.get({ plain: true });
            const data = {
                user: user,
                loggedIn: req.session.loggedIn,
                activeUser: req.session.username
            }
            console.log(data)
            return res.render('user-views/dashboard', data)
        }

    } catch (err) {
        return console.log('An error occurred hitting the user-dashboard route', err);
    }
});

router.get('/owner/:id', async (req, res) => {
    const id = req.params.id;
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