const router = require('express').Router();
const konsole = require('../utils/api/konsole');
const log = konsole();
// main route- landing page
router.get('/', async (req, res) => {
    console.log(log.cyan, `+++++++++++++++MAIN-ROUTE+++++++++++++++`);
        return res.render('home', );  
});

// login route, not for returning a page
router.get('/login', async (req, res) => {
    console.log(log.cyan, `+++++++++++++++USER-LOGIN-ROUTE+++++++++++++++`);
    res.redirect('/user/login')
});

// logout route, not for returning a page
router.get('/logout', async (req, res) => {
    console.log(log.cyan, `+++++++++++++++LOGOUT-ROUTE+++++++++++++++`);
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
    console.log(log.cyan, `+++++++++++++++RENDERING-ERROR-ROUTE+++++++++++++++`);
    return res.render('error');
});

module.exports = router;



