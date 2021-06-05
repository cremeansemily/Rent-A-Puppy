
const { Pet, Owner, Booking, Review, Comment, User } = require('../../models');
const FetchUser = require('./user-fetches');

class FetchData {
    // Grabs a single pet
    static async petById(id) {
        const data = await Pet.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id'] },
            where: {
                id: id
            },
            include: [
                {
                    model: Owner,
                    attributes: {
                        exclude: ['password', 'email']
                    }
                },
                {
                    model: Booking,
                    attributes: {
                        exclude: ['owner_id', 'pet_id', 'createdAt', 'updatedAt']
                    },
                    exclude: {
                        status: "Completed"
                    }
                },
                {
                    model: Review,
                    attributes: {
                        exclude: ['pet_id']
                    },
                },
            ]
        }).then(res => {
            const petData = res
            return petData;
        }).catch(e => {
            return console.log('ERROR GETTING SINGLE PET DATA', e);
        })
        // console.log('SINGLE PET DATA BUILD', data);
        return data
    }

    // Grabs All Pets
    static async allPets() {
        const data = await Pet.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id'] },
            include: [
                {
                    model: Owner,
                    attributes: {
                        exclude: ['password', 'email']
                    }
                },
                {
                    model: Booking,
                    attributes: {
                        exclude: ['owner_id', 'pet_id', 'createdAt', 'updatedAt']
                    },
                    exclude: {
                        status: "Completed"
                    }
                },
                {
                    model: Review,
                    attributes: {
                        exclude: ['pet_id']
                    },
                },
            ]
        }).then(res => {
            const petData = res.map(el => el.get({ plain: true }));
            return petData;
        }).catch(e => {
            return console.log('ERROR GETTING PET DATA', e);
        })
        // console.log('PET DATA BUILD', data);
        return data
    }

    // grabs a single review for a pet
    static async singleReview(petId, reviewId) {
        const data = await Pet.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id'] },
            where: {
                id: petId
            },
            include: [
                {
                    model: Review,
                    attributes: {
                        exclude: ['pet_id']
                    },
                    where: {
                        id: reviewId
                    },
                },
            ]
        }).then(res => {
            const petData = res
            return petData;
        }).catch(e => {
            return console.log('ERROR GETTING SINGLE REVIEW DATA', e);
        })
        // console.log('SINGLE PET DATA BUILD', data);
        return data
    }

    // Grabs A pets  booking by id
    static async petBookings(id) {
        const data = await Booking.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id', 'pet_id', 'user_id'] },
            where: {
                id: id
            },
            include: [
                {
                    model: Owner,
                    attributes: {
                        exclude: ['password', 'email']
                    },
                    include: {
                        model: Comment,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'owner_id', 'user_id', 'booking_id']
                        }
                    }
                },
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'email']
                    },
                    include: {
                        model: Comment,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'owner_id', 'user_id', 'booking_id']
                        }
                    }
                },
                {
                    model: Pet,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
            ]
        }).then(res => {
            const petData = res
            return petData;
        }).catch(e => {
            return console.log('ERROR GETTING  A PETs BOOKING DATA', e);
        })
        // console.log('SINGLE PET DATA BUILD', data);
        return data
    }

    // get all bookings 
    static async bookings() {
        const data = await Booking.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id', 'pet_id', 'user_id'] },
            include: [
                {
                    model: Owner,
                    attributes: {
                        exclude: ['password', 'email']
                    },
                    include: {
                        model: Comment,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'owner_id', 'user_id', 'booking_id']
                        }
                    }
                },
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'email']
                    },
                    include: {
                        model: Comment,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'owner_id', 'user_id', 'booking_id']
                        }
                    }
                },
                {
                    model: Pet,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
            ]
        }).then(res => {
            const bookingData = res.map(el => el.get({ plain: true }))

            if (bookingData == undefined) {
                throw "Booking Data is undefined fetches.js 204"
            } else {
                return bookingData
            }
        }).catch(e => {
            return console.log('ERROR GETTING BOOKING DATA', e);
        })
        // console.log('SINGLE PET DATA BUILD', data);
        return data
    }

    // update booking 
    static async updateBooking(id, status) {


        Booking.update({ status: status }, {
            individualHooks: true,
            where: {
                id: id
            }
        })
            .then(dbBookingData => {
                if (dbBookingData != undefined) {

                    console.log(`\x1b[32mSuccess!\x1b[0m\n\x1b[33mUpdated Booking Id-${id}'s Status to: \x1b[36m${status}\x1b[0m `);
                    const data = dbBookingData
                    return data
                }
                else {
                    // RED
                    console.log("\x1b[31m%s\x1b[0m", `Error Updating Booking Status: Location\nupdateBooking() fetches.js`);
                }
            })
            .catch(err => {
                console.log(err);
                return err
            });


    }
    static async user(id) {
        if (id) {
            try {
                const user = await FetchUser.byId(id);
                return user;
            } catch (error) {
                return console.log('Error fetching user' + id, error);
            }
        } else {
            console.log('Fetching all users')
        }
    }

    static async owner(id) {
        if (id) {
            try {
                const owner = await FetchUser.ownerById(id);
                return owner;
            } catch (error) {
                return console.log('Error fetching owner' + id, error);
            }
        } else {
            console.log('Fetching all owners')
        }
    }

    // loops through data to grab owner id and booking id
    // grabs owner messages for each booking requested
    // could change to accept user params and switch model for owner dashboard
    // SHOULD OF GRABBED BY BOOKING ID BUT WHATEVER
    // INITIALLY THE COMMENTS WERE ONLY GOING TO BE LEFT ON REVIEWS, SO I LACKED THE FORESIGHT OF THE CHAT FUNCTIONALITY, 
    // ADD SOCKET IO LATER FOR REAL CHATS
    static async ownerMessages(data) {
        let messages = []
        for (let i = 0; i <= data.length - 1; i++) {
            const el = data[i];
            const ownerMsgs = await Owner.findAll({
                attributes: { exclude: ['email', 'password'] },
                where: {
                    id: el.owner_id,
                },
                include: [
                    {
                        model: Comment,
                        where: {
                            booking_id: el.id,
                        },

                    },
                ]
            })
                .then(dbCommentData => {
                    const dt = dbCommentData.map(el => el.get({ plain: true }));
                    // console.log('IN LOOP', dt)
                    return dt
                })
                .catch(err => {
                    console.log(err);
                    return err;
                });
            ownerMsgs.map(el=>{messages.push(el)})
        }
        return messages
    }
}



module.exports = FetchData;


