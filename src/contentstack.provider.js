(function () {
  'use strict';
  /**
   * @ngdoc provider
   * @name stackProvider
   *
   * @description
   * Provides Built.io Contentstack javascript sdk {stack} instance
   *
   * @example
   *
   * ```js
   * angular.module('app', ['contentstack'])
   *
   *   .config(['stackProvider', function(stackProvider) {
   *      stackProvider.initialize({
   *                'api_key': '<your stack api_key>',
   *                'access_token': '<your access_token>',
   *                'environment': 'development'
   *       });
   *   }])
   * ```
   */

  angular
    .module('contentstack')
    .provider('stack', ContentstackProvider);

    function ContentstackProvider(){
        var stackProvider;
        this.initialize = function(secret) {
            stackProvider = Contentstack.Stack(secret);
        };
        this.cachePolicy = function (policy) {
          stackProvider.setCachePolicy(policy);
        };
        this.$get = function() {
            return stackProvider;
        };
    }

})();
