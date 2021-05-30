const router = require('express').Router();
const Request = require('../utils/api/Request');


// pet dashboard
router.get('/:id', async (req, res) => {
    const r = `pet/${req.params.id}`
    try {
        const fetch = new Request(r, 'GET', 'pet-views/dashboard');
        await fetch.handler(req, res);
        // return res.render('pet-views/dashboard')
    } catch (error) {
        console.log("pet dashboard\n", error)
    }
   
});


module.exports = router;