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
export const getTours = async (req, res) => {
  const [fetchToursError, fetchedTours] = await getAllTours(req.query);

  if (fetchToursError)
    return res.status(400).json({
      status: 'faild',
      message: fetchToursError,
    });

  return res.status(201).json({
    status: 'success',
    result: fetchedTours?.length,
    data: fetchedTours || [],
  });
};

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
export const tourById = async (req, res) => {
  const { id: tourId } = req?.params;
  const [fetchTourError, fetchedTour] = await getTourById(tourId);

  if (fetchTourError)
    return res.status(400).json({
      status: 'faild',
      message: fetchTourError,
    });

  return res.status(201).json({
    status: 'success',
    result: fetchedTour?.length,
    data: fetchedTour || [],
  });
};

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
export const createTour = async (req, res) => {
  const [newTourError, newTour] = await to(Tour.create(req.body));

  if (newTourError)
    return res.status(400).json({
      status: 'faild',
      message: newTourError,
    });

  return res.status(201).json({
    status: 'success',
    data: newTour,
  });
};

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
export const updateTour = async (req, res) => {
  const { id: tourId } = req?.params;
  const { body } = req;

  const [updateTourError, updatedTour] = await updateNatourById(tourId, body);

  if (updateTourError)
    return res.status(400).json({
      status: 'faild',
      message: updateTourError,
    });

  return res.status(201).json({
    status: 'success',
    result: [updatedTour]?.length || 0,
    data: [updatedTour],
  });
};

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
export const deleteTour = async (req, res) => {
  const { id: tourId } = req?.params;
  const [deleteTourError, deleteTour] = await deleteNatourById(tourId);

  if (deleteTourError)
    res.status(400).json({
      status: 'faild',
      message: deleteTourError,
    });

  if (!deleteTour)
    res.status(400).json({
      status: 'faild',
      message: 'Not fond',
    });

  return res.status(201).json({
    status: 'success',
    data: [],
  });
};

export const getTop5Tours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

export const tourStats = async (req, res, next) => {
  const [statsTourError, statsTour] = await getTourStats();

  if (statsTourError) {
    return res.status(400).json({
      status: 'faild',
      message: 'Not fond',
    });
  }

  return res.status(201).json({
    status: 'success',
    data: statsTour,
  });
};

export const monthlyPlan = async (req, res) => {
  const year = +req.params?.year ?? getActualYeah();

  const [planTourError, planTour] = await getMonthlyPlan(year);

  if (planTourError) {
    return res.status(400).json({
      status: 'faild',
      message: 'Not fond',
    });
  }

  return res.status(201).json({
    status: 'success',
    data: planTour,
  });
};
