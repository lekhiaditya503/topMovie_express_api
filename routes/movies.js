const express = require('express')
const {
  getMovies, 
  getMovie, 
  createMovie, 
  deleteMovie, 
  updateMovie
} = require('../controllers/movieController')

const router = express.Router()

// GET all Movies
router.get('/', getMovies)

// GET a single Movie
router.get('/:id', getMovie)

// POST a new Movie
router.post('/', createMovie)

// DELETE a Movie
router.delete('/:id', deleteMovie)

// UPDATE a Movie
router.patch('/:id', updateMovie)

module.exports = router