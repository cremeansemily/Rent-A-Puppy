const router = require('express').Router();


router.get('/', async (req, res) => {

    res.render('upload')

})


module.exports = router