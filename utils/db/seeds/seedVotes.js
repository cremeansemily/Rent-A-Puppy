const { Vote } = require('../../models')
const sequelize = require('../../config/connection');



const voteData = [
    {
        user_id: 4,
    },
    {
        user_id: 1,
    },
    {
        user_id: 3,
    },
    {
        user_id: 1,
    },
    {
        user_id: 2,
    },

];

sequelize
    .sync()
    .then(() => {
        return Vote.bulkCreate(voteData, { individualHooks: false });
    })
    .then(dbSeedData => {
        console.log('++++++++++++++++++++\nVotes successfully seeded!\n++++++++++++++++++++');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });