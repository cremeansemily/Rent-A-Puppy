const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// TURN ON LATER AFTER TESTING
// const dashboardRoutes = require('./dashboard-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
// TURN ON LATER FOR HOME PAGE AND USER DASHBOARD

// router.use('/dashboard', dashboardRoutes);
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;