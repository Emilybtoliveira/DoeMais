'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CampaignWinner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }

  CampaignWinner.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  }, {
    sequelize,
    modelName: 'CampaignWinner',
    // dont use createdAt/update
    timestamps: false,
  });

  CampaignWinner.associate = function(models) {
    CampaignWinner.belongsTo(models.Donator, {
      foreignKey: 'donatorId',
      onDelete: 'CASCADE'
    })

    CampaignWinner.belongsTo(models.Campaign, {
      as: 'campaigns',
      foreignKey: 'campaignId',
      onDelete: 'CASCADE'
    })
  };

  return CampaignWinner;
};