'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Therapists', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    educational_qualification: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    experience_years: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate:{
        min:1
      }
    },
    price_per_session: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate:{
        min:1
      }
    },
    session_duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate:{
        min:1
      }
    },
    userId: {
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE"
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
  await queryInterface.dropTable('Therapists');
}