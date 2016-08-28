(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name contentstack
   *
   * @description
   * Provides all queries of contentStack SDK
   *
   * @example
   *
   * .controller('HomeCtrl', HomeCtrl);
   *   HomeCtrl.$inject = ['contentstack','$scope'];
   *   function HomeCtrl(contentstack,scope){
   *    var Query = contentstack.ContentType("mywebsite").Query();
   *    Query
   *       .ascending('created_at')
   *       .limit(10)
   *       .toJSON()
   *       .find()
   *       .then(function success(result) {
   *           scope.entires = result[0];
   *           scope.$apply();
   *           // result is array where -
   *           // result[0] => entry objects
   *           // result[result.length-1] => entry objects count included only when .includeCount() is queried.
   *           // result[1] => schema of the content type is included when .includeSchema() is queried.
   *       }, function error(err) {
   *        // err object
   *    })
   * }
   * ```
   */
  angular
    .module('contentstack')
    .factory('contentstack',contentstack);
    contentstack.$inject = ['$injector'];
    function contentstack ($injector) {
      var Stack = $injector.get('stack');
      return Stack;
    }

})();
