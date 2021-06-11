const { Booking } = require('../../models')
const sequelize = require('../../config/connection');
const moment = require('moment');


const bookingData = [
    {
        owner_id: 1,
        user_id: 1,
        pet_id: 1,
        date: moment('05/20/2021'),
    },
    {
        owner_id: 1,
        user_id: 1,
        pet_id: 1,
        date: moment('05/25/2021'),
    },
    {
        owner_id: 2,
        user_id: 4,
        pet_id: 2,
        date: moment('04/22/2021'),
    },
    {
        owner_id: 4,
        user_id: 2,
        pet_id: 4,
        date: moment('05/26/2021'),
    },
    {
        owner_id: 3,
        user_id: 3,
        pet_id: 3,
        date: moment('05/22/2021'),
    },

];

sequelize
    .sync()
    .then(() => {
        return Booking.bulkCreate(bookingData, { individualHooks: false });
    })
    .then(dbSeedData => {
        console.log('++++++++++++++++++++\nBookings successfully seeded!\n++++++++++++++++++++');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });