'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TherapistAvailability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Therapist,{foreignKey: "therapistId"}),
      this.hasMany(models.AvailabilitySlot, { foreignKey: "availabilityId",onDelete: "CASCADE" });
    }
  }
  TherapistAvailability.init({
    therapistId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "Therapists",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    day_of_week: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TherapistAvailability',
  });
  return TherapistAvailability;
};