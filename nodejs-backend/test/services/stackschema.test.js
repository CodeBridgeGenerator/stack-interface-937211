const assert = require('assert');
const app = require('../../src/app');

describe('\'stackschema\' service', () => {
  it('registered the service', () => {
    const service = app.service('stackschema');

    assert.ok(service, 'Registered the service (stackschema)');
  });
});
