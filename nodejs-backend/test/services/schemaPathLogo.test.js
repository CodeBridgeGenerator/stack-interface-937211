const assert = require('assert');
const app = require('../../src/app');

describe('\'schemaPathLogo\' service', () => {
  it('registered the service', () => {
    const service = app.service('schemaPathLogo');

    assert.ok(service, 'Registered the service (schemaPathLogo)');
  });
});
