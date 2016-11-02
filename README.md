# angular-contentstack
AngularJS module for Built.io Contentstack - Content Delivery API

## Usage

**Setup**

Include the Contentstack AngularJS min file in the script tag.

```xml
<script type="text/javascript" src="dist/angular-contentstack.min.js"></script>
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
	            'api_key': 'Stack api key',
	            'access_token': 'Stack accestoken',
	            'environment': 'Your environment'
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
     <li data-ng-repeat="entry in entries">{{entry.title}}</li>
    </ul>
  </contentstack-entry>
```
Note: If "as" attribute is not provided then by default the entries are available as $contentstackEntries variable.

##### Get a single Entry using entry ID :
```xml
  <contentstack-entry content-type="news" uid="blt12345678910" as="entry">
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

# Pagination

The pagination helper can be used to paginate contentstack entries. Lets take a look at the variables and functions it provides -

**Pagination Variables**
* **$pagination.currentPage**- gives current page number
* **$pagination.totalPages**- gives total number of pages
* **$pagination.totalCount**- gives total number of entries
* **$pagination.itemsPerPage**- gives count of entries per page

**Pagination Methods**
* **$pagination.previous()**- returns pervious page entries and replaces the DOM with the new page entries
* **$pagination.next()**- returns next page entries and replaces the DOM with new page entries
* **$pagination.loadMore()**- load next page entries and appends new entries in DOM. Use this for infinite scrolling.

**Example (Next/Previous Pagination):**
``` sh
<button data-ng-disabled ="$pagination.currentPage === 1" data-ng-if="entry" data-ng-click="$pagination.previous()">Previous</button>
<button data-ng-disabled="$pagination.currentPage === $pagination.totalPages" data-ng-if="entries" data-ng-click="!isLoading && $pagination.next()">Next</button>
<span data-ng-if="entries">Current Page {{$pagination.currentPage}}</span>
<span data-ng-if="entries">Total Pages {{$pagination.totalPages}}</span>
<span data-ng-if="entries">Total Count {{$pagination.totalCount}}</span>

<contentstack-entry content-type="news" as="entries" limit="3" >
  	<div data-ng-if="!$isLoading"   data-ng-repeat="entry in entries" >
  		<header>
  		  <h1 data-ng-bind="entry.title"></h1>
  		</header>
  		<div>
  		  <div data-ng-bind-html="entry.body"></div>
  		</div>
  	</div>
  	<div class="loader" data-ng-if="entries && $isLoading">Loading...</div>
</contentstack-entry>
```

**Example (Load More):**

``` sh
<contentstack-entry content-type="news" as="entries" limit="3" >
  	<div data-ng-repeat="entry in entries" >
  		<header>
  		  <h1 data-ng-bind="entry.title"></h1>
  		</header>
  		<div>
  		  <div data-ng-bind-html="entry.body"></div>
  		</div>
  	</div>
  	<div data-ng-if="entries && $isLoading">Loading...</div>
  	<div data-ng-if="!$isLoading && && ($pagination.currentPage !== $pagination.totalPages)">NO MORE DATA</div>
    <button data-ng-if="!$isLoading && ($pagination.currentPage !== $pagination.totalPages)" data-ng-click="$pagination.loadMore()">loadMore</button>
</contentstack-entry>
```

# DEMO
* [News App Example with Next/Previous Pagination](https://plnkr.co/edit/9DwuB4b2FZkaOooi7CCO?p=preview)
* [News App Example with Infinite Scroll (load more)](https://plnkr.co/edit/lDB8Gy9G3aupt4wCbRlo?p=preview )
<!-- * [Sample Ionic App](https://harshalpatel91.github.io/Ionic_using_Ng-contentsatck/#/app/overview)
 -->