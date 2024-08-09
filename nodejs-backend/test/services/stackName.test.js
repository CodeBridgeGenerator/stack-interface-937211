const assert = require('assert');
const app = require('../../src/app');

describe('\'stackName\' service', () => {
  it('registered the service', () => {
    const service = app.service('stackName');

    assert.ok(service, 'Registered the service (stackName)');
  });
});
