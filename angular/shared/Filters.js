'use strict';

/*
 |--------------------------------------------------------------------------
 | Filters
 |--------------------------------------------------------------------------
 */
angular.module('intshop.filters', [])

    .filter('money', function (CONSTANTS) {
        return function (number) {

            var n = parseFloat(number).toFixed(2);

            if(isNaN(n))
                n = 0;

            return CONSTANTS.CURRENCY + " " + n;
        };
    })

    .filter('fullDate', function (utils) {
        return function (date) {
            return utils.getFullDate(date);
        };
    })

    .filter('monthDate', function (utils) {
        return function (date) {
            return utils.getMonthDate(date);
        };
    })

    .filter('simpleDate', function (utils) {
        return function (date) {
            var d = new Date(date);
            return utils.pad(d.getDate(), 2) + '/' + utils.pad(d.getMonth() + 1, 2) + '/' + d.getFullYear();
        };
    })

    .filter('capitalize', function () {
        return function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        };
    });
