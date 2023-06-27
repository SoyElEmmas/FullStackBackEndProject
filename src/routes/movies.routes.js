import { Router } from "express";
const router = Router()

import * as moviesControllers from '../controllers/movies.controller'
import { authJwt } from "../middlewares";


router.route('/').get(moviesControllers.getMovies).post([authJwt.verifyToken, authJwt.isModerator],moviesControllers.createMovie)
router.route('/:movieId').get(moviesControllers.getMovieById).put([authJwt.verifyToken,authJwt.isModerator],moviesControllers.updateMovieById).delete([authJwt.verifyToken,authJwt.isAdmin],moviesControllers.deleteMovieById)

export default router;