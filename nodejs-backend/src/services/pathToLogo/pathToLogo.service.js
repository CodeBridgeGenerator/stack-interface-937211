const { PathToLogo } = require('./pathToLogo.class');
const createModel = require('../../models/pathToLogo.model');
const hooks = require('./pathToLogo.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/pathToLogo', new PathToLogo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pathToLogo');

  service.hooks(hooks);
};