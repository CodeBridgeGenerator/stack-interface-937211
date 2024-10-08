const { ServiceGenTemp } = require('./serviceGenTemp.class');
const createModel = require('../../models/serviceGenTemp.model');
const hooks = require('./serviceGenTemp.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/serviceGenTemp', new ServiceGenTemp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('serviceGenTemp');

  service.hooks(hooks);
};