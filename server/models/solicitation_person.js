'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Solicitation_Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Solicitation_Person.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type:DataTypes.STRING(60), allowNull: false},
    bloodtype: { type:DataTypes.STRING(5), allowNull: false},
    description: { type:DataTypes.STRING(200) },
    picture: DataTypes.STRING,
    age:  DataTypes.INTEGER,
    city: { type: DataTypes.STRING, allowNull: false},
    state: { type: DataTypes.STRING, allowNull: false},
    hospital:{ type: DataTypes.STRING(60) }
  }, {
    sequelize,
    modelName: 'Solicitation_Person',
    timestamps: false
  });
  
  
  Solicitation_Person.associate = function(models) {
    Solicitation_Person.hasOne(models.Solicitation, {
      foreignKey: 'solicitationPersonId',
      onDelete: 'CASCADE'
    })
  };  
  
  return Solicitation_Person;
};