const {withAuth} = require('../utils/auth');
const konsole = require('../utils/api/konsole');
const log = konsole();
const pet = require('../utils/api/pet-fetches');
const p = pet();
const router = require('express').Router();

// returns the booking page/form
router.get('/', withAuth, (req, res) => {
    return res.render('booking')
});

// route to show the pets bookings
router.get('/:petId', withAuth, async (req, res) => {
    console.log(log.cyan, '+++++ALL-BOOKINGS-BY-PET+++++')
    const petId = req.params.petId;
    try {
        const fetch = await p.findOne(petId);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const pet = await fetch.get({ plain: true });
            const data = {
                pet: pet,
                bookings: pet.bookings,
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
           
            return res.render('bookings', data)
        }

    } catch (err) {
       console.log(log.red, 'Error grabbing pet bookings');
        return err
    }


});

router.get('/pet/:bookingId', withAuth, async (req, res) => {
    console.log(log.cyan, '+++++INDIVIDUAL-BOOKING+++++')
    const bookingId = req.params.bookingId;
    try {
        const fetch = await p.bookings(bookingId);
        
        if (fetch === null) {
            return res.redirect('/error');
        }else{
            const booking = await fetch.get({ plain: true });
            let actUse = false;
            // console.log(booking)
            if(req.session.user_id){
                actUse = true;
            }
            const data = {
                bookingID: booking.id,
                bookingStatus: booking.status,
                bookDate: booking.date,
                petOwner: booking.owner,
                user: booking.user,
                pet: booking.pet,
                userComments: booking.user.comments,
                ownerComments: booking.owner.comments,
                loggedIn: req.session.loggedIn,
                activeUser: req.session.user_id,
                actUse,
                activeOwner: req.session.owner_id,
            }
        //   console.log(data)
            return res.render('bookings', data);
        }
        
    } catch (err) {
        console.log(log.red, 'Error grabbing pet bookings')
        return err
    }
});
module.exports = router
