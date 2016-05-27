'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.clients', []).service('API_CLIENTS', function (ENV, $http) {
    return {

        /* Clients list
           ========================================================================== */
        getClientsListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getClientsListUrl
            });
        },

        /* Client details
           ========================================================================== */
        getClientDetailsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getClientDetailsUrl,
                params: {id: id}
            });
        },

        getClientRestorePromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getClientRestoreUrl,
                params: {id: id}
            });
        },

        getClientSuspendPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getClientSuspendUrl,
                params: {id: id}
            });
        },

        /* Resume tab
         ========================================================================== */
        getClientOrdersChart1YearPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getClientOrdersChart1YearUrl,
                params: {id: id}
            });
        },
        getClientOrdersChart6MonthsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getClientOrdersChart6MonthsUrl,
                params: {id: id}
            });
        },
        getClientOrdersChart1MonthPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getClientOrdersChart1MonthUrl,
                params: {id: id}
            });
        },
        getClientLastOrdersPromise: function (id, limit) {
            return $http({
                method: "GET",
                url: ENV.getClientLastOrdersUrl,
                params: {id: id, limit: limit}
            });
        },

        /* Orders tab
         ========================================================================== */
        getClientOrdersListPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getClientOrdersListUrl,
                params: {id: id}
            });
        },

        /* Reviews tab
         ========================================================================== */
        getClientReviewsListPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getClientReviewsListUrl,
                params: {id: id}
            });
        }
    }
});