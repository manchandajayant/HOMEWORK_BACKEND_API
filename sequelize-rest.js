const express = require("express");

const bodyParser = require("body-parser");

const movieRouter = require("./router");

const db = require("./db");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(movieRouter);

app.listen(port, () => console.log(`on port ${port}`));
