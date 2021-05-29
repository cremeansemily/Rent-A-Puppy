const withAuth = require('../utils/auth');

const router = require('express').Router();


router.get('/', withAuth, (req, res) => {
    console.log(req.session.user_id)
    res.render('upload')

})


module.exports = router