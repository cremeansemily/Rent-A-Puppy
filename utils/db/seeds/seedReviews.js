const { Review } = require('../../models')
const sequelize = require('../../config/connection');



const reviewData = [
    {
        booking_id: 1,
        stars: 5,
        pet_id: 1,
        review: 'Zeus was awesome! He followed me around all day never had to keep track! Recommend for hiking!',
        vote_id: 2
    },
    {
        booking_id: 2,
        stars: 5,
        pet_id: 1,
        review: 'Wish I could give 10 stars! Second time with Zeus, looking forward to the next!',
        vote_id: 4
    },
    {
        booking_id: 3,
        stars: 4,
        pet_id: 2,
        review: 'Luca was a fun dog, only gave four stars cause too much fun for me!, Recommend for someone really active.',
        vote_id: 1
    },
    {
        booking_id: 4,
        stars: 1,
        pet_id: 4,
        review: 'Pippi tried to eat my cat!',
        vote_id: 5
    },
    {
        booking_id: 5,
        stars: 5,
        pet_id: 3,
        review: 'Zia is the bestest!',
        vote_id: 3
    },

];

sequelize
    .sync()
    .then(() => {
        return Review.bulkCreate(reviewData, { individualHooks: false });
    })
    .then(dbSeedData => {
        console.log('++++++++++++++++++++\nReviews successfully seeded!\n++++++++++++++++++++');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });