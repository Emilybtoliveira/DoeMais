'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }

  Email.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    to: { type: DataTypes.STRING },
    subject: { type: DataTypes.STRING },
    text: { type: DataTypes.STRING },
    html: { type: DataTypes.STRING },
  }, {
    sequelize,
    modelName: 'Email',
    // dont use createdAt/update
    timestamps: false,
  });

  return Email;
};