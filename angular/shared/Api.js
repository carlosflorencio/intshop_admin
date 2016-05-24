'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api', []).service('API', function (ENV, $http) {
    return {
        getShopDetailsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getShopDetailsUrl,
                params: {id: id}
            });
        },
        getShopLastOrdersPromise: function (id, limit) {
            return $http({
                method: "GET",
                url: ENV.getShopLastOrdersUrl,
                params: {id: id, limit: limit}
            });
        },
        getShopSalesChartPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getShopSalesChart,
                params: {id: id}
            });
        }
    }
});