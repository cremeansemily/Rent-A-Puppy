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

    static async user(id) {
        if (id) {
            try {
                const user = await FetchUser.byId(id);
                return user;
            } catch (error) {
                return console.log('Error fetching user' + id, error);
            }
        }else{
            console.log('Fetching all users')
        }
    }

    static async owner(id){
if (id) {
            try {
                const owner = await FetchUser.ownerById(id);
                return owner;
            } catch (error) {
                return console.log('Error fetching owner' + id, error);
            }
        }else{
            console.log('Fetching all owners')
        }
    }

}



module.exports = FetchData;


