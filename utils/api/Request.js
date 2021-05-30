const Fetch = require('./Fetch');
const { Pet, Owner, Booking, Review } = require('../../models');
const sequelize = require('../../config/connection');
class Request extends Fetch {
    constructor(fetchReq, route, view) {
        super(fetchReq, route);
        this.view = view
    }

    // packages data from api fetches and renders page
    async handler(req, res) {
        const fetch = await this.fetchReq();
        const view = this.view;
        // console.log(view, 'line 12, request')
        // HOME VIEW
        if (view === 'home') {
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
            
        }
        // USER LOGIN ROUTE
        if (!view && req.route.path === '/user-login') {
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
        }
        // END USER LOGIN ROUTE

        // PET DASHBOARD
        if (view === 'pet-views/dashboard') {
            const id = await this.fetchReq();
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
                    // const pet = pet.map(el => el.get({ plain: true }));
                    const data = {
                        pet: dbPetData.get({plain:true}),
                        loggedIn: req.session.loggedIn,
                        user: req.session.username
                    }
                    res.render('pet-views/dashboard', data)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                }); 
        }
    }
}

module.exports = Request;