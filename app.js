import express, { json, urlencoded } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import morgan from "morgan";
import { usersRoutes, natourRoutes } from "./app/routes/index.js"


/**
 * Connected to the Mango Database
 */
connectDB();

/**
 * Lanch the app
 */
const app = express();

/**
 * Server Setup Middlewares
 */
app
    .use(json({ extended: true }))
    .use(urlencoded({ extended: true }))
    .use(cors())

process.env.NODE_ENV && app.use(morgan("dev"))
/**
 * Routes
 */


app.use("/api/v1/users/", usersRoutes);

app.use("/api/v1/tours/", natourRoutes);

app.use("/", (req, res) => res.status(200).json({ message: "ok" }));


export default app