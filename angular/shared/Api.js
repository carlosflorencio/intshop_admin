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
                url: ENV.getShopSalesChartUrl,
                params: {id: id}
            });
        },
        getShopSuspendPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopSuspendUrl,
                params: {id: id}
            });
        },
        getShopRestorePromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopRestoreUrl,
                params: {id: id}
            });
        },
        getShopSalesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopSalesUrl,
                params: {id: id}
            });
        }
    }
});