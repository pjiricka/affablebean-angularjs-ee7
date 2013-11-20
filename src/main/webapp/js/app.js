'use strict';

// Declare application level module which depends on services and directives
angular.module('affableBeanApp', ['affableBeanApp.services', 'affableBeanApp.directives']);

// configure application's routeProvider:
angular.module('affableBeanApp').config(['$routeProvider', function($routeProvider) {
  
    // main page:
    $routeProvider.when('/main', 
        {templateUrl: 'partials/main.html', 
         controller: MainController});
     
     // department page:
    $routeProvider.when('/department/:departmentId', 
        {templateUrl: 'partials/department.html', 
         controller: DepartmentController});
     
     // shopping cart page:
    $routeProvider.when('/cart', 
        {templateUrl: 'partials/cart.html', 
         controller: CartController});
    
    // checkout page:
    $routeProvider.when('/checkout', 
        {templateUrl: 'partials/checkout.html', 
         controller: CheckoutController});
    
    // default fallback page:
    $routeProvider.otherwise({redirectTo: '/main'});
    
  }]);
