const router = require('express').Router();

// main route- landing page
router.get('/', async (req, res) => {
    console.log('\n++HOME ROUTE++\n')
        return res.render('home', );  
});

// login route, not for returning a page
router.get('/login', async (req, res) => {
    res.redirect('/user/login')
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



