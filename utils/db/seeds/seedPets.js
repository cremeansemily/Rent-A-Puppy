const { Pet } = require('../../models')
const sequelize = require('../../config/connection');



const petData = [
    {
        owner_id: 1,
        name: 'Zeus',
        age: 3,
        breed: 'American Bulldog',
        personality_trait: 'Loyal',
        bio: 'Will follow you anywhere',
        profile_Picture: null,
        rating: 5,
    },
    {
        owner_id: 2,
        name: 'Luca',
        age: 2,
        breed: 'Saint Bernard',
        personality_trait: 'Playful',
        bio: 'Loves company',
        profile_Picture: null,
        rating: 4
    },
    {
        owner_id: 3,
        name: 'Zia',
        age: 5,
        breed: 'Harrier',
        personality_trait: 'Friendly',
        bio: 'Great Dog, loves to play',
        profile_Picture: null,
        rating: 5
    },
    {
        owner_id: 4,
        name: 'Pippi',
        age: 7,
        breed: 'Old English Sheepdog',
        personality_trait: 'Smart',
        bio: 'Pippi loves all animals',
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
