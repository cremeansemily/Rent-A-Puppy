const Fetch = require('./Fetch.js');

class Request extends Fetch {
    constructor(fetchReq, route, view) {
        super(fetchReq, route);
        this.view = view
    }

    async handler(req, res) {
        const fetch = await this.fetchReq();
        const view = this.view;
        // HOME VIEW
        if (view === 'home') {
            const data = {
                pet: fetch,
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            res.render('home', data)
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
            console.log(responseData)
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

    }
}

module.exports = Request;