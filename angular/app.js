'use strict';

/*
 |--------------------------------------------------------------------------
 | Angular IntShop Admin module
 |--------------------------------------------------------------------------
 */
angular.module('intshop', ['restangular', 'datatables', 'googlechart', 'filters']);

/**
 * App constants
 */
angular.module('intshop').constant('CONSTANTS', (function () {
    var url = 'http://intshop-admin.dev:8080'; //http://test.intshop.com

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