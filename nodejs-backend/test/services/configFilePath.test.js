const assert = require('assert');
const app = require('../../src/app');

describe('\'configFilePath\' service', () => {
  it('registered the service', () => {
    const service = app.service('configFilePath');

    assert.ok(service, 'Registered the service (configFilePath)');
  });
});
