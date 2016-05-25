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
        }

    }
});