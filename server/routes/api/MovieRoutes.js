const express = require('express');
const router = express.Router();
const Movie = require('../../models/MovieModel');

// @route   Get api/movies
// @desc    display movies?
// @access  Public
router.get('/movies/search/:query', (req, res) => {
  res.send('you got a movie!');
})

// @route   Post api/movies
// @desc    save movie list to mlab
// @access  Public
router.post('/movies/:user/list', (req, res) => {
  // const user = get user name

})

// @route   Delete api/movies
// @desc    delete movies
// @access  Public
router.delete('/movies/:user/list/:movieId', (req, res) => {
  Movie.findByIdAndRemove(req.params.id).exec()
    .then(movie => res.json(movie))
    .catch(err => console.log(err));
})

// @route   Delete api/movies
// @desc    delete list
// @access  Public
router.delete('/movies/:user/list/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id).exec()
    .then(list => res.json(list))
    .catch(err => console.log(err));
})

module.exports = router;