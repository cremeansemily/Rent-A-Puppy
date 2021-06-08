const { Pet, Owner, Booking, Review, Comment, User } = require('../../models');
const konsole = require('./konsole');
const log = konsole();


const user = function() {
    return{
        findAll: async function () {
           const data = await User.findAll(
                { attributes: { exclude: ['password'] } }
            )
                .then(dbUserData => {return dbUserData})
                .catch(err => {
                    console.log(log.red, err);
                    return err;
                });
                return data
        },
        findOne: async function (id) {
            const data = await User.findOne({
                attributes: { exclude: ['password'] },
                where: {
                    id: id
                },
                include: [
                    {
                        model: Booking,
                        attributes: {
                            exclude: ['owner_id', 'createdAt', 'updatedAt']
                        },
                        include: {
                            model: Comment,
                            include: {
                                model: Owner,
                                attributes: {
                                    exclude: ['password', 'email']
                                }, 
                                include: {
                                    model: Pet,
                                },
                            },
                        },
                    },
                ]
            }).then(async res => {
                // GRAB `COMMENTS` messages from the owners of the bookings
                const userData = res.get({plain:true})
                return userData;
            }).catch(e => {
                return {
                    error: e
                }
            })
            // console.log('SINGLE PET DATA BUILD', data);
            return data
        },

    }
} 


module.exports = user;