'use strict';

/*
 |--------------------------------------------------------------------------
 | Angular IntShop Admin module
 |--------------------------------------------------------------------------
 */
angular.module('intshop', ['restangular', 'datatables']);

/**
 * App constants
 */
angular.module('intshop').constant('CONSTANTS', (function () {
    var url = 'http://test.intshop.com';

    return {
        CURRENCY: '£',
        SHOP_IMAGES: url + '/images/retailer-profile/' // [shop Id].jpg
    }
})());

/**
 * Configure Restangular
 */
angular.module('intshop').config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://test.intshop.com');
});

/**
 * Init some things
 */
angular.module('intshop').run(function ($rootScope, store) {


});