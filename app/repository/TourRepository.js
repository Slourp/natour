import to from '../helper/to.js';
import Tour from '../models/Tour.js';

const getSortByParams = (sort) =>
  sort ? sort.split(',').join(' ') : '-createdAt';

const getFields = (fields) => (fields ? fields.split(',').join(' ') : '-__v');

const setAdvancedFiltering = (queryObj) => {
  const queryStr = JSON.stringify(queryObj);

  const transformerQueryStr = queryStr.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => getSortByParams`$${match}`
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

  const tourQuery = Tour.find(findParams)
    .sort(sortParams)
    .select(selectFieldsParams)
    .skip(skip)
    .limit(limit);
  return await to(tourQuery);
};

export const getTourStats = async () => {
  const stats = Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  return await to(stats);
};

export const getMonthlyPlan = async (year) => {
  const plan = Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0, //id will no longer show up
      },
    },
    {
      $sort: { numTourStarts: -1 }, //descending
    },
    {
      $limit: 12,
    },
  ]);

  return await to(plan);
};

export const getTourById = async (id) => await to(Tour.findById(id));
