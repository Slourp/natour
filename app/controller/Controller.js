class AbstractController {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;

    this.#setDefaultFields().#setAdvancedFiltering();
  }

  getPagination(query) {
    const page = +query?.page || 1;
    const limit = +query?.limit || 100;
    const skip = (page - 1) * limit;
    return { limit, skip };
  }
}

export default AbstractController;
