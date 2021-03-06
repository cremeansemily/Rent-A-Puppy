const { Pet, Owner, Booking, Review, Comment, User } = require('../../models');
const konsole = require('./konsole');
const log = konsole();


const pet = function () {
    return {
        findAll: async function () {
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
                return console.log(log.red, 'ERROR GETTING PET DATA' + e);
            })
            // console.log('PET DATA BUILD', data);
            return data
        },
        findOne: async function (id) {
            return Pet.findOne({
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

                        },
                    },
                ]
            }).then(res => {
                const petData = res.get({ plain: true })
                return petData;
            }).catch(e => {
                return console.log(log.red, 'ERROR GETTING SINGLE PET DATA' + e);
            })
        },
        pupReview: async function (petId, reviewId) {
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
                return console.log(log.red, 'ERROR GETTING SINGLE REVIEW DATA' + e);
            })
            // console.log('SINGLE PET DATA BUILD', data);
            return data
        },
        bookings: async function (id) {
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
                return console.log(log.red, 'ERROR GETTING  A PETs BOOKING DATA' + e);
            })
            // console.log('SINGLE PET DATA BUILD', data);
            return data
        }
    }
}






module.exports = pet