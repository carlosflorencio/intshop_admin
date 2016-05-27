'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.orders', []).service('API_ORDERS', function (ENV, $http) {
    return {

        /* Orders list
           ========================================================================== */
        getOrdersListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getOrdersListUrl
            });
        },

        /* Order details
           ========================================================================== */
        getOrdersDetailsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getOrdersDetailsUrl,
                params: {id: id}
            });
        }

    }
});