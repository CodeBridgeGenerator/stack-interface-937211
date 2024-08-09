const { AppGenTemp } = require('./appGenTemp.class');
const createModel = require('../../models/appGenTemp.model');
const hooks = require('./appGenTemp.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/appGenTemp', new AppGenTemp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('appGenTemp');

  service.hooks(hooks);
};