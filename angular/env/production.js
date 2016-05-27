'use strict';

/*
 |--------------------------------------------------------------------------
 | Production Env (change the env in the gulpfile)
 |--------------------------------------------------------------------------
 */
angular.module('intshop.env', []).constant('ENV', (function () {
    var url = 'http://api.intshop.com';

    return {
        // General
        type: 'production',
        url: url,

        // Images
        getShopImageUrlById: function (id) {
            return url + "/assets/images/tesco.jpg";
        },
        getDriverImageUrlById: function (id) {
            return url + "/assets/images/user-image.jpg";
        },
        getDriverVehicleImageUrlByType: function (type) {
            return url + "/assets/images/" + type + ".png";
        },
        getClientImageUrlById: function (id) {
            return url + "/assets/images/user-image.jpg";
        },
        getItemImageUrlById: function (id) {
            var img = Math.random() >= 0.5 ? 'product_thumb1.jpg' : 'product_thumb2.jpg';

            return url + "/assets/images/" + img;
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
        getShopInvoiceSendAlertUrl: url + '/api/shop/invoices/shop-chart-1m.json',

        // Drivers
        getDriversListUrl: url + '/api/drivers/drivers-list.json',
        getDriverDetailsUrl: url + '/api/drivers/driver-details.json',
        getDriverSuspendUrl: url + '/api/drivers/driver-details.json',
        getDriverRestoreUrl: url + '/api/drivers/driver-details.json',
        getDriverDeliveryChart1YearUrl: url + '/api/drivers/resume/driver-chart-year.json',
        getDriverDeliveryChart6MonthsUrl: url + '/api/drivers/resume/driver-chart-6m.json',
        getDriverDeliveryChart1MonthUrl: url + '/api/drivers/resume/driver-chart-1m.json',
        getDriverLastInvoicesUrl: url + '/api/drivers/resume/driver-last-invoices.json',
        getDriverDeliverysListUrl: url + '/api/drivers/deliverys/driver-deliverys.json',
        getDriverInvoicesChart1MonthUrl: url + '/api/drivers/invoices/driver-chart-1m.json',
        getDriverInvoicesChart6MonthsUrl: url + '/api/drivers/invoices/driver-chart-6m.json',
        getDriverInvoicesChart1YearUrl: url + '/api/drivers/invoices/driver-chart-year.json',
        getDriverInvoicesListAllUrl: url + '/api/drivers/invoices/driver-invoices-all.json',
        getDriverInvoicesListDueUrl: url + '/api/drivers/invoices/driver-invoices-due.json',
        getDriverInvoicesListPaidUrl: url + '/api/drivers/invoices/driver-invoices-paid.json',
        getDriverInvoicesSendAlertUrl: url + '/api/drivers/invoices/driver-invoices-paid.json',

        // Orders
        getOrdersListUrl: url + '/api/orders/orders-list.json',
        getOrdersDetailsUrl: url + '/api/orders/order-details.json',

        // Clients
        getClientsListUrl: url + '/api/clients/clients-list.json',
        getClientDetailsUrl: url + '/api/clients/client-details.json',
        getClientOrdersChart1MonthUrl: url + '/api/clients/resume/client-chart-1m.json',
        getClientOrdersChart6MonthsUrl: url + '/api/clients/resume/client-chart-6m.json',
        getClientOrdersChart1YearUrl: url + '/api/clients/resume/client-chart-year.json',
        getClientLastOrdersUrl: url + '/api/clients/resume/client-last-orders.json',
        getClientReviewsListUrl: url + '/api/clients/reviews/client-reviews.json',
        getClientOrdersListUrl: url + '/api/clients/orders/client-orders.json',
        getClientSuspendUrl: url + '/api/clients/client-details.json',
        getClientRestoreUrl: url + '/api/clients/client-details.json',

        // Stats
        getStatsLast7days: url + '/api/stats/stats-7days.json',
        getStatsLastMonth: url + '/api/stats/stats-last-month.json',
        getStatsAllTime: url + '/api/stats/stats-all-time.json'
    }
})());