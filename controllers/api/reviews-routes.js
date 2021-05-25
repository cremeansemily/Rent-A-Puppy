const router = require('express').Router();
const { Pet, Owner, User, Booking, Review, Comment, Vote } = require('../../models');

// GET ALL Reviews
router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`);

    Review.findAll(
        { attributes: { exclude: ['createdAt', 'updatedAt'] } },
    )
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// FIND ONE Review
router.get('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Review.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id', 'pet_id', 'user_id'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Pet,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            // ENABLE AFTER COMMENT ASSOCIATIONS
            // {
            //     model: Comment,
            //     attributes: {
            //         exclude: ['createdAt', 'updatedAt']
            //     }
            // },
            // ENABLE AFTER VOTE ASSOCIATIONS AND DYNAMICS
            // Thinking the 'Rating' Will be all the votes for 1 to 5 stars
            // divided by the amount of votes times the maximum number of Stars(x5)
            // Rating = totalStars / maxStars
            // {
            //     model: Vote,
            //     attributes: {
            //         exclude: ['createdAt', 'updatedAt']
            //     }
            // },
        ]
    })
        .then(dbReviewData => {
            if (!dbReviewData) {
                res.status(404).json({ message: 'No reviews found with this id' });
                return;
            }
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE A NEW Review
// Reviews must have a booking, preferably a completed booking.
router.post('/', (req, res,) => {
    console.log(`++++++++++++++++++++`)
    // Create the review, in the vote route we will add the vote_id to the review
    Review.create({
        pet_id: req.body.pet_id,
        booking_id: req.body.booking_id,
        stars: req.body.stars,
    })
        .then(dbReviewData => {
            res.status(201).json({ dbReviewData })
        })
        .catch(err => {
            console.log(err);
            return
        });
});

// UPDATE Review 
router.put('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Review.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbReviewsData => {
            if (!dbReviewsData || dbReviewsData[0] === 0) {
                res.status(404).json({ message: 'No reviews found with this id' });
                return;
            }
            res.json(dbReviewsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE A Review
router.delete('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbReviewData => {
            if (!dbReviewData) {
                res.status(404).json({ message: 'No reviews found with this id' });
                return;
            }
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router