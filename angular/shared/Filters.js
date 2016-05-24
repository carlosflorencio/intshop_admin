'use strict';

/*
 |--------------------------------------------------------------------------
 | Filters
 |--------------------------------------------------------------------------
 */
angular.module('intshop.filters', [])

    .filter('money', function (CONSTANTS) {
        return function (number) {
            return CONSTANTS.CURRENCY + " " + parseFloat(number).toFixed(2);
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
    });
