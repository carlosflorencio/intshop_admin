'use strict';

/*
 |--------------------------------------------------------------------------
 | Angular IntShop Admin module
 |--------------------------------------------------------------------------
 */
angular.module('intshop', ['restangular']);

/**
 * App constants
 */
angular.module('intshop').constant('CONSTANTS', (function () {
    return {
        CURRENCY: '£'
    }
})());

/**
 * Configure Restangular
 */
angular.module('intshop').config(["RestangularProvider", function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://test.intshop.com');
}]);

/**
 * Init some things
 */
angular.module('intshop').run(["$rootScope", "store", function ($rootScope, store) {


}]);
'use strict';

/*
|--------------------------------------------------------------------------
| Local Storage Service
|--------------------------------------------------------------------------
*/
angular.module('intshop').service('store', ['$window', function ($window) {
    return {
        get: function (key) {
            if ( $window.localStorage.getItem(key) )  {
                var cart = angular.fromJson( $window.localStorage.getItem(key) ) ;
                return JSON.parse(cart);
            }
            return false;

        },


        set: function (key, val) {

            if (val === undefined) {
                $window.localStorage.removeItem(key);
            } else {
                $window.localStorage.setItem( key, angular.toJson(val) );
            }
            return $window.localStorage.getItem(key);
        }
    }
}]);
'use strict';

/*
|--------------------------------------------------------------------------
| Shops Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('shopsController', ["$scope", "Restangular", function ($scope, Restangular) {

    // Fetch shops
    Restangular.one('Retailers').getList('getRetailerList').then(function(result) {
        $scope.shops = result;
    });
}]);