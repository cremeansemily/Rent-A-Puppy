const {withAuth} = require('../utils/auth');

const router = require('express').Router();


router.get('/',  (req, res) => {
   
    res.render('upload')

})


module.exports = router