'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }

  User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING(40), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING(20) },
  }, {
    sequelize,
    modelName: 'User',
    // dont use createdAt/update
    timestamps: false,
  });

  User.associate = function(models) {
    User.hasOne(models.Donator, {
      as: 'donator',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    }),

    User.hasMany(models.Solicitation, {
      as: 'solicitations',
      foreignKey: 'solicitationUserId',
      onDelete: 'CASCADE'
    })
  };

  return User;
};