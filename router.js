const Movie = require("./model");
const { Router } = require("express");

const router = new Router();

router.post("/movies", (req, res, next) => {
  //console.log("sample data", req.body);
  Movie.create(req.body)
    .then(movie => {
      res.json(movie);
    })
    .catch(next);
});

router.get("/movies", (req, res, next) => {
  Movie.findAll({ attributes: ["title"], raw: true })
    .then(movies => {
      res.json(movies);
    })
    .catch(next);
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      res.json(movie);
    })
    .catch(next);
});

router.put("/movies/:id", (req, res) => {
  Movie.findByPk(req.params.id).then(movie =>
    movie
      ? movie.update(req.body).then(movie => res.json(movie))
      : res.status(404).send("cannot find the movie to be updated")
  );
});

router.delete("/movies/:id", (req, res) => {
  Movie.destroy({
    where: {
      id: req.params.id
    }
  }).then(teamDeleted => {
    teamDeleted === 1
      ? res.status(200).send("Movie Deleted")
      : res.status(404).send("sorry Movie not found");
  });
});

module.exports = router;
