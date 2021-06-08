const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'owner',
                key: 'id'
            }
        },
        comment_body:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [2]
            } 
        },
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'booking',
                key: 'id'
            }
        },

    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;