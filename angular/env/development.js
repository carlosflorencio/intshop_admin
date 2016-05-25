'use strict';

/*
 |--------------------------------------------------------------------------
 | Development Env (change the env in the gulpfile)
 |--------------------------------------------------------------------------
 */
angular.module('intshop.env', []).constant('ENV', (function () {
    var url = 'http://intshop-admin.dev:8080';

    return {
        // General
        type: 'development',
        url: url,

        // Images
        getShopImageUrlById: function (id) {
            return url + "/assets/images/tesco.jpg";
        },
        getDriverImageUrlById: function (id) {
            return url + "/assets/images/image-icon.png";
        },
        getDriverVehicleImageUrlByType: function (type) {
            return url + "/assets/images/" + type + ".png";
        },

        // API ENDPOINTS

        // Shops
        getShopDetailsUrl: url + '/api/shop/shop-details.json',
        getShopListUrl: url + '/api/shop/shop-list.json',
        getShopLastOrdersUrl: url + '/api/shop/resume/shop-last-orders.json',
        getShopSalesChartUrl: url + '/api/shop/resume/shop-sales-chart.json',
        getShopSuspendUrl: url + '/api/shop/shop-details.json',
        getShopRestoreUrl: url + '/api/shop/shop-details.json',
        getShopSalesUrl: url + '/api/shop/sales/shop-sales.json',
        getShopAllInvoicesUrl: url + '/api/shop/invoices/shop-invoices-all.json',
        getShopDueInvoicesUrl: url + '/api/shop/invoices/shop-invoices-due.json',
        getShopPaidInvoicesUrl: url + '/api/shop/invoices/shop-invoices-paid.json',
        getShopYearInvoiceChartUrl: url + '/api/shop/invoices/shop-chart-year.json',
        getShop6MonthsInvoiceChartUrl: url + '/api/shop/invoices/shop-chart-6m.json',
        getShop1MonthInvoiceChartUrl: url + '/api/shop/invoices/shop-chart-1m.json',

        // Drivers
        getDriversListUrl: url + '/api/drivers/drivers-list.json',

        // Orders
        getOrdersListUrl: url + '/api/orders/orders-list.json'
    }
})());

/*
 |--------------------------------------------------------------------------
 | Log $http requests
 |--------------------------------------------------------------------------
 */
angular.module('intshop').config(function ($provide, $httpProvider) {
    $provide.factory('myHttpInterceptor', function ($q) {
        return {
            'request': function (config) {
                var params = config.params ? JSON.stringify(config.params) : 'no';
                console.log("REQUEST: " + config.url + " PARAMS: " + params);
                return config;
            }
        };
    });


    $httpProvider.interceptors.push('myHttpInterceptor');
});