const assert = require('assert');
const app = require('../../src/app');

describe('\'appvalidate\' service', () => {
  it('registered the service', () => {
    const service = app.service('appvalidate');

    assert.ok(service, 'Registered the service (appvalidate)');
  });
});
