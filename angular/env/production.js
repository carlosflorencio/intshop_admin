'use strict';

/*
 |--------------------------------------------------------------------------
 | Production Env (change the env in the gulpfile)
 |--------------------------------------------------------------------------
 */
angular.module('intshop.env', []).constant('ENV', (function () {
    var url = 'http://intshop-admin.dev:8080/api/';

    return {
        // General
        type: 'development',
        url: url,

        // Images
        getShopImageUrlById: function(id) {
            return url + 'images/retailer-profile/' + id + ".jpg"
        },

        // API ENDPOINTS
        getShopDetailsUrl: url + 'shop-details.json',
        getShopLastOrdersUrl: url + 'shop-last-orders.json',
    }
})());