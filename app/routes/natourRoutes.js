/**
 * All Natours' Routes should be set up here
 */

import { Router } from 'express';
import { NatourController } from '../controller/index.js';

const { getTours, tourById, createTour, updateTour, deleteTour, getTop5Tours } =
  NatourController;

const router = Router();

router.route('/').get(getTours).post(createTour);

router.route('/top5').get(getTop5Tours, getTours);

router.route('/:id').get(tourById).delete(deleteTour).patch(updateTour);

export default router;
