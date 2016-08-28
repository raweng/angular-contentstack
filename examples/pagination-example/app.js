(function() {
    'use strict';

    angular
        .module('app', [
            'contentstack',
            'ngSanitize'
        ])
        .config(['$locationProvider', 'stackProvider',
            function($locationProvider, stackProvider) {
                stackProvider.initialize({
                    'api_key': 'blt920bb7e90248f607',
                    'access_token': 'blt0c4300391e033d4a59eb2857',
                    'environment': 'production'
                });
            }
        ]);


})();
