class Repository {
  /**
   *
   * @param {*} query
   * @param {*} queryString
   */
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;

    this.#setDefaultFields().#setAdvancedFiltering();
  }

  #getFieldsToExclude() {
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    return excludeFields;
  }

  #setDefaultFields() {
    this.#getFieldsToExclude().forEach(
      (element) => delete this.queryString[element]
    );

    return this;
  }

  #setAdvancedFiltering() {
    const queryStr = JSON.stringify(queryObj);

    const transformerQueryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.queryString = JSON.parse(transformerQueryStr);
    return this;
  }

  #getSortByParams() {
    return this?.query?.sort
      ? this?.query?.sort.split(',').join(' ')
      : '-createdAt';
  }
  query;
  #getFields() {
    this?.query?.fields ? this.query.fields.split(',').join(' ') : '-__v';
    return this;
  }

  filter() {
    this.query.find(this.queryString);
    return this;
  }

  sort() {
    const sortParams = this.#getSortByParams();
    this.query.sort(sortParams);
    return this;
  }

  select() {
    const selectedFieldsParams = this.#getFields();
    this.query.select(selectedFieldsParams);
    return this;
  }

  pagination(skip, limit) {
    this.query.skip(skip).limit(limit);
    return this;
  }

  getById(id) {
    this.query.findById(id);
    return this;
  }

  getAll() {
    this.query.find();
    return this;
  }
}

export default Repository;
