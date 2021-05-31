const router = require('express').Router();
const { Pet, Owner, Booking, Review } = require('../../models');
// GET ALL Pets
router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`);

    Pet.findAll(
        {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'owner_id']
            },
            include: [
                {
                    model: Owner,
                    attributes: {
                        exclude: ['password', 'email']
                    }
                },
                {
                    model: Booking,
                    attributes: {
                        exclude: ['owner_id', 'pet_id', 'createdAt', 'updatedAt']
                    },
                    exclude: {
                        status: "Completed"
                    }
                },
                {
                    model: Review,
                    attributes: {
                        exclude: ['pet_id']
                    },
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
    console.log(`+++++++++PETS+++++++++++`)
    Pet.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Owner,
                attributes: {
                    exclude: ['password', 'email']
                }
            },
            {
                model: Booking,
                attributes: {
                    exclude: ['owner_id', 'pet_id', 'createdAt', 'updatedAt']
                },
                exclude: {
                    status: "Completed"
                }
            },
            {
                model: Review,
                attributes: {
                    exclude: ['pet_id']
                },
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
    })
        .then(dbPetData => {
            res.status(201).json({ dbPetData })
        })
        .catch(err => {
            console.log(err);
            return
        });
});
// ROUTE FOR PET PICTURE
router.post('/upload/:id', (req, res) => {
    console.log(`++++++++++++++++++++\nupload route`)

    if (req.files == null) {
        console.log('No img uploaded, resetting form')
        res.status(205).json('You must upload an image!');
        return
    } else {
        const type = req.files.file.mimetype;
        const imgData = req.files.file.data;
        if (type === 'image/png' || type === 'image/jpeg' || type === 'image/gif') {


            Pet.update({ profile_picture: imgData }, {
                where: {
                    id: req.params.id
                }
            }).then(pictureData => {
                res.status(201).json('Image successfully uploaded!');
                return
            }).catch(e => {
                console.log(e)
            })
        } else {
            console.log(type)
            console.log('File type unsupported, ignoring request');
            res.status(415).json('File type is not supported! Please upload a supported image!');
            return

        }

    }




})

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