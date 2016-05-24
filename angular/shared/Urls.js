'use strict';

/*
 |--------------------------------------------------------------------------
 | Urls Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop').service('urls', function () {
    return {
        linkToOrderInfo: function(id) {
            return 'orders-info.jsp?id=' + id;
        },
        linkToOrdersList: function() {
            return 'orders.jsp'
        },
        linkToShopItemsPage: function(id) {
            return 'http://test.intshop.com/shop-items.jsp';
        }
    }
});