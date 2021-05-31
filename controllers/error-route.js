const router = require('express').Router();

// error route
router.get('/error', async (req, res) => {
    return res.render('error');
});

module.exports = router;