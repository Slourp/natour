import express, { json, urlencoded } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import natourRoutes from "./app/routes/natourRoutes.js";

dotenv.config({ path: "./config/.env" });

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

app.use("/api/v1/tours/", natourRoutes);


export default app