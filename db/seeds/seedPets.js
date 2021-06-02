const { Pet } = require('../../models')
const sequelize = require('../../config/connection');



const petData = [
    {
        owner_id: 1,
        name: 'Zeus',
        age: 3,
        breed: 'American Bulldog',
        personality_trait: 'Loyal',
        bio: 'takes 5 car rides a week. Owns too many tennnis balls. Has been playing with the same stuffed animal for the last 3 years.',
        profile_Picture: null,
        rating: 5,
    },
    {
        owner_id: 2,
        name: 'Luca',
        age: 2,
        breed: 'Saint Bernard',
        personality_trait: 'Playful',
        bio: 'Part-time ninja. Wakes up at 5:45 every morning to bark. Enjoys cottage cheese as a mid-morning snack.',
        profile_Picture: null,
        rating: 4
    },
    {
        owner_id: 3,
        name: 'Zia',
        age: 5,
        breed: 'Harrier',
        personality_trait: 'Friendly',
        bio: 'Loves her for her shoes to match her outsits. Lays around on the couch all day watching old episodes of friends.',
        profile_Picture: null,
        rating: 5
    },
    {
        owner_id: 4,
        name: 'Pippi',
        age: 7,
        breed: 'Old English Sheepdog',
        personality_trait: 'Smart',
        bio: 'Tennis ball chasing champ. Speed walks 5 times a week & volunteers at her local pet shelter on her days off. ',
        profile_Picture: null,
        rating: 1
    }
];

sequelize
    .sync()
    .then(() => {
       return Pet.bulkCreate(petData, {individualHooks: false});
    })
    .then(dbSeedData => {
            console.log('++++++++++++++++++++\nPets successfully seeded!\n++++++++++++++++++++');
            process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
