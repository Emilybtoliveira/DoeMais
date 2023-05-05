'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }

  Admin.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  }, {
    sequelize,
    modelName: 'Admin',
    // dont use createdAt/update
    timestamps: false,
  });

  Admin.associate = function(models) {
    Admin.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })

    Admin.hasMany(models.Campaign, {
      as: 'campaigns',
      foreignKey: 'adminCampaignId',
      onDelete: 'CASCADE'
    })
  };

  return Admin;
};