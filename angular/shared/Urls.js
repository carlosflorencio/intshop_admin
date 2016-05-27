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
        linkToOrderInfo: function(id, from) {
            from = typeof from !== 'undefined' ? from : 'orders';
            return 'order-info.jsp?id=' + id + '&from=' + from;
        },
        linkToOrdersList: function() {
            return 'orders.jsp'
        },
        linkToShopItemsPage: function(id) {
            return 'http://test.intshop.com/shop-items.jsp';
        },
        linkToShopDetails: function(id, tab) {
            tab = typeof tab !== 'undefined' ? tab : 0;
            return 'shop-details.jsp?id=' + id + '&tab=' + tab;
        },
        linkToDriversDetails: function(id, tab) {
            tab = typeof tab !== 'undefined' ? tab : 0;
            return 'driver-details.jsp?id=' + id + '&tab=' + tab;
        },
        linkToClientDetails: function(id, tab) {
            tab = typeof tab !== 'undefined' ? tab : 0;
            return 'client-details.jsp?id=' + id + '&tab=' + tab;
        },
        linkToDelivery: function(id) {
            return 'order-info.jsp?id=' + id + '&from=deliverys';
        },
        logout: function() {
            return 'logout.jsp';
        },
        linkToUserProfile: function() {
            return 'profile.jsp';
        }
    }
});