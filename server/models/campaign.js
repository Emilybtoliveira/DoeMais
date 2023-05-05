'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }

  Campaign.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING },
    reward: { type: DataTypes.STRING },
    start_date: { type: DataTypes.DATEONLY },
    end_date: { type: DataTypes.DATEONLY },
    number_winners: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
    is_open: { type: DataTypes.BOOLEAN }
  }, {
    sequelize,
    modelName: 'Campaign',
    // dont use createdAt/update
    timestamps: false,
  });

  Campaign.associate = function(models) {
    Campaign.belongsTo(models.Admin, {
        as: 'admin',
        foreignKey: 'adminCampaignId',
        onDelete: 'CASCADE'
    }),

    Campaign.hasMany(models.Donator, {
      as: 'donators',
      foreignKey: 'campaignId',
      onDelete: 'CASCADE'
    })
  };

  return Campaign;
};