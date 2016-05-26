'use strict';

/*
 |--------------------------------------------------------------------------
 | Angular IntShop Admin module
 |--------------------------------------------------------------------------
 */
angular.module('intshop', [
    'restangular',
    'datatables',
    'googlechart',
    'intshop.filters',
    'intshop.env',
    'intshop.api.shops',
    'intshop.api.drivers',
    'intshop.api.orders',
    'intshop.api.clients',
    'intshop.api.stats'
]);

/**
 * App constants
 */
angular.module('intshop').constant('CONSTANTS', (function () {
    return {
        CURRENCY: '£'
    }
})());


/**
 * Init some things
 */
angular.module('intshop').run(function ($rootScope, store) {


});