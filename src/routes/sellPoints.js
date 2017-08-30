import SellPointsController from '../controllers/sellPoints';

export default (app) => {
  const sellPointsController = new SellPointsController(
        app.datasource.models.sell_points,
        app.datasource.sequelize);

  app.route('/pdvs/initDemo')
    .get((req, res) => {
      sellPointsController.loadDemo()
        .then((response) => {
          res.status(response.statusCode);
          res.json({ pdvs: response.data });
        });
    });

  app.route('/pdvs')
    .get((req, res) => {
      sellPointsController.getAll(req.params, req.query)
        .then((response) => {
          res.status(response.statusCode);
          res.json({ pdvs: response.data });
        });
    })
    .post((req, res) => {
      sellPointsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/pdvs/find')
    .get((req, res) => {
      sellPointsController.getByLocation(req.query)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/pdvs/:id')
    .get((req, res) => {
      sellPointsController.getById(req.params, req.query)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      sellPointsController.update(req.params, req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};
