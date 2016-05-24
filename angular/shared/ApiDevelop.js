'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Develop Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop').factory('DevelopRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://intshop-admin.dev:8080');
    });
});

angular.module('intshop').service('ApiDevelop', function (DevelopRestangular, CONSTANTS) {
    return {
        getShopDetailsPromise: function (id) {
            return DevelopRestangular.one('api').one("shop-details.json").get();
        },
        getShopLastOrdersPromise: function (id, limit) {
            return DevelopRestangular.one('api').one("shop-last-orders.json").get();
        },
        getShopImageUrl: function (id) {
            return CONSTANTS.SHOP_IMAGES + id + ".jpg";
        }
    }
});