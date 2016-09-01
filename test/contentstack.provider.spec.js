'use strict';

describe('Contentstack provider', function () {
  var contentstack,
  contentStackProvider,
  stackJsSdk,
  stackConfig = {
    'api_key': 'blt920bb7e90248f607',
    'access_token': 'blt0c4300391e033d4a59eb2857',
    'environment': 'production'
  };
  beforeEach(function () {
    stackJsSdk = Contentstack.Stack(stackConfig);
    var dummyModule = angular.module('dummyModule', []);
    dummyModule.config(function (_stackProvider_) {
      contentStackProvider = _stackProvider_;
      //_stackProvider_.initialize(stackConfig);
    });
    module('contentstack', 'dummyModule');
    inject(function () {});
  });
  it('should exist', function () {
    expect(contentStackProvider).to.be.an('object');
  });
  it('check provider config values',function(){
    contentStackProvider.initialize(stackConfig);
    var providerObject = contentStackProvider.$get();
    expect(providerObject.headers.access_token).to.equal(stackConfig.access_token);
    expect(providerObject.headers.api_key).to.equal(stackConfig.api_key);
    expect(providerObject.environment).to.equal(stackConfig.environment);
  });
  it('check JsSdk stack object and provider stack object',function(){
    contentStackProvider.initialize(stackConfig);
    var providerObject = contentStackProvider.$get();
    //expect(providerObject).to.equal(stackJsSdk);
    assert.equal(providerObject,stackJsSdk);
  });

});
