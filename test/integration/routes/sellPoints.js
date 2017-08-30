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

//   describe('Route GET /classifications?cycle=2017-01', () => {
//     it('should return a list of categories by cycle', (done) => {
//       request
//         .get('/classifications?cycle=2017-01')
//         .set('Authorization', `JWT ${token}`)
//         .end((err, res) => {
//           expect(res.body[0].id).to.be.eql(defaultCategory.id);
//           expect(res.body[0].name).to.be.eql(defaultCategory.name);
//           expect(res.body[0].type).to.be.eql(defaultCategory.type);
//           expect(res.body[0]._link.href).to.be.eql(defaultCategory.link_href);
//           expect(res.body[0]._link.rel).to.be.eql(defaultCategory.link_rel);
//           done(err);
//         });
//     });
//   });

//   describe('Route GET /classifications/{classification_id}/prodcuts?cycle=2017-01}', () => {
//     it('should return a list of product ids ', (done) => {
//       request
//         .get('/classifications/1/products?cycle=2017-01')
//         .set('Authorization', `JWT ${token}`)
//         .end((err, res) => {
//           expect(res.body[0].product_id).to.be.eql(defaultCategoryProduct.product_id);
//           done(err);
//         });
//     });
//   });
});
