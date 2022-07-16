import to from '../../helper/to.js';
import Tour from '../../models/Tour.js';

export const updateNatourById = async (id, body) =>
  await to(
    Tour.findByIdAndUpdate(id, body, { new: true, runValidators: true })
  );
