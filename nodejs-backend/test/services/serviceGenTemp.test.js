const assert = require('assert');
const app = require('../../src/app');

describe('\'serviceGenTemp\' service', () => {
  it('registered the service', () => {
    const service = app.service('serviceGenTemp');

    assert.ok(service, 'Registered the service (serviceGenTemp)');
  });
});
