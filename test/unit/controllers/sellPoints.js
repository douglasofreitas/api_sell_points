import SellPointsController from '../../../src/controllers/sellPoints';

describe('Controllers: SellPoints', () => {

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

  describe('Route GET all sell points: getAll()', () => {
    it('should return a list of sell points', () => {
      const SellPoints = {
        findAll: td.function(),
      };
[
      td.when(SellPoints.findAll({})).thenResolve(expectedResponse);
      const sellPointsController = new SellPointsController(SellPoints);
      return sellPointsController.getAll({})
        .then(response => expect(response.data[0]).to.be.eql(expectedResponse[0]));
    });
  });

  describe('Route GET sell point: getById()', () => {
    it('should return a specific sell point', () => {
      const SellPoints = {
        findAll: td.function(),
      };

      td.when(SellPoints.findAll({})).thenResolve(expectedResponse);
      const sellPointsController = new SellPointsController(SellPoints);
      return sellPointsController.getById({ id: 1 })
        .then(response => expect(response).to.be.eql(expectedResponse[0]));
    });
  });
});
