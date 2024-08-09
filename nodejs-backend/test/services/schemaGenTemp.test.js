const assert = require('assert');
const app = require('../../src/app');

describe('\'schemaGenTemp\' service', () => {
  it('registered the service', () => {
    const service = app.service('schemaGenTemp');

    assert.ok(service, 'Registered the service (schemaGenTemp)');
  });
});
