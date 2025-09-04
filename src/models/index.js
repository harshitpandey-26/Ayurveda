import path, { basename as _basename, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { readdirSync } from "fs";
import Sequelize, { DataTypes } from "sequelize";
import configFile from "../config/config.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = _basename(__filename);

const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Load all models dynamically
for (const file of readdirSync(__dirname)) {
  if (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === ".js" &&
    !file.endsWith(".test.js")
  ) {
    const modelPath = join(__dirname, file);
    const { default: modelDefiner } = await import(
      pathToFileURL(modelPath).href
    );
    const model = modelDefiner(sequelize, DataTypes);
    db[model.name] = model;
  }
}

// Run associate() if present
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
