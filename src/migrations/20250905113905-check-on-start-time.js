"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.addConstraint("AvailabilitySlots", {
    fields: ["start_time", "end_time"],
    type: "check",
    name: "check_start_before_end",
    where: {
      start_time: { [Sequelize.Op.lt]: Sequelize.col("end_time") },
    },
  });
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  await queryInterface.removeConstraint("AvailabilitySlots", "check_start_before_end");
}
