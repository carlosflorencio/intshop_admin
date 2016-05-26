'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.shops', []).service('API_SHOPS', function (ENV, $http) {
    return {

        /* Shop list
           ========================================================================== */
        getShopListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getShopListUrl
            });
        },

        /* Shop details
           ========================================================================== */
        getShopDetailsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getShopDetailsUrl,
                params: {id: id}
            });
        },

        getShopRestorePromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopRestoreUrl,
                params: {id: id}
            });
        },

        getShopSuspendPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopSuspendUrl,
                params: {id: id}
            });
        },

        /* Shop resume
           ========================================================================== */
        getShopLastOrdersPromise: function (id, limit) {
            return $http({
                method: "GET",
                url: ENV.getShopLastOrdersUrl,
                params: {id: id, limit: limit}
            });
        },

        getShopSalesChartPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getShopSalesChartUrl,
                params: {id: id}
            });
        },


        /* Shop sales
           ========================================================================== */
        getShopSalesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopSalesUrl,
                params: {id: id}
            });
        },

        /* Shop invoices
           ========================================================================== */
        getShopAllInvoicesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopAllInvoicesUrl,
                params: {id: id}
            });
        },

        getShopDueInvoicesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopDueInvoicesUrl,
                params: {id: id}
            });
        },

        getShopPaidInvoicesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopPaidInvoicesUrl,
                params: {id: id}
            });
        },

        getShopInvoicesChartYearPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopYearInvoiceChartUrl,
                params: {id: id}
            });
        },

        getShopInvoicesChart6MonthsPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShop6MonthsInvoiceChartUrl,
                params: {id: id}
            });
        },

        getShopInvoicesChart1MonthPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShop1MonthInvoiceChartUrl,
                params: {id: id}
            });
        },

        getShopInvoiceSendAlertPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopInvoiceSendAlertUrl,
                params: {id: id}
            });
        }
    }
});