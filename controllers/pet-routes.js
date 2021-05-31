const router = require('express').Router();
// const Request = require('../utils/api/Request');
const FetchData = require('../utils/api/pet-fetches');

// pet dashboard
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const fetch = await FetchData.petById(id);
        const pet = await fetch.get({ plain: true });
        const data = {
            pet: pet,
            loggedIn: req.session.loggedIn,
            user: req.session.username
        }
        res.render('pet-views/dashboard', data)
    } catch (err) {
        return console.log('An error occurred hitting the pet-dashboard route', err);
    }
});



module.exports = router;