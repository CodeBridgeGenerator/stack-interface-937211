const assert = require('assert');
const app = require('../../src/app');

describe('\'appGenTemp\' service', () => {
  it('registered the service', () => {
    const service = app.service('appGenTemp');

    assert.ok(service, 'Registered the service (appGenTemp)');
  });
});
