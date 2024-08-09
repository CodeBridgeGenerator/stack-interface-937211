const { SchemaPathLogo } = require('./schemaPathLogo.class');
const createModel = require('../../models/schemaPathLogo.model');
const hooks = require('./schemaPathLogo.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/schemaPathLogo', new SchemaPathLogo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('schemaPathLogo');

  service.hooks(hooks);
};