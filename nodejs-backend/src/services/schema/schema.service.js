const { Schema } = require('./schema.class');
const createModel = require('../../models/schema.model');
const hooks = require('./schema.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/schema', new Schema(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('schema');

  service.hooks(hooks);
};