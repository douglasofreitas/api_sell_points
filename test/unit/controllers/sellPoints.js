import SellPointsController from '../../../src/controllers/sellPoints';

describe('Controllers: SellPoints', () => {
  describe('Route GET all sell points: getAll()', () => {
    it('should return a list of sell points', () => {
      const SellPoints = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]],
          ],
        },
        address: {
          type: 'Point',
          coordinates: [-46.57421, -21.785741],
        },
      }];

      td.when(SellPoints.findAll({})).thenResolve(expectedResponse);
      const sellPointsController = new SellPointsController(SellPoints);
      return sellPointsController.getAll({})
        .then(response => expect(response.data[0]).to.be.eql(expectedResponse[0]));
    });
  });
  /*
  describe('Route GET a store: getById()', () => {
    it('should return a store', () => {
      const Stores = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'test categories',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        created_at: '2016-09-10T23:55:36.692Z',
        updated_at: '2016-09-10T23:55:36.692Z',
      }];

      td.when(Stores.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const categoriesController = new StoresController(Stores);
      return categoriesController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });
  describe('Create a store: create()', () => {
    it('should create a store', () => {
      const Stores = {
        create: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'test categories',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        link: 'http://gmail.com',
      };
      const expectedResponse = [{
        id: 1,
        name: 'test categories',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
        created_at: '2016-09-10T23:55:36.692Z',
        updated_at: '2016-09-10T23:55:36.692Z',
      }];

      td.when(Stores.create(requestBody)).thenResolve(expectedResponse);

      const categoriesController = new StoresController(Stores);
      return categoriesController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a store: update()', () => {
    it('should update a store', () => {
      const Stores = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'test categories updated',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
      };
      const expectedResponse = [{
        id: 1,
        name: 'test categories updated',
        type: 'CATEGORY',
        link_href: 'http://gmail.com',
        link_rel: 'test',
      }];

      td.when(Stores.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const categoriesController = new StoresController(Stores);
      return categoriesController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a store: delete()', () => {
    it('should delete a store', () => {
      const Stores = {
        destroy: td.function(),
      };

      td.when(Stores.destroy({ where: { id: 1 } })).thenResolve({});

      const categoriesController = new StoresController(Stores);
      return categoriesController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
  */
});
