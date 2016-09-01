'use strict';

describe('Contentstack factory', function() {

  var factory,
  stackJsSdk,
  contentStackProvider,
  stackController,
  stackConfig = {
    'api_key': 'blt920bb7e90248f607',
    'access_token': 'blt0c4300391e033d4a59eb2857',
    'environment': 'production'
  };
  beforeEach(function() {
    stackJsSdk = Contentstack.Stack(stackConfig);
    module('contentStackTest');
    inject(function (_contentstack_) {
      stackController = _contentstack_;
    });
  });
  it('stack object', function() {
    //expect(stackController).to.equal(stackJsSdk);
    assert.equal(stackController,stackJsSdk);
  });
});
