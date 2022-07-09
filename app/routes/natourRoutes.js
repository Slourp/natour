/**
 * All NatourRoutes should be set up here
 */

import { Router } from "express";
import {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
} from "../controller/NatourController.js";

const router = Router();

// catalogues
router
    .get(getAllTours)
    .post(createTour)
router
    .delete(deleteTour)
    .get("/:id", getTourById)
    .patch(updateTour)

export default router;