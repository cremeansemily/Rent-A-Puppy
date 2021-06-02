const router = require('express').Router();
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
            const pet = await fetch.get({ plain: true });
            const data = {
                pet: pet,
                month: month,
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            res.render('pet-views/dashboard', data);
        }

    } catch (err) {
        return console.log('An error occurred hitting the pet-dashboard route', err);
    }
});



module.exports = router;