import to from '../../helper/to.js';
import Tour from '../../models/Tour.js';

export const deleteNatourById = async (id) =>
  await to(Tour.findByIdAndDelete(id));
