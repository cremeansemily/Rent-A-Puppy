
const { Pet, Owner, Booking, Review, Comment, User } = require('../../models');
const FetchUser = require('./user-fetches');
const { petId, allPet, pupReview, bookings } = require('./pet-fetches');
const {all, editBook} = require('./booking-fetches');


class FetchData {
    // Grabs a single pet
    static async petById(id) {
        return petId(id);
    }

    // Grabs All Pets
    static async allPets() {
        return allPet();
    }

    // grabs a single review for a pet
    static async singleReview(petId, reviewId) {
        return pupReview(petId, reviewId);
    }

    // Grabs A pets  booking by id
    static async petBookings(id) {
        return bookings(id);
    }

    // get all bookings 
    static async bookings() {
        return all();
    }

    // update booking 
    static async updateBooking(id, status) {
        return editBook(id,status);
    }

    static async user(id) {
         return FetchUser.byId(id);
    }

    static async owner(id) {
      return FetchUser.ownerById(id);
    }

    // static async ownerMessages(data) {
    //     let messages = []
    //     for (let i = 0; i <= data.length - 1; i++) {
    //         const el = data[i];
    //         const ownerMsgs = await Owner.findAll({
    //             attributes: { exclude: ['email', 'password'] },
    //             where: {
    //                 id: el.owner_id,
    //             },
    //             include: [
    //                 {
    //                     model: Comment,
    //                     where: {
    //                         booking_id: el.id,
    //                     },

    //                 },
    //             ]
    //         })
    //             .then(dbCommentData => {
    //                 const dt = dbCommentData.map(el => el.get({ plain: true }));
    //                 // console.log('IN LOOP', dt)
    //                 return dt
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 return err;
    //             });
    //         ownerMsgs.map(el => { messages.push(el) })
    //     }
    //     return messages
    // }
}



module.exports = FetchData;


