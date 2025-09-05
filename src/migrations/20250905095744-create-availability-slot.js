'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('AvailabilitySlots', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    availabilityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model: "TherapistAvailabilities",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    start_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    end_time: {
      type: Sequelize.TIME,
      allowNull: false
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
  await queryInterface.dropTable('AvailabilitySlots');
}