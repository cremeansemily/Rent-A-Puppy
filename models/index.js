const User = require('./User');
const Owner = require('./Owner');
const Pet = require('./Pet');
const Review = require('./Review');
const Booking = require('./Booking');
const Vote = require('./Vote');
const Comment = require('./Comment');
// NEED TO DECLARE MODEL ASSOCIATIONS

// ASSOCIATIONS FOR USER AND BOOKINGS
User.hasMany(Booking, {
    foreignKey: 'user_id'
});
Booking.belongsTo(User, {
    foreignKey: 'user_id'
});
// ASSOCIATIONS FOR OWNERS AND PETS
Owner.hasMany(Pet, {
    foreignKey: 'owner_id'
});
Pet.belongsTo(Owner, {
    foreignKey: 'owner_id'
});
// ASSOCIATIONS FOR BOOKINGS, OWNERS, PETS, and USERS
// OWNER
Owner.hasMany(Booking, {
    foreignKey: 'owner_id'
});
Booking.belongsTo(Owner, {
    foreignKey: 'owner_id'
});
// USER
User.hasMany(Booking, {
    foreignKey: 'user_id'
});
Booking.belongsTo(User, {
    foreignKey: 'user_id'
});
// PET
Pet.hasMany(Booking, {
    foreignKey: 'pet_id'
});
Booking.belongsTo(Pet, {
    foreignKey: 'pet_id',
});

// ASSOCIATIONS FOR REVIEWS, PETS, BOOKING
Pet.hasMany(Review, {
    foreignKey: 'pet_id'
});
Review.belongsTo(Pet, {
    foreignKey: 'pet_id'
});
Booking.hasOne(Review, {
    foreignKey: 'booking_id'
});

// ASSOCIATIONS FOR COMMENTS, BOOKING USER, AND OWNER
// OWNER
Owner.hasMany(Comment, {
    foreignKey: 'owner_id'
});
Comment.belongsTo(Owner, {
    foreignKey: 'owner_id'
});
// USER
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
// Booking
Booking.hasMany(Comment, {
    foreignKey: 'booking_id'
});
Comment.belongsTo(Booking, {
    foreignKey: 'booking_id'
});

module.exports = { User, Owner, Pet, Review, Booking, Vote, Comment }