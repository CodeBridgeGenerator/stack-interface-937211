const { StackName } = require('./stackName.class');
const createModel = require('../../models/stackName.model');
const hooks = require('./stackName.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/stackName', new StackName(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stackName');

  service.hooks(hooks);
};