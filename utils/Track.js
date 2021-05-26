const { Pet, Owner, User, Booking, Review, Comment, Vote } = require('../models');


class Track {

    static async setVotes(id) {

        const vote = await Vote.create({
            user_id: id
        }).then(voteData => {
            const data = voteData.toJSON()
            return data
        }).catch(err => {
            console.log(err)
        })
        return vote
    }
    // returns true or false
    // returns false if the rating is not successfully updated.
    static async ratingCal(pet) {
        let totalStars = 0;
        let totalVotes = 0;
        // grab all the ratings for this pet;
        const ratingData = await Review.findAll({
            where: {
                pet_id: pet
            }
        }).then(data => {
            // return clean data
            const ratings = data.map(el => el.get({ plain: true }));
            return ratings
        });
        ratingData.forEach(el => {
            totalStars += el.stars;
            totalVotes++;
        });
        // figure overall rating
        const rating = (totalStars / ((totalVotes) * 5)) * 5;
        // update pets rating
        const petRatingStatus = await Pet.update(
            {
                rating: rating
            },
            {
                where: {
                    id: pet
                }
            })
            .then(data => data)
            .catch(e=>{
                return e
            });

        if (petRatingStatus > 0) {
            // if records changed are greater than zero
            return true
        }else{
            return false
        }
    }
}


module.exports = Track;