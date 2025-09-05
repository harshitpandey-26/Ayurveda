"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class AvailabilitySlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TherapistAvailability, {
        foreignKey: "availabilityId",
        onDelete: "CASCADE"
      });
    }
  }
  AvailabilitySlot.init(
    {
      availabilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
        model: "TherapistAvailability",
        key: "id"
      },
      onDelete: "CASCADE"
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          isGreaterThanStart(value) {
            if (this.start_time && value <= this.start_time) {
              throw new Error("end_time must be greater than start_time");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "AvailabilitySlot",
    }
  );
  return AvailabilitySlot;
};
