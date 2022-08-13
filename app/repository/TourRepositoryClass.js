import Tour from '../models/Tour.js';
import Repository from './Repository.js';

class TourRepository extends Repository {
  constructor(query, queryString) {
    super(query, queryString);
  }

  getTourBy() {
    this.filter().select();
    return this;
  }

  getAllTours() {
    this.getAll();
    return this;
  }
}

export default TourRepository;
