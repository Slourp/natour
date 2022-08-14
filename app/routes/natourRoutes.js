/**
 * All Natours' Routes should be set up here
 */

import { Router } from 'express';
import { NatourController } from '../controller/index.js';
import { monthlyPlan, tourStats } from '../controller/NatourController.js';

const { getTours, tourById, createTour, updateTour, deleteTour, getTop5Tours } =
  NatourController;

const router = Router();

router.route('/').get(getTours).post(createTour);

router.route('/top5').get(getTop5Tours, getTours);

router.route('/stats').get(tourStats);

router.route('/monthly-plan/:year').get(monthlyPlan);

router.route('/:id').get(tourById).delete(deleteTour).patch(updateTour);

export default router;
