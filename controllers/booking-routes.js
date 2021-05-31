const withAuth = require('../utils/auth');
const FetchData = require('../utils/api/pet-fetches');
const router = require('express').Router();

// returns the booking page/form
router.get('/', (req, res) => {
   return res.render('bookings')
});

// route to show the pets bookings
router.get('/:petId', async (req, res) => {
    const petId = req.params.petId;
    try {
        const fetch = await FetchData.petById(petId);
        const pet = await fetch.get({ plain: true });
        const data = {
            pet: pet,
            bookings: pet.bookings,
            loggedIn: req.session.loggedIn,
            user: req.session.username
        }
        // EXAMPLE bookings data
        // bookings: [
        //     { id: 1, user_id: 1, date: '2021-05-20', status: 'Scheduled' },
        //     { id: 2, user_id: 1, date: '2021-05-25', status: 'Scheduled' }
        //   ],
 
        return res.render('pet-views/pet-bookings', data)
    } catch (err) {
        return console.log('An error occurred fetching booking', err);
    }
    

});
// a single booking for a pet, CAN BE ACCESSED BY OWNERS AND USERS
// THAT SHARE THE BOOKING
// ON THIS PAGE THEY CAN MESSAGE BACK AND FORTH WHILE THE BOOKING IS ACTIVE
router.get('/pet/:bookingId', async (req, res) => {
    
    const bookingId = req.params.bookingId;
    try {
        const fetch = await FetchData.petBookings(bookingId);
        const booking = await fetch.get({ plain: true });
        console.log(booking)
        // EAMPLE BOOKING DATA
        // {
        //     id: 1,
        //     date: '2021-05-20',
        //     status: 'Scheduled',
        //     owner: { id: 1, ownername: 'Owner2', comments: [] },
        //     user: { id: 1, username: 'User3', comments: [] },
        //     pet: {
        //       id: 1,
        //       rating: '5',
        //       owner_id: 1,
        //       name: 'Zeus',
        //       age: 3,
        //       breed: 'American Bulldog',
        //       personality_trait: 'Loyal',
        //       bio: 'Will follow you anywhere',
        //       profile_picture: null
        //     }
        //   }
        const data = {
            bookingID: booking.id,
            bookingStatus: booking.status,
            bookDate: booking.date,
            petOwner: booking.owner,
            user: booking.user,
            pet: booking.pet,
            loggedIn: req.session.loggedIn,
            activeUser: req.session.user_id
        }
        return res.render('pet-views/booked-event', data)
    } catch (err) {
        return console.log('An error occurred fetching review', err);
    }
});
module.exports = router
