import express, { json, urlencoded } from "express";
import cors from "cors";
import connectDB from "./config/db.js";

/**
 * .env file configuration
 */

/**
 * Connected to the Mango Database
 */
connectDB();

/**
 * Lanch the app
 */
const app = express();

/**
 * Server
 */
app.use(json({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cors());

/**
 * Routes
 */
app.get("/", (req, res) => res.status(200).json({ message: "YO" }))


export default app