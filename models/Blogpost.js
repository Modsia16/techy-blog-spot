const { Model, DataTypes } = require('sequelize')
const sequelize = require ('../config/connection')

class Blogpost extends Model {}

Blogpost.init(
    {
     id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true
     },
     title: {
         type: DataTypes.STRING,
         allowNull: false,
     },
     content: {
         type: DataTypes.STRING,
         allowNull: false,
     },
     date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "blogpost",
    }
);

module.exports = Blogpost;