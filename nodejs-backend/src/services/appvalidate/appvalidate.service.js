const { Appvalidate } = require('./appvalidate.class');
const createModel = require('../../models/appvalidate.model');
const hooks = require('./appvalidate.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/appvalidate', new Appvalidate(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('appvalidate');

  service.hooks(hooks);
};