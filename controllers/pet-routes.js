const router = require('express').Router();
const {withAuth} = require('../utils/auth');
const konsole = require('../utils/api/konsole');
const log = konsole();
const CalRender = require('../utils/render-calendar');
const pet = require('../utils/api/pet-fetches');
const p = pet();
// pet dashboard
router.get('/:id', withAuth, async (req, res) => {
    console.log(log.cyan, '+++++PET_DASH_ROUTE+++++')
    const id = req.params.id;
   
    const month = await CalRender.createCalMonth();
    try {
        const fetch = await p.findOne(id);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            // const bookings = await FetchData.petBookings(id).then(data=>{
                
            //     return data.map(el => el.get({plain: true}))
            // })
            const pet = await fetch;
            const data = {
                pet: pet,
                bookings: pet.bookings,
                month: month,
                loggedIn: req.session.loggedIn,
                user: req.session.username,
                userID: req.session.user_id,
                // TELLS DASHBOARD TO RENDER PET VIEWS
                petDash: true
            }
            // grab bookings for the pet
            res.render('pet-views/dashboard', data);
        }

    } catch (err) {
        console.log(log.red, 'An error occurred hitting the pet-dashboard route');
        console.log(log.red, err);
        return err;
    }
});



module.exports = router;