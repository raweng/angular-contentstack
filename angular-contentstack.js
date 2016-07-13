/**
 * @license Angular-Contentstack v0.0.1
 * (c) 2016 raw engineering, Inc. www.raweng.com
 * License: MIT
 */
(function(window, angular) {
    'use strict';
    /**
     * @ngdoc module
     * @name contentstack
     * @description
     *
     * # contentstack
     *
     * The `contentstack` module provides wrapper for contentstack javascript sdk
     */
    angular.module('contentstack', [])
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
        .provider('stack', function() {
            var stackProvider;
            this.initialize = function(secret) {
                stackProvider = Contentstack.Stack(secret);
            };
            this.cachePolicy = function (policy) {
              console.log("policy",policy);
              stackProvider.setCachePolicy(policy);
            };
            this.$get = function() {
                return stackProvider;
            }
        })
        /**
         * @ngdoc directive
         * @name contentstackEntry
         *
         * @description
         * Provides tag for accessing the contentstack api
         *
         * @example
         *
         * ```html
         *  <contentstack-entry content-type="home_page"
         *     locale="en-us"
         *     as="entries"
         *     include_count="true">
         *      {{entries | json}}
         *  </contentstack-entry>
         *
         * ```
         */
        .directive('contentstackEntry', ['$compile', '$injector', function($compile, $injector) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    contentType: '@',
                    uid: '@?',
                    language: '@?',
                    all: '@?',
                    lessThan :'@?',
                    lessThanOrEqualTo : '@?',
                    greaterThan : '@?',
                    greaterThanOrEqualTo : '@?',
                    as: '@?',
                    regex: '@?',
                    beforeUid :'@?',
                    afterUid : '@?',
                    only: '@?',
                    exists: '@?',
                    except: '@?',
                    where: '@?',
                    notEqualTo: '@?',
                    containedIn: '@?',
                    notContainedIn: '@?',
                    includeReference: '@?',
                    includeSchema: '@?',
                    includeOwner: '@?',
                    includeCount: '@?',
                    ascending: '@?',
                    descending: '@?',
                    skip: '@?',
                    limit: '@?',
                    search: '@?',
                    query: '@?',
                    includeReference : '@?',
                    setCachePolicy: '@?',
                    loadMore: '@?'
                },
                link: function(scope, element, attrs, ctrl, transcludeFn) {
                      transcludeFn(scope, function(clone, innerScope) {
                          var compiled = $compile(clone)(scope);
                          element.append(compiled);
                      });
                      var Stack = $injector.get('stack'),
                          ContentType = Stack.ContentType(attrs.contentType),
                          entry = ContentType.Query(),
                          as;
                      scope.isLoading = true;
                      var getQuery = function(attr){
                          var query = {
                            'setCachePolicy': setCachePolicy,
                            'lessThan': lessThan,
                            'lessThanOrEqualTo': lessThanOrEqualTo,
                            'greaterThan':greaterThan,
                            'greaterThanOrEqualTo':greaterThanOrEqualTo,
                            'language':language,
                            'uid':uid,
                            'only':only,
                            'except':except,
                            'includeCount':includeCount,
                            'includeReference':includeReference,
                            'beforeUid':beforeUid,
                            'afterUid':afterUid,
                            'includeSchema':includeSchema,
                            'includeOwner':includeOwner,
                            'ascending':ascending,
                            'descending':descending,
                            'limit':limit,
                            'skip':skip,
                            'includeReference':includeReference,
                            'exists':exists,
                            'where':where,
                            'notEqualTo':notEqualTo,
                            'containedIn':containedIn,
                            'notContainedIn':notContainedIn,
                            'regex':regex,
                            'search':search,
                            'query':query
                          };
                          function query() {
                            var query;
                            try {
                                query = JSON.parse(attrs.query);
                            } catch (err) {
                                console.error(err);
                            }
                            entry.query(query);
                          };
                          function search() {
                            entry.search(attrs.search);
                          };
                          function regex() {
                            var regex = attrs.regex.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.regex(regex[0],'/^'+regex[1]+'/');
                          };
                          function notContainedIn() {
                            var notContainedIn = attrs.notContainedIn;
                            var notIn = notContainedIn.substring(notContainedIn.lastIndexOf("[")+1,notContainedIn.lastIndexOf("]"));
                            notContainedIn = attrs.notContainedIn.split(',').map(function(v) {
                                return v.trim();
                            });
                            notIn = notIn.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.notContainedIn(notContainedIn[0],notIn);
                          };
                          function containedIn() {
                            var containedIn = attrs.containedIn;
                            var In = containedIn.substring(containedIn.lastIndexOf("[")+1,containedIn.lastIndexOf("]"));
                            containedIn = attrs.containedIn.split(',').map(function(v) {
                                return v.trim();
                            });
                            In = In.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.containedIn(containedIn[0],In);
                          };
                          function notEqualTo() {
                            var notEqualTo = attrs.notEqualTo.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.notEqualTo(notEqualTo[0],notEqualTo[1]);
                          };
                          function where() {
                            var where = attrs.where.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.where(where[0],where[1]);
                          };
                          function exists() {
                            entry.exists(attrs.exists);
                          };
                          function includeReference() {
                            var includeReference = attrs.includeReference.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.includeReference(includeReference);
                          };
                          function skip() {
                            entry.skip(Number(attrs.skip));
                          };
                          function limit() {
                            entry.limit(Number(attrs.limit));
                          };
                          function descending() {
                            entry.descending(attrs.descending);
                          };
                          function ascending() {
                            entry.ascending(attrs.ascending);
                          };
                          function includeOwner() {
                              entry.includeOwner();
                          };
                          function includeSchema() {
                            entry.includeSchema();
                          };
                          function afterUid() {
                              entry.afterUid(attrs.afterUid);
                          };
                          function beforeUid() {
                            entry.beforeUid(attrs.beforeUid);
                          };
                          function includeReference() {
                            entry.includeReference(attrs.includeReference);
                          };
                          function includeCount() {
                            entry.includeCount();
                          };
                          function except() {
                            var except_query = attrs.except;
                            var exceptFields = except_query.substring(except_query.lastIndexOf("[")+1,except_query.lastIndexOf("]"));
                            exceptFields = fields.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.except(exceptFields);
                          };
                          function only() {
                            var only_query = attrs.only;
                            var fields = only_query.substring(only_query.lastIndexOf("[")+1,only_query.lastIndexOf("]"));
                            fields = fields.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.only(fields);
                          };
                          function uid() {
                            entry = ContentType.Entry(attrs.uid);
                          };
                          function language() {
                              entry.language(attrs.language);
                          };
                          function greaterThanOrEqualTo() {
                            var greaterThanOrEqualTo = attrs.greaterThanOrEqualTo.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.greaterThanOrEqualTo(greaterThanOrEqualTo[0],greaterThanOrEqualTo[1]);
                          };
                          function greaterThan() {
                            var greaterThan = attrs.greaterThan.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.greaterThan(greaterThan[0],greaterThan[1]);
                          };
                          function lessThanOrEqualTo() {
                            var lessThanOrEqualTo = attrs.lessThanOrEqualTo.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.lessThanOrEqualTo(lessThanOrEqualTo[0],lessThanOrEqualTo[1]);
                          };
                          function lessThan() {
                            var lessThan = attrs.lessThan.split(',').map(function(v) {
                                return v.trim();
                            });
                            entry.lessThan(lessThan[0],lessThan[1]);
                          };
                          function setCachePolicy(){
                            var policy = Contentstack.CachePolicy[attrs.setCachePolicy];
                            entry.setCachePolicy(policy);
                          };
                          if(query.hasOwnProperty(attr)){
                              return query[attr]();
                          }else {
                            return null;
                          }
                      };
                      for (var queyAttr in attrs.$attr) {
                          if (attrs.hasOwnProperty(queyAttr)) {
                            getQuery(queyAttr);
                          }
                      }
                    if (scope.all || attrs.uid) {
                        as = attrs.as || '$contentstackEntries';
                        if (attrs.uid) {
                            entry
                            .fetch()
                            .toJSON()
                            .spread(function success(entries, schema, count) {
                                 scope.isLoading = false;
                                 console.log("entries",entries);
                                 scope[as] = entries || {};

                                 if (attrs.includeSchema && data.schema) {
                                     scope['schema'] = schema;
                                 }
                                 if(attrs.includeCount){
                                   scope.count = count;
                                   console.log("scope.count",scope.count);
                                 }
                                 scope.$apply();
                             }, function error(err) {
                                console.error("error",err);
                             });
                        } else {
                            entry
                            .toJSON()
                            .find()
                            .spread(function success(entries, schema, count) {
                                console.log("entry", entries);
                                 scope.isLoading = false;
                                 scope[as] = entries || {};
                                 var scopeAs = "scope."+as;
                                 console.log(scopeAs,entries);
                                 if(attrs.includeCount){
                                   scope.count = count;
                                   console.log("scope.count",scope.count);
                                 }
                                 if (attrs.includeSchema && entry[1]) {
                                     scope['schema'] = schema;
                                     console.log("scope.schema", scope.schema);
                                 }
                                 scope.$apply();
                             }, function error(err) {
                                console.error("error",err);
                             });
                        }
                    } else {
                        as = attrs.as || '$contentstackEntries';
                        entry
                        .toJSON()
                        .find()
                        .spread(function success(entries, schema, count) {
                             scope.isLoading = false;
                             scope[as] = entries || {};
                             var scopeAs = "scope."+as;
                             console.log(scopeAs,entries);
                             if(attrs.includeCount){
                               scope.count = count;
                               console.log("scope.count",scope.count);
                             }
                             if (attrs.includeSchema && entry[1]) {
                                 scope.schema = schema;
                                 console.log("scope.schema", scope.schema);
                             }
                             scope.$apply();
                         }, function error(err) {
                            console.error("error",err);
                         });
                    }
                }
            };
        }])
        /**
         * @ngdoc service
         * @name contentStack
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
        .factory('contentstack',contentstack);
        contentstack.$inject = ['$injector'];
        function contentstack ($injector) {
          var Stack = $injector.get('stack');
          return Stack;
        };


})(window, window.angular);
