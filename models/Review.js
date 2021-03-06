const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pet',
                key: 'id'
            }
        },
        stars:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        review:{
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        vote_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'vote',
                key: 'id'
            }
        },
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'booking',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
    }
);

module.exports = Review;