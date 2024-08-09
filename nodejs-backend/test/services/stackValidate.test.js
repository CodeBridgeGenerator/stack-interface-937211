const assert = require('assert');
const app = require('../../src/app');

describe('\'stackValidate\' service', () => {
  it('registered the service', () => {
    const service = app.service('stackValidate');

    assert.ok(service, 'Registered the service (stackValidate)');
  });
});
