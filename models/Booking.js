const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Booking extends Model {}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'owner',
                key: 'id'
            }
        },
        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pet',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Scheduled'
            // Values
            // Scheduled, Active, Completed
        },
      
        
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'booking'
    }
);

module.exports = Booking;