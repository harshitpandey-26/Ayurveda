'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Patients', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    allergies: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    conditions: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE",
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Patients');
}