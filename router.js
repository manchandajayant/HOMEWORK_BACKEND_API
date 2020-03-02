const Movie = require("./model");
const { Router } = require("express");

const router = new Router();

//LOG A NEW MOVIE
router.post("/movies", (req, res, next) => {
  //console.log("sample data", req.body);
  Movie.create(req.body)
    .then(movie => {
      res.json(movie);
    })
    .catch(next);
});

//COUNT AND RENDER THE TOTAL LIST WITH LIMIT AND OFFSET DECIDED BY THE USER
router.get("/movies", (req, res, next) => {
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;
  Movie.findAndCountAll({
    attributes: ["title", "yearOfRelease", "synopsis"],
    raw: true,
    limit,
    offset
  })
    .then(movieList =>
      res.send(res.json({ movies: movieList, total: movieList.count }))
    )
    .catch(next);
});

//FIND A SINGLE MOVIE
router.get("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      res.json(movie);
    })
    .catch(next);
});

//UPDATE A SINGLE MOVIE
router.put("/movies/:id", (req, res) => {
  Movie.findByPk(req.params.id).then(movie =>
    movie
      ? movie.update(req.body).then(movie => res.json(movie))
      : res.status(404).send("cannot find the movie to be updated")
  );
});

//DELETE A SINGLE MOVIE
router.delete("/movies/:id", (req, res) => {
  Movie.destroy({
    where: {
      id: req.params.id
    }
  }).then(teamDeleted => {
    teamDeleted === 1
      ? res.status(200).send("Movie Deleted")
      : res.status(404).send("Sorry Movie Not Found");
  });
});

module.exports = router;
