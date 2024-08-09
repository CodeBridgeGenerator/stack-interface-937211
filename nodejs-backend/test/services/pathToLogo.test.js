const assert = require('assert');
const app = require('../../src/app');

describe('\'pathToLogo\' service', () => {
  it('registered the service', () => {
    const service = app.service('pathToLogo');

    assert.ok(service, 'Registered the service (pathToLogo)');
  });
});
