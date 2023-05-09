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
    blood_type: { type: DataTypes.STRING(12) },
    flag_chat: { type: DataTypes.BOOLEAN },
    gender: { type: DataTypes.STRING(10), allowNull: false },
    aptitude_status: { type: DataTypes.STRING(15)},
  }, {
    sequelize,
    modelName: 'Donator',
    // dont use createdAt/update
    timestamps: false,
  });

  Donator.associate = function(models) {
    Donator.hasMany(models.DonationRegister, {
        as: 'donationsRegistry',
        foreignKey: 'donatorDonationRegisterId',
        onDelete: 'CASCADE'
    }),

    Donator.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    }),

    Donator.belongsTo(models.Campaign, {
      foreignKey: 'campaignId',
      onDelete: 'CASCADE'
    })
  }; 

  return Donator;
};