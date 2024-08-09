const { ConfigFilePath } = require('./configFilePath.class');
const createModel = require('../../models/configFilePath.model');
const hooks = require('./configFilePath.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/configFilePath', new ConfigFilePath(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('configFilePath');

  service.hooks(hooks);
};