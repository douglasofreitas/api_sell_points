describe('Routes SellPoints', () => {
  const SellPoints = app.datasource.models.sell_points;

  const defaultSellPoint = {
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
  };

  beforeEach((done) => {
    SellPoints
      .destroy({ where: {} })
      .then(() => SellPoints.create(defaultSellPoint))
      .then(() => {
        done();
      });
  });

  describe('Route GET /pdvs', () => {
    it('should return a list of sell points', (done) => {
      const story = Joi.object().keys({
        id: Joi.number(),
        tradingName: Joi.string(),
        ownerName: Joi.string(),
        document: Joi.string(),
        coverageArea: Joi.object().keys({
          type: Joi.string(),
          coordinates: Joi.array(),
        }),
        address: Joi.object().keys({
          type: Joi.string(),
          coordinates: Joi.array(),
        }),
      });

      request
        .get('/pdvs/1')
        .end((err, res) => {
          joiAssert(res.body, story);
          done(err);
        });
    });
  });
});
