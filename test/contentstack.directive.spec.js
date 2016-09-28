'use strict';

describe('Contentstack directive', function () {
  var directive,
  contentStackProvider,
  element,
  scope,
  compiledElement,
  $compile,
  $rootScope,
  elementString,
  $httpBackend,
  scope,
  element,
  sampleResponse = {
        "entries": [
            {
                "updated_at": "2016-09-02T05:55:10.926Z",
                "created_at": "2016-09-02T05:55:10.880Z",
                "title": "Untitled",
                "url": "/untitled",
                "single_line": "test",
                "_metadata": {
                    "locale": "en-us",
                    "uid": "bltb83a25a9bfc2350e",
                    "publish_details": [
                        {
                            "environment": "blt2eff783eadc6757f",
                            "locale": "en-us",
                            "time": "2016-09-02T05:55:46.230Z",
                            "version": 1,
                            "user": "blt7f8cddeaefbefdd264b75565"
                        }
                    ]
                },
                "tags": [],
                "updated_by": "blt7f8cddeaefbefdd264b75565",
                "created_by": "blt7f8cddeaefbefdd264b75565",
                "published": true,
                "uid": "bltb83a25a9bfc2350e",
                "_version": 1,
                "ACL": {
                    "can": []
                }
            }
        ]
    },
  stackJsSdk,
  directiveElem,
  stackConfig = {
    'api_key': 'bltad01206de86fa85c',
    'access_token': 'blt5fc34fb1b02e0451d0b0b0c5',
    'environment': 'development'
  };
  beforeEach(function () {
    var dummyModule = angular.module('dummyModule', []);
    dummyModule.config(function (_stackProvider_) {
      contentStackProvider = _stackProvider_;
      contentStackProvider.initialize(stackConfig);
    });
    module('contentstack', 'dummyModule');
    inject(function (_$httpBackend_,_$compile_, _$rootScope_) {
      $httpBackend = _$httpBackend_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
    directiveElem = getCompiledElement();

  });
  function getCompiledElement(){
    contentStackProvider.initialize(stackConfig);
    element = angular.element('<contentstack-entry content-type="test_angular_contentstack">{{$contentstackEntries}}</contentstack-entry>');
    scope = $rootScope.$new();
    compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  it('should make the entries available as $contentstackEntries', function () {
    expect(element.html()).to.contain(JSON.stringify(sampleResponse));
  });

  });
