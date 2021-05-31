const router = require('express').Router();


// login page-user
router.get('/login', async (req, res) => {
    if(req.session.user_id){
        return res.redirect(`/dashboard/user/${req.session.user_id}`);
    }else{
    return res.render('user-views/login')
    }
    
});
// Signup page-user
router.get('/signup', (req, res) => {
    return res.render('user-views/sign-up')
});

module.exports = router;