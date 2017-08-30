import HttpStatus from 'http-status';
import { defaultResponse, errorResponse } from '../utils/response';

class SellPointsController {
  constructor(SellPoint, Sequelize) {
    this.SellPoint = SellPoint;
    this.Sequelize = Sequelize;
  }

  async getAll() {
    return this.SellPoint.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  async getById(params) {
    return this.SellPoint.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  async getByLocation(query) {
    const sql = `select 
      sell_points.*, 
      ST_Distance(address, ST_MakePoint(${query.long}, ${query.lat})::geography) as distance,
      ST_Contains("coverageArea", ST_GeomFromText('POINT(${query.long} ${query.lat})')) as contain
      from sell_points 
      where ST_Contains("coverageArea", ST_GeomFromText('POINT(${query.long} ${query.lat})')) = true
      order by distance ASC 
      limit 1;`;
    return this.Sequelize.query(sql, { type: this.Sequelize.QueryTypes.SELECT })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  async create(data) {
    console.log('this.SellPoint', this.SellPoint);
    return this.SellPoint.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  async update(data, params) {
    return this.SellPoint.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

}

export default SellPointsController;
