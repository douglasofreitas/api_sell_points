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
      request
        .get('/pdvs')
        .end((err, res) => {
          expect(res.body.pdvs[0].id).to.be.eql(defaultSellPoint.id);
          expect(res.body.pdvs[0].tradingName).to.be.eql(defaultSellPoint.tradingName);
          expect(res.body.pdvs[0].ownerName).to.be.eql(defaultSellPoint.ownerName);
          expect(res.body.pdvs[0].document).to.be.eql(defaultSellPoint.document);
          expect(res.body.pdvs[0].coverageArea).to.be.eql(defaultSellPoint.coverageArea);
          expect(res.body.pdvs[0].address).to.be.eql(defaultSellPoint.address);
          done(err);
        });
    });
  });

  describe('Route GET /pdv/1', () => {
    it('should return a sell point', (done) => {
      request
        .get('/pdvs/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultSellPoint.id);
          expect(res.body.tradingName).to.be.eql(defaultSellPoint.tradingName);
          expect(res.body.ownerName).to.be.eql(defaultSellPoint.ownerName);
          expect(res.body.document).to.be.eql(defaultSellPoint.document);
          expect(res.body.coverageArea).to.be.eql(defaultSellPoint.coverageArea);
          expect(res.body.address).to.be.eql(defaultSellPoint.address);
          done(err);
        });
    });
  });
});
