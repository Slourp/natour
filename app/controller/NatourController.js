import Tour from '../models/Tour.js';
import to from '../helper/to.js';
import {
  getAllTours,
  getMonthlyPlan,
  getTourById,
  getTourStats,
} from '../repository/TourRepository.js';
import { updateNatourById } from '../services/natour/NatourUpdateService.js';
import { deleteNatourById } from '../services/natour/NatourDeleteService.js';
import { getActualYeah } from '../helper/dateHelper.js';
import catchAsync from '../Utils/CatchAsync.js';
import AppError from '../models/AppError.js';

/**
* Tour [tours]
* Retrieve All Tour [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const getTours = catchAsync(async (req, res, next) => {
  const fetchedTours = await getAllTours(req.query);

  return res.status(201).json({
    status: 'success',
    result: fetchedTours?.length,
    data: fetchedTours || [],
  })
})

/**
* Tour [tours/:id]
* Retrieve All Tour [GET]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const tourById = catchAsync(async (req, res, next) => {
  const { id: tourId } = req?.params;
  const fetchedTour = await getTourById(tourId);

  if (!fetchedTour) return next(new AppError('No Tour found with that Id', 404))


  return res.status(201).json({
    status: 'success',
    result: fetchedTour?.length,
    data: fetchedTour || [],
  })
})

/**
* Tour [tours]
* Create Tour [POST]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req   
 * @param {*} res 
 */
export const createTour = catchAsync(async (req, res, next) => {
  // const [newTourError, newTour] = await to(Tour.create(req.body));
  const newTour = await Tour.create(req.body)

  return res.status(201).json({
    status: 'success',
    data: newTour,
  });
});

/**
* Tour [tours]
* Update Tour [PATCH]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const updateTour = catchAsync(async (req, res, next) => {
  const { id: tourId } = req?.params;
  const { body } = req;

  const [updateTourError, updatedTour] = await to(updateNatourById(tourId, body));

  if (updateTourError) return next(new AppError('No Tour found with that Id', 404))

  return res.status(201).json({
    status: 'success',
    result: [updatedTour]?.length || 0,
    data: [updatedTour],
  });
});

/**
* Tour [tours]
* Delete Tour [DELETE]
+ Response 200 (application/json)
    + Status (string)
    + Message (string)
    + Data (array[Tour])
 * @param {*} req 
 * @param {*} res 
 */
export const deleteTour = catchAsync(async (req, res, next) => {
  const { id: tourId } = req?.params;

  const [deleteTourError, deleteTour] = await to(deleteNatourById(tourId));

  if (deleteTourError) return next(new AppError('No Tour found with that Id', 404))


  if (!deleteTour)
    return res.status(400).json({
      status: 'faild',
      message: 'Not fond',
    });

  return res.status(201).json({
    status: 'success',
    data: [],
  });
})

export const getTop5Tours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

export const tourStats = catchAsync(async (req, res, next) => {
  // const [statsTourError, statsTour] = await getTourStats();
  const statsTour = await getTourStats();

  // if (statsTourError) {
  //   return res.status(400).json({
  //     status: 'faild',
  //     message: 'Not fond',
  //   });
  // }

  return res.status(201).json({
    status: 'success',
    data: statsTour,
  });
});

export const monthlyPlan = catchAsync(async (req, res, next) => {
  const year = +req.params?.year ?? getActualYeah();

  // const [planTourError, planTour] = await getMonthlyPlan(year);
  const planTour = await getMonthlyPlan(year);

  // if (planTourError) {
  //   return res.status(400).json({
  //     status: 'faild',
  //     message: 'Not fond',
  //   });
  // }

  return res.status(201).json({
    status: 'success',
    data: planTour,
  });
});
