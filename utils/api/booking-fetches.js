const { Pet, Owner, Booking, Review, Comment, User } = require('../../models');
async function all() {
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

async function editBook(id, status) {
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
                console.log("\x1b[31m%s\x1b[0m", `Error Updating Booking Status`);
            }
        })
        .catch(err => {
            console.log("\x1b[31m%s\x1b[0m", err);
            return err
        });
}

module.exports = { all, editBook }