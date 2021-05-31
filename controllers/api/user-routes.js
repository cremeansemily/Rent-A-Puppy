const router = require('express').Router();
const { User, Booking } = require('../../models');

const FetchUser = require('../../utils/api/user-fetches');

// GET ALL USERS
router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`);

    User.findAll(
        { attributes: { exclude: ['password'] } }
    )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });
});

// FIND ONE USER
router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`++++++++++++++++++++`)
    try {
        const fetch = await FetchUser.byId(id);

        if (fetch != undefined) {
            if (fetch.error) {
                res.status(400).json({ message: 'Invalid Parameters' });
            } else {
                const user = await fetch.get({ plain: true });
               return res.status(200).json(user);
            }

        } else {
            console.log(fetch)
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
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
    if (!req.body.email || !req.body.password) {
        let t;
        if (!req.body.email) {
            t = "Email"
        } else {
            t = 'Password'
        }
        return res.status(400).json(t + ' cannot be blank!')
    }
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
        res.status(200).json({ user: dbUserData, message: `Welcome back, ${dbUserData.username}!` });
        return

    }).catch(e => {
        if (e.errors === 'WHERE parameter "email" has invalid "undefined" value') {
            return res.status(400).json('Email cannot be blank!')
        }
        if (e.errors === 'WHERE parameter "password" has invalid "undefined" value') {
            return res.status(400).json('Password cannot be blank!')
        }
    })
});

// LOGOUT
router.post('/logout', (req, res) => {
    console.log(`++++++++LOGOUT++++++++++++`)
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).redirect('/');
        });
    }
    else {
        res.status(404).redirect('/');
    }
});

// UPDATE USER INFO
router.put('/:id', (req, res) => {
    console.log(`++++++++UPDATEUSER++++++++++++`)
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