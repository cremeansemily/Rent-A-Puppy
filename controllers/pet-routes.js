const router = require('express').Router();
const e = require('express');
// const Request = require('../utils/api/Request');
const FetchData = require('../utils/api/fetches');
const CalRender = require('../utils/render-calendar');

// pet dashboard
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const month = await CalRender.createCalMonth()
    try {
        const fetch = await FetchData.petById(id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const bookings = await FetchData.petBookings(id).then(data=>{
                return data.get({plain: true})
            })
            const pet = await fetch.get({ plain: true });
            const data = {
                pet: pet,
                bookings: bookings,
                month: month,
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            // grab bookings for the pet
          
            res.render('pet-views/dashboard', data);
        }

    } catch (err) {
        return console.log('An error occurred hitting the pet-dashboard route', err);
    }
});



module.exports = router;