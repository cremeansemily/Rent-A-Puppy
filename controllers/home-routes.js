const router = require('express').Router();
const FetchData = require('../utils/api/fetches');
const { User, Owner } = require('../models');


// main route- landing page
router.get('/', async (req, res) => {
    console.log('\n++HOME ROUTE++\n')
    try {
        const fetch = await FetchData.allPets();
        const data = {
            pet: fetch,
            loggedIn: req.session.loggedIn,
            user: req.session.username
        }
        return res.render('home', data);
    } catch (err) {
        return console.log('An error occurred hitting the home route', e);
    }
});

// login route, not for returning a page
router.get('/login', async (req, res) => {
    res.redirect('/user/login')
});

// owner login not for returning a page

router.get('/login/owner', async (req, res) => {
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
            res.redirect(`/dashboard/owner/${dbOwnerData.id}`);
        });
        return
    }).catch(e => {
        if (e.errors === 'WHERE parameter "email" has invalid "undefined" value') {
            return res.status(400).json('Email cannot be blank!')
        }
        if (e.errors === 'WHERE parameter "password" has invalid "undefined" value') {
            return res.status(400).json('Password cannot be blank!')
        }
        return console.log('An error occurred while a user attempted to login, home-route 61', e)
    })

});


// logout route, not for returning a page
router.get('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).redirect('/');
        });
    }
    else {
        res.status(404).redirect('/');
    }
});



router.get('/error', async (req, res) => {
    return res.render('error');
});

module.exports = router;



