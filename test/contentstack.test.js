(function() {

  'use strict';

  angular
  .module('contentStackTest', ['contentstack']);

})();
(function(){
  'use strict';
  angular
    .module('contentStackTest')
    .config(['stackProvider',
            function(stackProvider) {
                stackProvider.initialize({
                  'api_key': 'blt920bb7e90248f607',
                  'access_token': 'blt0c4300391e033d4a59eb2857',
                  'environment': 'production'
                });
            }
        ]);
})();
(function(){
    'use strict';
    angular
      .module('contentStackTest')
      .controller('contentStackCntrl',contentStackCntrl);
      contentStackCntrl.$inject = ['$injector','contentstack'];
      function contentStackCntrl ($injector,contentstack) {
        var Query = contentstack.ContentType("mywebsite").Query();
          Query
              .ascending('created_at')
              .only(['title','single_line'])
              .limit(10)
              .toJSON()
              .find()
              .then(function success(result) {
                //console.log("result[0]",result[0]);
                scope.entires = result[0];
                scope.$apply();
                // result is array where -
                // result[0] => entry objects
                // result[result.length-1] => entry objects count included only when .includeCount() is queried.
                // result[1] => schema of the content type is included when .includeSchema() is queried.
            }, function error(err) {
               // err object
           })

      }

})();
