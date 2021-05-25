const router = require('express').Router();

const userRoutes = require('./user-routes.js');
// CREATE ROUTES FOR pets, rating, bookings, reviews
const ownersRoutes = require('./owners-routes');
const petsRoutes = require('./pets-routes.js');
const bookingRoutes = require('./bookings-routes.js');
const reviewRoutes = require('./reviews-routes.js');
router.use('/users', userRoutes);
// added router.use for additional routes
router.use('/owners', ownersRoutes);
router.use('/pets', petsRoutes );
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
module.exports = router;