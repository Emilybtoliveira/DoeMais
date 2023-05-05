'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DonationRegister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }

  DonationRegister.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    place: { type: DataTypes.STRING, allowNull: true },
    validated: { type: DataTypes.BOOLEAN },
    validated_at: { type: DataTypes.DATEONLY },
    hashedId: { type: DataTypes.STRING }
  }, {
    sequelize,
    modelName: 'DonationRegister',
    timestamps: false
  });

  DonationRegister.associate = function(models) {
    DonationRegister.belongsTo(models.Donator, {
        as: 'donator',
        foreignKey: 'donatorDonationRegisterId',
        onDelete: 'CASCADE'
    })
  };

  return DonationRegister;
};