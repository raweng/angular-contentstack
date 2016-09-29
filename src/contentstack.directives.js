(function () {
  'use strict';

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

  angular
    .module('contentstack')
    .directive('contentstackEntry',contentstackEntry);

    contentstackEntry.$inject = ['$compile', '$injector'];

    function contentstackEntry($compile, $injector){
        var directive = {
            restrict: 'E',
            transclude: true,
            link :linkFunc
        };
        return directive;
        function linkFunc(scope, element, attrs, ctrl, transcludeFn) {
          transcludeFn(scope, function(clone, innerScope) {
              var compiled = $compile(clone)(scope);
              element.append(compiled);
          });
          var Stack = $injector.get('stack'),
              ContentType = Stack.ContentType(attrs.contentType),
              entry = ContentType.Query(),
              as;
          scope.$isLoading = true;
          scope.$pagination = {};
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
                'exists':exists,
                'where':where,
                'notEqualTo':notEqualTo,
                'containedIn':containedIn,
                'notContainedIn':notContainedIn,
                'regex':regex,
                'search':search,
                'query':queryString,
                'tags':tags
              };
              function tags(){
                var tags = attrs.tags.split(',').map(function(v) {
                    return v.trim();
                });
                entry.tags(tags);
              }
              function queryString() {
                var query;
                try {
                    query = JSON.parse(attrs.query);
                } catch (err) {
                    console.error(err);
                }
                entry.query(query);
              }
              function search() {
                entry.search(attrs.search);
              }
              function regex() {
                var regex = attrs.regex.split(',').map(function(v) {
                    return v.trim();
                });
                entry.regex(regex[0],'/^'+regex[1]+'/');
              }
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
              }
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
              }
              function notEqualTo() {
                var notEqualTo = attrs.notEqualTo.split(',').map(function(v) {
                    return v.trim();
                });
                entry.notEqualTo(notEqualTo[0],notEqualTo[1]);
              }
              function where() {
                var where = attrs.where.split(',').map(function(v) {
                    return v.trim();
                });
                entry.where(where[0],where[1]);
              }
              function exists() {
                entry.exists(attrs.exists);
              }
              function includeReference() {
                var includeReference = attrs.includeReference.split(',').map(function(v) {
                    return v.trim();
                });
                entry.includeReference(includeReference);
              }
              function skip() {
                entry.skip(Number(attrs.skip));
              }
              function limit() {
                entry.limit(Number(attrs.limit));
              }
              function descending() {
                entry.descending(attrs.descending);
              }
              function ascending() {
                entry.ascending(attrs.ascending);
              }
              function includeOwner() {
                  entry.includeOwner();
              }
              function includeSchema() {
                entry.includeSchema();
              }
              function afterUid() {
                  entry.afterUid(attrs.afterUid);
              }
              function beforeUid() {
                entry.beforeUid(attrs.beforeUid);
              }
              function includeCount() {
                entry.includeCount();
              }
              function except() {
                var except_query = attrs.except;
                var exceptFields = except_query.substring(except_query.lastIndexOf("[")+1,except_query.lastIndexOf("]"));
                exceptFields = fields.split(',').map(function(v) {
                    return v.trim();
                });
                entry.except(exceptFields);
              }
              function only() {
                var only_query = attrs.only;
                var fields = only_query.substring(only_query.lastIndexOf("[")+1,only_query.lastIndexOf("]"));
                fields = fields.split(',').map(function(v) {
                    return v.trim();
                });
                entry.only(fields);
              }
              function uid() {
                entry = ContentType.Entry(attrs.uid);
              }
              function language() {
                  entry.language(attrs.language);
              }
              function greaterThanOrEqualTo() {
                var greaterThanOrEqualTo = attrs.greaterThanOrEqualTo.split(',').map(function(v) {
                    return v.trim();
                });
                entry.greaterThanOrEqualTo(greaterThanOrEqualTo[0],greaterThanOrEqualTo[1]);
              }
              function greaterThan() {
                var greaterThan = attrs.greaterThan.split(',').map(function(v) {
                    return v.trim();
                });
                entry.greaterThan(greaterThan[0],greaterThan[1]);
              }
              function lessThanOrEqualTo() {
                var lessThanOrEqualTo = attrs.lessThanOrEqualTo.split(',').map(function(v) {
                    return v.trim();
                });
                entry.lessThanOrEqualTo(lessThanOrEqualTo[0],lessThanOrEqualTo[1]);
              }
              function lessThan() {
                var lessThan = attrs.lessThan.split(',').map(function(v) {
                    return v.trim();
                });
                entry.lessThan(lessThan[0],lessThan[1]);
              }
              function setCachePolicy(){
                var policy = Contentstack.CachePolicy[attrs.setCachePolicy];
                entry.setCachePolicy(policy);
              }
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
          if(!attrs.uid){
            attrs.includeCount = true;
            entry.includeCount();
          }
            
        if (scope.all || attrs.uid) {
            as = attrs.as || '$contentstackEntries';
            if (attrs.uid) {
                entry
                .toJSON()
                .fetch()
                .then(function success(entries, schema) {
                    as = attrs.as || '$contentstackEntry';
                     scope.$isLoading = false;
                     scope[as] = entries || {};
                     if (attrs.includeSchema) {
                         scope.schema = schema;
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
                     scope.$isLoading = false;
                     scope[as] = entries || {};
                     if(attrs.includeCount){
                       scope.count = attrs.includeSchema ? count :schema;
                     }
                     if (attrs.includeSchema) {
                         scope.schema = schema;
                     }
                     updatePaginationValues();
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
                     scope.$isLoading = false;
                     scope[as] = entries || {};
                     var scopeAs = "scope."+as;
                     if(attrs.includeCount){
                       scope.count = attrs.includeSchema ? count :schema;
                     }
                     if (attrs.includeSchema){
                         scope.schema = schema;
                     }
                     updatePaginationValues();
                     scope.$apply();
                 }, function error(err) {
                    console.error("error",err);
                 });
        }
          scope.loadMoreNumber = 0;
          scope.$pagination.loadMore = function(){
            if(scope.$pagination.currentPage === scope.$pagination.totalPages){
              return;
            }
            scope.$isLoading = true;
            scope.loadMoreNumber++;
            var skipEntries = scope.loadMoreNumber*Number(attrs.limit);
            entry.skip(skipEntries);
            entry
            .toJSON()
            .find()
            .spread(function success(entries, schema, count) {
                 scope.$isLoading = false;
                 if(entries.length){
                   scope.$pagination.currentPage++;
                 }
                 var concatData = scope[as].concat(entries);
                 scope[as] = concatData || [];
                 if(attrs.includeCount){
                   scope.$pagination.totalCount = attrs.includeSchema ? count :schema;
                 }
                 if (attrs.includeSchema) {
                     scope.schema = schema;
                 }
                 scope.$apply();
             }, function error(err) {
                console.error("error",err);
             });
          };
        var updatePaginationValues = function(){
          scope.$pagination.totalCount = scope.count;
          scope.$pagination.totalPages =  Math.ceil(scope.$pagination.totalCount/attrs.limit);
          scope.$pagination.itemsPerPage = attrs.limit;
        };
          scope.$pagination.currentPage = 1;
          var newEntries = function(skipEntries){
              entry.skip(skipEntries);
              entry
              .toJSON()
              .find()
              .spread(function success(entries, schema, count) {
                   scope.$isLoading = false;
                   scope[as] = entries;
                   if(attrs.includeCount){
                     scope.$pagination.totalCount = attrs.includeSchema ? count :schema;
                   }
                   if (attrs.includeSchema) {
                       scope.schema = schema;
                   }
                   scope.$apply();
               }, function error(err) {
                  console.error("error",err);
               });
          };
          var skipEntries = scope.$pagination.currentPage*Number(attrs.limit);
          scope.$pagination.next = function(){
            if(scope.$pagination.currentPage === scope.$pagination.totalPages){
              return;
            }
            scope.$isLoading = true;
            var skipEntries = scope.$pagination.currentPage*Number(attrs.limit);
            newEntries(skipEntries);
            scope.$pagination.currentPage++;
          };
          scope.$pagination.previous = function(){
            if(scope.$pagination.currentPage <= 1){
              return;
            }
            scope.$isLoading = true;
            scope.$pagination.isLoading = true;
            scope.$pagination.currentPage--;
            var skipEntries = (scope.$pagination.currentPage-1)*Number(attrs.limit);
            newEntries(skipEntries);
          };
      }
    }

})();
