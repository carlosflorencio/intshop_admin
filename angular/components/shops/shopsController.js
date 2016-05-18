'use strict';

/*
|--------------------------------------------------------------------------
| Shops Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('shopsController', function ($scope, Restangular) {

    // Fetch shops
    Restangular.one('Retailers').getList('getRetailerList').then(function(result) {
        $scope.shops = result;
    });
});