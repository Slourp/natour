/**
 * All Natours' Routes should be set up here
 */

import { Router } from "express";
import { NatourController } from "../controller/index.js";

const {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
} = NatourController

const router = Router();

// catalogues
router.route('/')
    .get(getAllTours)
    .post(createTour)

router.route("/:id")
    .get(getTourById)
    .delete(deleteTour)
    .patch(updateTour)

export default router;