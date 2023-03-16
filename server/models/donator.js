'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }

  Donator.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    blood_type: { type: DataTypes.STRING(60), allowNull: false },
    flag_chat: { type: DataTypes.BOOLEAN },
    gender: { type: DataTypes.STRING(20), allowNull: false },
    aptitude_status: { type: DataTypes.STRING(20), allowNull: false},
  }, {
    sequelize,
    modelName: 'Donator',
    // dont use createdAt/update
    timestamps: false,
  });

  Donator.associate = function(models) {
    Donator.hasOne(models.User, {
      foreignKey: 'DonatorId'
    })
  };

  return Donator;
};