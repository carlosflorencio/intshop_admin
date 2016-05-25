'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.drivers', []).service('API_DRIVERS', function (ENV, $http) {
    return {

        /* Drivers list
           ========================================================================== */
        getDriversListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getDriversListUrl
            });
        }

    }
});