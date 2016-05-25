'use strict';

/*
 |--------------------------------------------------------------------------
 | Urls Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop').service('urls', function () {
    return {
        linkToHome: function() {
          return 'index.jsp';
        },
        linkToDriversList: function() {
            return 'drivers.jsp'
        },
        linkToShopsList: function() {
            return 'shops.jsp'
        },
        linkToClientsList: function() {
            return 'clients.jsp'
        },
        linkToOrderInfo: function(id) {
            return 'order-info.jsp?id=' + id;
        },
        linkToOrdersList: function() {
            return 'orders.jsp'
        },
        linkToShopItemsPage: function(id) {
            return 'http://test.intshop.com/shop-items.jsp';
        },
        linkToShopDetails: function(id) {
            return 'shop-details.jsp?id=' + id;
        },
        linkToDriversDetails: function(id) {
            return 'driver-details.jsp?id=' + id;
        },
        linkToClientDetails: function(id) {
            return 'client-details.jsp?id=' + id;
        }
    }
});