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
}


module.exports = Track;