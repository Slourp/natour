import Tour from '../../models/Tour.js';

export const updateNatourById = (id, body) =>
  Tour.findByIdAndUpdate(id, body, { new: true, runValidators: true })

