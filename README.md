# angular-contentstack 
AngularJS module for Built.io Contentstack - Content Delivery API

## Usage

**Setup** 

[Download](http://www.built.io) the AngularJS SDK and include it in the script tag.

```xml
<script type="text/javascript" charset="utf-8" src="js/angular-contentstack.min.js"></script>
```

Then add the `contentstack` module to the dependencies of your AngularJS application module and configure it in a config block using the `stackProvider`:

**Configuration**
### 
```javascript
angular.module('app', ['contentstack']);
```

```javascript
angular
   .module('app')
   .config(['$locationProvider', 'stackProvider',
	    function($locationProvider, stackProvider) {
	        // initialize the stack
	        stackProvider.initialize({
	            'api_key': 'blt599456119258816d',
	            'access_token': 'blt2361f4c5ab53e37eab6d10ee',
	            'environment': 'development'
	        });
	    }
	]);
```

Once stackProvider configuration is done, you can use directives and services. 

## contentstack-entry directive
Retrive all the entires or a single entry of a Content Type.

##### Syntax:
```xml
    <contentstack-entry content-type="{Content_Type_ID}"> </contentstack-entry>
```

##### Get multiple entries :

```xml
  <contentstack-entry content-type="blog" as="entries">
    <!--Your will get "entires" array of entry objects -->
    <ul>
    <ng-repeat entry in entries>
        <li>{{entry.title}}</li>
    </ng-repeat>
    </ul>
  </contentstack-entry>
```
Note: If "as" attribute is not provided then by default the entries are available as $contentstackEntries variable.

##### Get a single Entry using entry ID :
```xml
  <contentstack-entry content-type="news" entry-uid="blt12345678910" as="entry">
    <!--Your will get "entry" object -->
    <h1>{{entry.title}}</h1>
  </contentstack-entry>
```
Note: If "as" attribute is not provided then by default the entry is available as $contentstackEntry variable.

##### Queries  :
All the JS SDK Query functions are supported as an attribute.

For Example:

**limit**

        <contentstack-entry content-type="news" limit="5">

**locale**

        <contentstack-entry content-type="news" locale="hi-hi">

**includeReference**

        <contentstack-entry content-type="news" includeReference="categories">


For more functions, check out the [JS SDK Query documentation](https://contentstackdocs.built.io/js/api/global.html#Query).

## Service
The contentstack service can be injected as follows:

    angular
    .module('myApp')
    .controller('MyController', function(contentstack){
        // contentstack service is a stack object initialiased with options provided to the stackProvider.
        var Query = contentstack.ContentType("News").Query(); // build query object for news content type
        Query
          .limit(10)
          .toJSON()
          .find()
          .then(function success(result) {
            // result is array where -
            // result[0] => entry objects
            // result[result.length-1] => entry objects count included only when .includeCount() is queried.
            // result[1] => schema of the content type is included when .includeSchema() is queried.
        }, function error(err) {
           // err object
        })
    });

