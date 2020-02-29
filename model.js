const Sequelize = require("sequelize");
const db = require("./db");

const Movie = db.define("movies", {
  title: {
    type: Sequelize.STRING,
    field: "Title"
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    field: "Year of Release"
  },
  synopsis: {
    type: Sequelize.STRING,
    field: "synopsis"
  }
});

module.exports = Movie;
