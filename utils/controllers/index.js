const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const uploadRoute = require('./upload-routes');
const userRoutes = require('./user-routes');
const ownerRoutes = require('./owner-routes');
const petRoutes = require('./pet-routes');
const reviewRoutes = require('./review-routes');
const bookingRoutes = require('./booking-routes');
const dashboardRoutes = require('./dashboard-routes');
const errorRoute = require('./error-route.js');
// TURN ON LATER AFTER TESTING
// const dashboardRoutes = require('./dashboard-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/upload-test', uploadRoute);
router.use('/error', errorRoute);
router.use('/user', userRoutes);
router.use('/owner', ownerRoutes);
router.use('/pet', petRoutes);
router.use('/reviews', reviewRoutes);
router.use('/booking', bookingRoutes);
router.use('/review', reviewRoutes);
router.use('/dashboard', dashboardRoutes);
router.use((req, res) => {
    return res.status(404).redirect('/error');
});

module.exports = router;