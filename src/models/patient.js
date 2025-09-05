'use strict';
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey: "userId"})
    }
  }
  Patient.init({
    age: {
      type:DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type:DataTypes.STRING,
      allowNull: true
    },
    allergies: {
      type:DataTypes.TEXT,
      allowNull: true
    },
    conditions: {
      type:DataTypes.TEXT,
      allowNull: true
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE",
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};