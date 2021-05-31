const { Pet, Owner, Booking, Review, Comment, User } = require('../../models');
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
                },

            ]
        }).then(res => {
            const userData = res
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
            attributes: { exclude: ['password'] },
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
                    exclude: {
                        status: "Completed"
                    }
                },
            ]
        }).then(res => {
            const ownerData = res
            return ownerData;
        }).catch(e => {
            return console.log('ERROR GETTING SINGLE OWNER DATA', e);
        })
        // console.log('SINGLE PET DATA BUILD', data);
        return data
    }
}

module.exports = FetchUser;