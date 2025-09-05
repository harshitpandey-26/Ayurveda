'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Therapist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey: "userId"}),
      this.hasMany(models.TherapistAvailability,{foreignKey: "therapistId"})
    }
  }
  Therapist.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    educational_qualification: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    experience_years: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1
      }
    },
    price_per_session: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1
      }
    },
    session_duration: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1
      }
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Therapist',
  });
  return Therapist;
};