import Movie from "../models/Movie"

export const createMovie = async (req,res) => {
    const {originalTitle, originalLanguage} = req.body

    const newMovie = new Movie({originalTitle, originalLanguage})

    const movieSaved = await newMovie.save()

    res.status(201).json(movieSaved)
}

export const getMovies = async (req,res) => {

    const movies = await Movie.find();
    if (!movies) {
        return res.status(404).json('No movies finded')
    }
    res.status(200).json(movies)
}

export const getMovieById = async (req,res) => {

    const idMovie = req.params.movieId

    console.log(`obtengo el id: ${idMovie}`);

    const movie = await Movie.findById(idMovie)

    console.log(`movie finded: ${movie}`);

    if (!movie) {
       return res.status(404).json('the movie do not exists')
    }

    res.status(200).json(movie)
}

export const updateMovieById = async (req,res) => {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.movieId,req.body,{new:true})

    if (!updatedMovie) {
        return res.status(404).json('the movie do not exists')
    }

    res.status(200).json(updatedMovie)
}

export const deleteMovieById = async (req,res) => {
    const idMovie = req.params.movieId

    const movie = await Movie.findById(idMovie)

    if (!movie) {
        res.status(404).json('the movie do not exists')
    }

    await Movie.findByIdAndDelete(idMovie)

    res.status(200).json('movie deleted')
}
