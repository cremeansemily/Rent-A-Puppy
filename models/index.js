const User = require('./User');
const Owner = require('./Owner');
const Pet = require('./Pet');
const Review = require('./Review');
const Booking = require('./Booking');
const Vote = require('./Vote');
const Comment = require('./Comment');
// NEED TO DECLARE MODEL ASSOCIATIONS

// ASSOCIATIONS FOR USER AND BOOKINGS
User.hasMany(Booking,{
    foreignKey: 'user_id'
});
Booking.belongsTo(User,{
    foreignKey: 'user_id'
});
module.exports = { User, Owner, Pet, Review, Booking, Vote, Comment }