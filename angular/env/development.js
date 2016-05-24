'use strict';

/*
 |--------------------------------------------------------------------------
 | Development Env (change the env in the gulpfile)
 |--------------------------------------------------------------------------
 */
angular.module('intshop.env', []).constant('ENV', (function () {
    var url = 'http://intshop-admin.dev:8080';

    return {
        // General
        type: 'development',
        url: url,

        // Images
        getShopImageUrlById: function(id) {
            return url + "/assets/images/tesco.jpg";
        },

        // API ENDPOINTS
        getShopDetailsUrl: url + '/api/shop-details.json',
        getShopLastOrdersUrl: url + '/api/shop-last-orders.json',
        getShopSalesChart: url + '/api/shop-sales-chart.json'
    }
})());

/*
|--------------------------------------------------------------------------
| Log $http requests
|--------------------------------------------------------------------------
*/
angular.module('intshop').config(function($provide, $httpProvider) {
    $provide.factory('myHttpInterceptor', function($q) {
        return {
            'request': function(config) {
                var params = config.params ? JSON.stringify(config.params) : 'no';
                console.log("REQUEST: " + config.url + " PARAMS: " + params);
                return config;
            }
        };
    });


    $httpProvider.interceptors.push('myHttpInterceptor');
});