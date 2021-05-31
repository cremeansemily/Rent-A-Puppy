const router = require('express').Router();
const FetchData = require('../utils/api/pet-fetches');
const { User } = require('../models');


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
    // TAKE OUT AFTER TESTING 
    // ========================================
    if (!req.body.password) {
        req.body.password = 'testtest';
        req.body.email = 'user1@email.com'
    }
    // ========================================

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
            email: req.body.email,
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
        // SUCCESSFUL LOGIN REDIRECTS BACK TO HOMEPAGE. CAN CHANGE TO USER DASHBOARD IF NEEDED
        res.redirect('/');
    }).catch(e => {
        if (e.errors === 'WHERE parameter "email" has invalid "undefined" value') {
            return res.status(400).json('Email cannot be blank!')
        }
        if (e.errors === 'WHERE parameter "password" has invalid "undefined" value') {
            return res.status(400).json('Password cannot be blank!')
        }
        return console.log('An error occurred while a user attempted to login, home-route 61', e)
    })
    // BELOW CAN BE ADAPTED FOR FRONT_END LEAVE FOR NOW
    // // try {
    // //     const fetch = new Request('login', 'POST');
    // //     await fetch.handler(req, res);
    // // } catch (error) {
    // //     return console.log("UserLogin\n", error)
    // // }

    // let body;
    // if (!req.body.email) {
    //     // REMOVE THIS AFTER TESTING IT SHOULD DISPLAY THAT THE FIELDS ARE EMPTY
    //     body = {
    //         email: 'user1@email.com',
    //         password: 'testtest',
    //     }
    // } else {
    //     body = req.body
    // }
    // const fetch = require('node-fetch');
    // const response = await fetch(this.build(), {
    //     method: this.getMethod(),
    //     body: JSON.stringify(body),
    //     headers: { 'Content-Type': 'application/json' }
    // }).catch(e => {
    //     console.log('Error while fetching login api', e);
    //     return e
    // });
    // const responseData = await response.json();

    // if (responseData.user) {
    //     req.session.save(() => {
    //         req.session.user_id = responseData.user.id;
    //         req.session.username = responseData.user.username;
    //         req.session.loggedIn = true;
    //         res.redirect('/')
    //         return
    //     });
    // }
    // else if (responseData === 'Email cannot be blank!' || responseData === 'Password cannot be blank!') {
    //     const data = {
    //         message: responseData,
    //         redirect: '/user-login'
    //     }
    //     res.render('error', data);
    //     return
    // }
    // else if (!responseData.user && responseData.message) {
    //     const data = {
    //         message: responseData.message,
    //         redirect: '/user-login'
    //     }
    //     res.render('error', data);
    //     return
    // }
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

// error route
router.get('/error', async (req, res) => {
    return res.render('error');
});





module.exports = router