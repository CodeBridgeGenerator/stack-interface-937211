const { StackValidate } = require('./stackValidate.class');
const createModel = require('../../models/stackValidate.model');
const hooks = require('./stackValidate.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/stackValidate', new StackValidate(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stackValidate');

  service.hooks(hooks);
};