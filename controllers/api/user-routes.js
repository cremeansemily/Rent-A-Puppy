const router = require('express').Router();
const { User, Booking } = require('../../models');

// GET ALL USERS
router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`);

    User.findAll(
        { attributes: { exclude: ['password'] } }
    )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// FIND ONE USER
router.get('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Booking,
            },
            
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE A NEW USER
router.post('/', (req, res,) => {
    console.log(`++++++++++++++++++++`)
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.status(201).json({ user: dbUserData });
                return
            })
        })
        .catch(err => {
            const errMsg = ((err.errors[0].message).split('.')[1]).toUpperCase()
            return res.status(409).json(errMsg)
        });
});

// USER LOGIN
router.post('/login', (req, res) => {
    console.log(`++++++++++++++++++++`)
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with that email address!' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.status(201).json({ user: dbUserData, message: `Welcome back, ${dbUserData.username}!` });
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

// UPDATE USER INFO
router.put('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData || dbUserData[0] === 0) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE A USER
router.delete('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router