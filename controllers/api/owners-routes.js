const router = require('express').Router();
const { Owner, Pet } = require('../../models');

// GET ALL Owners
router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`);

    Owner.findAll(
        { 
            attributes: { 
                exclude: ['password'] 
            },
            include: [
                // NEED TO BRING IN Owner comments on booking reviews
                // once associations are created, taking this one step at a time
                {
                    model: Pet,
                    attributes: {
                        exclude:['owner_id', 'name','age','breed','personality_trait','bio','profile_picture','createdAt', 'updatedAt']
                    }
                },
            ]
        }
    )
        .then(dbOwnerData => res.json(dbOwnerData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// FIND ONE Owner
router.get('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Owner.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            // NEED TO BRING IN Owner comments on booking reviews
            // once associations are created, taking this one step at a time
            {
                model: Pet,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
        ]
    })
        .then(dbOwnerData => {
            if (!dbOwnerData) {
                res.status(404).json({ message: 'No owner account found with this id' });
                return;
            }
            res.json(dbOwnerData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE A NEW Owner
router.post('/', (req, res,) => {
    console.log(`++++++++++++++++++++`)
    Owner.create({
        ownername: req.body.ownername,
        email: req.body.email,
        password: req.body.password,
    })
        .then(dbOwnerData => {
            req.session.save(() => {
                req.session.owner_id = dbOwnerData.id;
                req.session.ownername = dbOwnerData.ownername;
                req.session.loggedIn = true;
                res.status(201).json({ owner: dbOwnerData });
                return
            })
        })
        .catch(err => {
            console.log(err);
            return
        });
});

// Owner LOGIN
router.post('/login', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Owner.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbOwnerData => {
        if (!dbOwnerData) {
            res.status(404).json({ message: 'No owner account with that email address!' });
            return;
        }
        const validPassword = dbOwnerData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.owner_id = dbOwnerData.id;
            req.session.ownername = dbOwnerData.ownername;
            req.session.loggedIn = true;
            res.status(201).json({ owner: dbOwnerData, message: `Welcome back, ${dbOwnerData.ownername}!` });
        });
        return
    });
});

// LOGOUT
router.post('/logout', (req, res) => {
    console.log(`++++++++++++++++++++`)
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// UPDATE Owner INFO
router.put('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Owner.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbOwnerData => {
            if (!dbOwnerData || dbOwnerData[0] === 0) {
                res.status(404).json({ message: 'No owner accounts found with this id' });
                return;
            }
            res.json(dbOwnerData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE AN Owner
router.delete('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Owner.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbOwnerData => {
            if (!dbOwnerData) {
                res.status(404).json({ message: 'No owner accounts found with this id' });
                return;
            }
            res.json(dbOwnerData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router