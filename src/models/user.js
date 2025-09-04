'use strict';

import { Model } from 'sequelize';
import { ROLES } from '../utils/common/enum.js';

const {THERAPIEST,PATIENT} = ROLES;

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    role: {
      type:DataTypes.ENUM,
      allowNull: false,
      values: [PATIENT,THERAPIEST],
      defaultValue: PATIENT
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};