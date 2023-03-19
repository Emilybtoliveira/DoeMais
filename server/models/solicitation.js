'use strict';
const { Model } = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Solicitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Solicitation.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    status: {type:DataTypes.STRING(15), allowNull: false},
    creation_date: DataTypes.DATEONLY,
    closure_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Solicitation',
    timestamps: false
  });

  Solicitation.associate = function(models) {
    Solicitation.belongsTo(models.Solicitation_Person, {
      as: 'person',
      foreignKey: 'solicitationPersonId',
      onDelete: 'CASCADE'
    }),

    Solicitation.belongsTo(models.User, {
      as: 'user', 
      foreignKey: 'solicitationUserId',
      onDelete: 'CASCADE'
    })
  };

  return Solicitation;
};