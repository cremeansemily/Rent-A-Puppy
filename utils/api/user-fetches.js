const { Pet, Owner, Booking, Review, Comment, User } = require('../../models');
const sequelize = require('../../config/connection');
// grabs single user
class FetchUser {
    static async byId(id) {
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
    }

    static async ownerById(id) {
        const data = await Owner.findOne({
            attributes: { exclude: ['password', 'email'] },
            where: {
                id: id
            },
            include: [
                {
                    model: Pet,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: Booking,
                    attributes: {
                        exclude: ['owner_id', 'createdAt', 'updatedAt']
                    },
                    include: {
                        model: Comment,
                        include: {
                            model: User,
                            attributes: {
                                exclude: ['password', 'email']
                            },
                        },
                    },
                    include: {
                        model: User,
                        attributes: {
                            exclude: ['password', 'email']
                        },
                    },
                   
                },
            ]
        }).then(res => {
            const ownerData = res.get({plain:true})
            return ownerData;
        }).catch(e => {
            return console.log("\x1b[31m%s\x1b[0m", 'Error Getting ownerData' + e);
        })
        // console.log('SINGLE PET DATA BUILD', data);
        return data
    }
}

module.exports = FetchUser;