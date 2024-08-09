const { SchemaGenTemp } = require('./schemaGenTemp.class');
const createModel = require('../../models/schemaGenTemp.model');
const hooks = require('./schemaGenTemp.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/schemaGenTemp', new SchemaGenTemp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('schemaGenTemp');

  service.hooks(hooks);
};