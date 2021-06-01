const withAuth = require('../utils/auth');
const FetchData = require('../utils/api/fetches');
const router = require('express').Router();

// just so a page is there for now
router.get('/', (req, res) => {

    res.render('review')

});
// a single review for a pet
router.get('/:petId/:reviewId', withAuth, async (req, res) => {
    const petId = req.params.petId;
    const reviewId = req.params.reviewId;
    try {
        const fetch = await FetchData.singleReview(petId, reviewId);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const pet = await fetch.get({ plain: true });
            const data = {
                pet: pet,
                review: pet.reviews[0],
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            return res.render('pet-views/single-review', data)
        }

    } catch (err) {
        return console.log('An error occurred fetching review', err);
    }
});

// all reviews for a pet
router.get('/:petId', async (req, res) => {
    const petId = req.params.petId;
    try {
        const fetch = await FetchData.petById(petId);
        if (fetch === null) {
            return res.redirect('/error');
        } else {
            const pet = await fetch.get({ plain: true });
            const data = {
                pet: pet,
                review: pet.reviews,
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            return res.render('pet-views/pet-reviews', data)
        }

    } catch (err) {
        return console.log('An error occurred fetching review', err);
    }
});

module.exports = router