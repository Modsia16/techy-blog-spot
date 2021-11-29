const { Model, DataTypes } = require('sequelize')
const sequelize = require ('../config/connection')

class Blogpost extends Model {}

Blogpost.init (
    {
     id: {
         type: DataTypes.INTERGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true
     },
     title: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
             len: [1, 50]
         }
     },
     entry: {
         type: DataTypes.TEXT,
         allowNull: false,
     },
     date_published: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW
     },
     author: {
        type: DataTypes.INTERGER,
        references: {
            model:'user',
            key: 'id'
        }
     },
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