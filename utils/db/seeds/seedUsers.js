const { User, Owner } = require('../../models')
const sequelize = require('../../config/connection');

const userData = [
    {
        username: 'User1',
        email: 'user1@email.com',
        password: 'testtest'
    },
    {
        username: 'User2',
        email: 'user2@email.com',
        password: 'testtest'
    },
    {
        username: 'User3',
        email: 'user3@email.com',
        password: 'testtest'
    },
    {
        username: 'User4',
        email: 'user4@email.com',
        password: 'testtest'
    }
];

const ownerData = [
    {
        ownername: 'Owner1',
        email: 'owner1@email.com',
        password: 'testtest'
    },
    {
        ownername: 'Owner2',
        email: 'owner2@email.com',
        password: 'testtest'
    },
    {
        ownername: 'Owner3',
        email: 'owner3@email.com',
        password: 'testtest'
    },
    {
        ownername: 'Owner4',
        email: 'owner4@email.com',
        password: 'testtest'
    }
];


sequelize
    .sync()
    .then(() => {
        return (User.bulkCreate(userData, { individualHooks: true }), Owner.bulkCreate(ownerData, { individualHooks: true }));
    })
    .then(dbSeedData => {
            console.log('++++++++++++++++++++\nUsers and Owners successfully seeded!\n++++++++++++++++++++');
            process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
