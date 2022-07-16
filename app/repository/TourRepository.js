import to from '../helper/to.js';
import Tour from '../models/Tour.js';

export const getAllTours = async () => await to(Tour.find());

export const getTourById = async (id) => await to(Tour.findById(id));
