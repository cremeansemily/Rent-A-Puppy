const router = require('express').Router();
const Request = require('../utils/api/Request');
// main route- landing page
router.get('/', async (req, res) => {
    try {
        // custom function 
        // takes 3 arguments, 
        // 1.) the api route name
        // 2.) the request type, GET, POST, PUT, DELETE
        // 3.) Optional, View to be rendered
        // THE .handler(req,res) MUST ACCOMPANY a Request
        // passes in the req if any and gives access to the res

        const fetch = new Request('pets', 'GET', 'home');
        await fetch.handler(req, res);
    } catch (error) {
        return console.log("HomeRoute\n", error)
    }
});

// login route, not for returning a page
router.get('/login', async (req, res) => {
    try {
        const fetch = new Request('login', 'POST');
        await fetch.handler(req, res);
    } catch (error) {
        return console.log("UserLogin\n", error)
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