const { Stackschema } = require('./stackschema.class');
const createModel = require('../../models/stackschema.model');
const hooks = require('./stackschema.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/stackschema', new Stackschema(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stackschema');

  service.hooks(hooks);
};