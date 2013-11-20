'use strict';

/* A trick to make Boostrap DropDown menu work with AngularJS: */
angular.module('affableBeanApp.directives', []).
  directive('bootstrapDropdown', [function() {
    return function(scope, element, attrs) {
        jQuery('html').on('click', function () {
            element.removeClass('open')
        })
        
        jQuery('.dropdown-toggle', element).on('click', function(e) {
            element.toggleClass('open');
            return false;
        });
    };
  }]);
