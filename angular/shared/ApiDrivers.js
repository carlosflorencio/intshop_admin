'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.drivers', []).service('API_DRIVERS', function (ENV, $http) {
    return {

        /* Drivers list
         ========================================================================== */
        getDriversListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getDriversListUrl
            });
        },

        /* Driver details
         ========================================================================== */
        getDriverDetailsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDetailsUrl,
                params: {id: id}
            });
        },

        getDriverRestorePromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getDriverRestoreUrl,
                params: {id: id}
            });
        },

        getDriverSuspendPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getDriverSuspendUrl,
                params: {id: id}
            });
        },

        /* Resume tab
         ========================================================================== */
        getDriverDeliverysChart1YearPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDeliveryChart1YearUrl,
                params: {id: id}
            });
        },
        getDriverDeliverysChart6MonthsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDeliveryChart6MonthsUrl,
                params: {id: id}
            });
        },
        getDriverDeliverysChart1MonthPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDeliveryChart1MonthUrl,
                params: {id: id}
            });
        },
        getDriverLastInvoicesPromise: function (id, limit) {
            return $http({
                method: "GET",
                url: ENV.getDriverLastInvoicesUrl,
                params: {id: id, limit: limit}
            });
        },

        /* Deliverys tab
         ========================================================================== */
        getDriverDeliverysListPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDeliverysListUrl,
                params: {id: id}
            });
        },

        /* Invoices tab
         ========================================================================== */
        getDriverInvoicesChart1YearPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesChart1YearUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesChart6MonthsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesChart6MonthsUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesChart1MonthPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesChart1MonthUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesListAllPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesListAllUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesListPaidPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesListPaidUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesListDuePromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesListDueUrl,
                params: {id: id}
            });
        }
    }
});