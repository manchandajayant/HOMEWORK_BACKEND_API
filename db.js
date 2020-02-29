const Sequalize = require("sequelize");
const databaseUrl = "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequalize(databaseUrl);

db.sync()
  .then(() => console.log("Database is Synced"))
  .catch(console.error);

module.exports = db;
