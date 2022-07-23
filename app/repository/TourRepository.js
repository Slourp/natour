import { json } from 'express';
import to from '../helper/to.js';
import Tour from '../models/Tour.js';

const getSortByParams = (sort) =>
  sort ? sort.split(',').join(' ') : '-createdAt';

const getFields = (fields) => (fields ? fields.split(',').join(' ') : '-__v');

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
const getPagination = (query) => {
  const page = +query?.page || 1;
  const limit = +query?.limit || 100;
  const skip = (page - 1) * limit;
  console.log('page', page);
  return { limit, skip };
};

export const getAllTours = async (query) => {
  const queryStr = setAdvancedFiltering(getQueryObj(query));

  const findParams = getQueryObj(queryStr);

  const sortParams = getSortByParams(query?.sort);

  const selectFieldsParams = getFields(query.fields);

  const { limit, skip } = getPagination(query);
  console.log({ skip });
  const tourQuery = Tour.find(findParams)
    .sort(sortParams)
    .select(selectFieldsParams)
    .skip(skip)
    .limit(limit);
  return await to(tourQuery);
};

export const getTourById = async (id) => await to(Tour.findById(id));
