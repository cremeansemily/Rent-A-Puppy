const router = require('express').Router();
const { Pet, Owner, User, Booking, Review, Comment, Vote } = require('../../models');
const Track = require('../../utils/Track');
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
    // userID to track the vote
    const id = req.session.user_id || req.body.user_id
    const pet = req.body.pet_id
    console.log(`++++++++++++++++++++`)
    Review.create({
        pet_id: req.body.pet_id,
        booking_id: req.body.booking_id,
        stars: req.body.stars,
        review: req.body.review,
        user_id: req.body.user_id
    })
        .then(async (dbReviewData) => {
            // pass id into utility function to create the vote
            const setVote = await Track.setVotes(id);
            //  take the vote_id and update the Review
            const vote_id = setVote.id;
            //  review_id generated after the review is created
            const reviewId = dbReviewData.id;
            // package data for next callback
            const data = {
                vote_id,
                reviewId,
                dbReviewData
            };
            // return data obj for callback
            return data;
        })
        .then(async (data) => {
            // destructure data obj
            const { vote_id, reviewId, dbReviewData } = data;
            // update the review await the response
            const updateReview = await Review.update({ vote_id: vote_id }, {
                where: {
                    id: reviewId
                }
            }).then(update => { return update });
            // package callback data
            const cbData = {
                updateReview,
                reviewId
            };
            // return data
            return cbData;
        })
        .then(async (data) => {
            // destructure reviewId from data
            const { reviewId } = data;
            // grab the newly updated entry, and send to client
            const updatedReviewData = await Review.findByPk(reviewId).then(data => { return data });
            // return status and updated data with the voteID to the client
            // update the pet's rating
            Track.ratingCal(pet);
            return res.status(200).json(updatedReviewData);
        })
        .catch(err => {
            if (err.errors == undefined) {
                res.status(404).json('NOT FOUND')
            } else {
                if (err.errors[0]) {
                    const errMsg = ((err.errors[0].message).split('.')[1]).toUpperCase();
                    if (errMsg === 'BOOKING_ID MUST BE UNIQUE') {
                        return res.status(409).json("YOU CAN ONLY LEAVE ONE REVIEW!");
                    } else {
                        return res.status(409).json(errMsg);
                    }
                } else {
                    console.log(err)
                }
            }



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