//aqui se configura el server
import expres from "express";
import morgan from "morgan";
import pkg from "../package.json";
import { createRoles } from "./libs/initialSetup";
import moviesRoutes from './routes/movies.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from "./routes/user.routes"
import express from "express";
import dotenv from "dotenv"
import cors from 'cors'

//inicia el server
const app = expres();

//crea los roles
createRoles()

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use('/api/movies',moviesRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/users',usersRoutes)

export default app;
