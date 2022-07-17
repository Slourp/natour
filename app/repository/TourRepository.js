import { json } from 'express';
import to from '../helper/to.js';
import Tour from '../models/Tour.js';

const setAdvancedFiltering = (queryObj) => {
  const queryStr = JSON.stringify(queryObj);

  const transformerQueryStr = queryStr.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  return JSON.parse(transformerQueryStr);
};

const getQueryObj = (query) => {
  const queryObj = { ...query };
  const excludeFields = ['page', 'sort', 'limit', 'fields'];
  excludeFields.forEach((element) => delete queryObj[element]);
  return queryObj;
};

export const getAllTours = async (query) => {
  const queryStr = setAdvancedFiltering(getQueryObj(query));

  const toursQuery = Tour.find(getQueryObj(queryStr));

  if (query?.sort) {
    const sortBy = query?.sort.split(',').join(' ');
    toursQuery.sort(sortBy);
  } else toursQuery.sort('-createdAt');

  return await to(toursQuery);
};

export const getTourById = async (id) => await to(Tour.findById(id));
