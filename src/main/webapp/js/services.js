'use strict';

// create new module with its dependencies:
angular.module('affableBeanApp.services', ['ngResource']);

// and now add some services to is:

// fetch products for shopping department service; offline version:
//angular.module('affableBeanApp.services').factory('Shop', function($resource){
//  return $resource('json/:departmentId.json', {departmentId:'@departmentId'}, {
//  });
//});

// fetch products for shopping department service; online version:
angular.module('affableBeanApp.services').factory('Shop', function($resource){
  return $resource('http://localhost\::port/AffableBean/rest/department/:departmentId', 
            {departmentId:'@departmentId', port:8080}, {});
});

// make purchase service:
angular.module('affableBeanApp.services').factory('Purchase', function($resource){
  return $resource('http://localhost\::port/AffableBean/rest/purchase/', 
            {port:8080}, {});
});

// shopping cart service:
angular.module('affableBeanApp.services').factory('Cart', function(){
    var shoppingCart = function () {
        this.items = [];
        this.listeners = [];
        this.add = function(product) {
            this.items.push( product);
            this.fireChanges();
        }
        this.fireChanges = function() {
            for (var i = 0; i < this.listeners.length; i++) {
                this.listeners[i].call();
            }
        }
        this.remove = function(product) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i] === product) {
                    this.items.splice(i,1);
                    this.fireChanges();
                    return;
                }
            }
        }
        this.removeAll = function() {
            this.items = [];
            this.fireChanges();
        }
        this.size = function() {
            return this.items.length;
        }
        this.getProducts = function() {
            return this.items;
        }
        this.addListener = function(listener) {
            this.listeners.push( listener);
        }
        this.getTotal = function() {
            var total = 0;
            for (var i = 0; i < this.items.length; i++) {
                total += this.items[i].price;
            }
            return total.toFixed(2);
        }

    };
    return new shoppingCart();
});
