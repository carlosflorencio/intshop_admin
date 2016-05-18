'use strict';

/*
 |--------------------------------------------------------------------------
 | Angular IntShop Admin module
 |--------------------------------------------------------------------------
 */
angular.module('intshop', ['restangular']);

/**
 * App constants
 */
angular.module('intshop').constant('CONSTANTS', (function () {
    return {
        CURRENCY: '£'
    }
})());

/**
 * Configure Restangular
 */
angular.module('intshop').config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('url');
});

/**
 * Init some things
 */
angular.module('intshop').run(function ($rootScope, cartService, store) {


});