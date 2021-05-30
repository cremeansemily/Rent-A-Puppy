const router = require('express').Router();
const FetchData = require('../utils/api/pet-fetches');
const { User } = require('../models');
// main route- landing page
router.get('/', async (req, res) => {
console.log('HOME ROUTE')
    const fetch = await FetchData.allPets();   
    const data = {
        pet: fetch,
        loggedIn: req.session.loggedIn,
        user: req.session.username
    }
    res.render('home', data)

});

// login route, not for returning a page
router.get('/login', async (req, res) => {

    // if (!req.body.email || !req.body.password) {
    //     let t;
    //     if (!req.body.email) {
    //         t = "Email"
    //     } else {
    //         t = 'Password'
    //     }
    //     return res.status(400).json(t + ' cannot be blank!')
    // }
    console.log(`++++++++++++++++++++`)
    User.findOne({
        where: {
            email: 'user1@email.com',
            
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with that email address!' });
            return;
        }
            req.body.password =  'testtest';
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
    return res.render('error')
});





module.exports = router