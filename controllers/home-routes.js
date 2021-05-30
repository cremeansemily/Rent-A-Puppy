const router = require('express').Router();
// const Request = require('../utils/api/Request');
const { Pet, Owner, Booking, Review } = require('../models');
// main route- landing page
router.get('/', async (req, res) => {
    // try {
    //     // custom function 
    //     // takes 3 arguments, 
    //     // 1.) the api route name
    //     // 2.) the request type, GET, POST, PUT, DELETE
    //     // 3.) Optional, View to be rendered
    //     // THE .handler(req,res) MUST ACCOMPANY a Request
    //     // passes in the req if any and gives access to the res

    //     const fetch = new Request('pets', 'GET', 'home');
    //     await fetch.handler(req, res);
    // } catch (error) {
    //     return console.log("HomeRoute\n", error)
    // }

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
        .then(dbPetData => {
            let fetch = dbPetData.map(el => el.get({ plain: true }));
            const data = {
                pet: fetch,
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            res.render('home', data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login route, not for returning a page
router.get('/login', async (req, res) => {
    // try {
    //     const fetch = new Request('login', 'POST');
    //     await fetch.handler(req, res);
    // } catch (error) {
    //     return console.log("UserLogin\n", error)
    // }

    let body;
            if (!req.body.email) {
                // REMOVE THIS AFTER TESTING IT SHOULD DISPLAY THAT THE FIELDS ARE EMPTY
                body = {
                    email: 'user1@email.com',
                    password: 'testtest',
                }
            } else {
                body = req.body
            }
            const fetch = require('node-fetch');
            const response = await fetch(this.build(), {
                method: this.getMethod(),
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            }).catch(e => {
                console.log('Error while fetching login api', e);
                return e
            });
            const responseData = await response.json();

            if (responseData.user) {
                req.session.save(() => {
                    req.session.user_id = responseData.user.id;
                    req.session.username = responseData.user.username;
                    req.session.loggedIn = true;
                    res.redirect('/')
                    return
                });
            }
            else if (responseData === 'Email cannot be blank!' || responseData === 'Password cannot be blank!') {
                const data = {
                    message: responseData,
                    redirect: '/user-login'
                }
                res.render('error', data);
                return
            }
            else if (!responseData.user && responseData.message) {
                const data = {
                    message: responseData.message,
                    redirect: '/user-login'
                }
                res.render('error', data);
                return
            }
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