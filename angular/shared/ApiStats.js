'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.stats', []).service('API_STATS', function (ENV, $http) {
    return {

        /* Stats
           ========================================================================== */
        getStatsLast7daysPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getStatsLast7days
            });
        },

        getStatsLastMonthPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getStatsLastMonth
            });
        },

        getStatsAllTimePromise: function () {
            return $http({
                method: "GET",
                url: ENV.getStatsAllTime
            });
        }
    }
});