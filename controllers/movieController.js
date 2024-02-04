const Movie = require('../models/movieModel')
const mongoose = require('mongoose')

// get all movies
const getMovies = async (req, res) => {
  const movies = await Movie.find({}).sort({createdAt: -1})

  res.status(200).json(movies)
}

// get a single movie
const getMovie = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such movie'})
  }

  const movie = await Movie.findById(id)

  if (!movie) {
    return res.status(404).json({error: 'No such movie'})
  }

  res.status(200).json(movie)
}

// create a new movie
const createMovie = async (req, res) => {
  const {title, load, reps} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const movie = await Movie.create({ title, load, reps })
    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a movie
const deleteMovie = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such movie'})
  }

  const movie = await Movie.findOneAndDelete({_id: id})

  if(!movie) {
    return res.status(400).json({error: 'No such movie'})
  }

  res.status(200).json(movie)
}

// update a movie
const updateMovie = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such movie'})
  }

  const movie = await Movie.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!movie) {
    return res.status(400).json({error: 'No such movie'})
  }

  res.status(200).json(movie)
}

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie
}