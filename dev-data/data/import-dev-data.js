import * as fs from 'fs';
import Tour from '../../app/models/Tour.js';
import User from '../../app/models/User.js';
import Review from '../../app/models/Review.js';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../../config/db.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
// ENVIRONMENT VARIABLES
connectDB();

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// IMPORT DATA TO DB
const importData = async () => {
  try {
    await Tour.create(tours, { validateBeforeSave: false });
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    //console.log('All data were imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM TOURS COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    console.log('Data succesfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Need optional param --import or --delete');
}

//deleteData().then(importData());
//console.log(process.argv);
