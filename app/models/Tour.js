import mongoose from 'mongoose';

/**
 * Tour's schema model for the Database
 * At registration: pseudo,email & password are required
 */
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour must have a name'],
      unique: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A Tour must have a price'],
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model('tour', tourSchema);

export default Tour;
