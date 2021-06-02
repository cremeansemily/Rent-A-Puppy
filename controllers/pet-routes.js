const router = require('express').Router();
const withAuth = require('../utils/auth');
// const Request = require('../utils/api/Request');
const FetchData = require('../utils/api/fetches');
const CalRender = require('../utils/render-calendar');

// pet dashboard
router.get('/:id', withAuth, async (req, res) => {
    const id = req.params.id;
   
    const month = await CalRender.createCalMonth()
    try {
        const fetch = await FetchData.petById(id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            // const bookings = await FetchData.petBookings(id).then(data=>{
                
            //     return data.map(el => el.get({plain: true}))
            // })
            const pet = await fetch.get({ plain: true });
            const data = {
                pet: pet,
                bookings: pet.bookings,
                month: month,
                loggedIn: req.session.loggedIn,
                user: req.session.username,
                userID: req.session.user_id,
            }
            // grab bookings for the pet
          
            res.render('pet-views/dashboard', data);
        }

    } catch (err) {
        return console.log('An error occurred hitting the pet-dashboard route', err);
    }
});



module.exports = router;