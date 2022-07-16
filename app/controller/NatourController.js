import Tour from '../models/Tour.js';
import to from '../helper/to.js';
import { getAllTours, getTourById } from '../repository/TourRepository.js';
import { updateNatourById } from '../services/natour/NatourUpdateService.js';
import { deleteNatourById } from '../services/natour/NatourDeleteService.js';

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
  const [fetchToursError, fetchedTours] = await getAllTours();

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
  const [deleteTourError, _] = await deleteNatourById(tourId);

  if (deleteTourError)
    return res.status(400).json({
      status: 'faild',
      message: deleteTourError,
    });

  return res.status(201).json({
    status: 'success',
    data: [],
  });
};
