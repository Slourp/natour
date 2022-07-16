/**
 * All Natours' Routes should be set up here
 */

import { Router } from 'express';
import { NatourController } from '../controller/index.js';

const { getTours, tourById, createTour, updateTour, deleteTour } =
  NatourController;

const router = Router();

// catalogues
router.route('/:id').get(tourById).delete(deleteTour).patch(updateTour);

router.route('/').get(getTours).post(createTour);

export default router;
