const router = require('express').Router();
const konsole = require('../utils/api/konsole');
const log = konsole();
// error route
router.get('/error', async (req, res) => {
    console.log(log.cyan, `+++++++++++++++RENDERING-ERROR-ROUTE+++++++++++++++`);
    return res.render('error');
});

module.exports = router;