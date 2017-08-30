import HttpStatus from 'http-status';
import fs from 'fs';
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
      where 
      ST_Contains("coverageArea", ST_GeomFromText('POINT(${query.long} ${query.lat})')) = true
      order by distance ASC 
      limit 1;`;
    return this.Sequelize.query(sql, { type: this.Sequelize.QueryTypes.SELECT })
      .then(result => defaultResponse(result[0]))
      .catch(error => errorResponse(error.message));
  }

  async create(data) {
    return this.SellPoint.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  async update(data, params) {
    return this.SellPoint.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  async loadDemo() {
    return this.SellPoint
      .destroy({ where: {} })
      .then(() => new Promise((resolve, reject) => {
        fs.readFile('demo.json', 'utf8', (err, data) => {
          if (err) { reject(err); }
          const listPdvs = JSON.parse(data);
          const formatListPdvs = listPdvs.pdvs.map(obj => Object.assign(
            obj,
            {
              coverageArea: JSON.parse(obj.coverageArea),
              address: JSON.parse(obj.address),
            },
          ));
          console.log(formatListPdvs);
          Promise.all(formatListPdvs.map(obj => this.SellPoint.create(obj)))
          .then((values) => {
            resolve(defaultResponse(values));
          });
        });
      }))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default SellPointsController;
