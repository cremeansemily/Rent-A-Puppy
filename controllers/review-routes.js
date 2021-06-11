const {withAuth} = require('../utils/auth');
const router = require('express').Router();
const pet = require('../utils/api/pet-fetches');
const p = pet();
const konsole = require('../utils/api/konsole');
const log = konsole();
// just so a page is there for now
router.get('/', (req, res) => {
    console.log(log.cyan, `+++++++++++++++REVIEW-ROUTE+++++++++++++++`);
    res.render('review')

});
// a single review for a pet
router.get('/:petId/:reviewId', withAuth, async (req, res) => {
    console.log(log.cyan, `+++++++++++++++SINGLE-REVIEW-ROUTE+++++++++++++++`);
    const petId = req.params.petId;
    const reviewId = req.params.reviewId;
    try {
        const fetch = await p.pupReview(petId, reviewId);
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
        console.log(log.red, 'An error occurred fetching review');
        console.log(log.red, err);
        return err;
    }
});

// all reviews for a pet
router.get('/:petId', async (req, res) => {
    console.log(log.cyan, `+++++++++++++++SINGLE-REVIEW-ROUTE+++++++++++++++`);
    const petId = req.params.petId;
    try {
        const fetch = await p.findOne(petId);
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
        console.log(log.red, 'An error occurred fetching pet reviews');
        console.log(log.red, err);
        return err;
    }
});

module.exports = router