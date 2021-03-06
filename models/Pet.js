const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Pet extends Model { }

Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: null,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'owner',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2],
                isAlpha: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1],
                isNumeric: true,
                max: 20,
            }
        },
        breed:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [5],
                isAlpha: true
            }
        },
        personality_trait:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [4],
                isAlpha: true
            }
        },
        bio:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [4],
            }
        },
        profile_picture: {
            type: DataTypes.BLOB('long'),
            allowNull: true,
            defaultValue: null,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'pet'
    }
);

module.exports = Pet;