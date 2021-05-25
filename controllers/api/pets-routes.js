const router = require('express').Router();
const { Pet, Owner, Booking, Review, Comment, } = require('../../models');
// const { Op } = require('sequelize');
// GET ALL Pets
router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`);

    Pet.findAll(
        {
            attributes: { 
                exclude: ['createdAt','updatedAt', 'owner_id'] 
            },
            include: [
                // NEED TO BRING IN THE OTHER MODELS
                {
                    model: Owner,
                    attributes: {
                        exclude: ['password', 'email']
                    }
                },
                {
                    model: Booking,
                    exclude:{
                        status: "Completed"
                    }
                },
                {
                    model: Review,
                },
            ]
        },
    )
        .then(dbPetData => res.json(dbPetData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// FIND ONE Pet
router.get('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Pet.findOne({
        attributes: { exclude: ['createdAt','updatedAt', 'owner_id'] },
        where: {
            id: req.params.id
        },
        include: [
            // NEED TO BRING IN THE OTHER MODELS
            {
                model: Owner,
                attributes: {
                    exclude: ['password', 'email']
                }
            },
            {
                model: Booking,
            },
            {
                model: Review,
            },
        ]
    })
        .then(dbPetData => {
            if (!dbPetData) {
                res.status(404).json({ message: 'No pets found with this id' });
                return;
            }
            res.json(dbPetData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE A NEW Pet
router.post('/', (req, res,) => {
    console.log(`++++++++++++++++++++`)
    Pet.create({
        owner_id: req.body.owner_id,
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        personality_trait: req.body.personality_trait,
        bio: req.body.bio,
        profile_picture: req.body.profile_picture
    })
        .then(dbPetData => {
            res.status(201).json({dbPetData})
        })
        .catch(err => {
            console.log(err);
            return
        });
});

// UPDATE Pet INFO
router.put('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Pet.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbPetData => {
            if (!dbPetData || dbPetData[0] === 0) {
                res.status(404).json({ message: 'No pets found with this id' });
                return;
            }
            res.json(dbPetData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE A Pet
router.delete('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Pet.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPetData => {
            if (!dbPetData) {
                res.status(404).json({ message: 'No pets found with this id' });
                return;
            }
            res.json(dbPetData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router