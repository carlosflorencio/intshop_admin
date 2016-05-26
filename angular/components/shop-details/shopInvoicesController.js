'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Invoices Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopInvoicesController', function ($scope, $rootScope,
                                                                         $timeout, utils, CONSTANTS, ENV, API_SHOPS,
                                                                         DTOptionsBuilder) {

    var vm = this;
    vm.test = 2;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:shop-invoices', function (event, data) {
        if (!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;

        // Get shop invoices chart
        vm.setChartType(0);

        // Get shop all invoices
        vm.setInvoiceType(0);

        vm.loaded = true;
    }

    /* Chart
     ========================================================================== */
    vm.invoicesChart = {};
    vm.invoicesChart.type = "ColumnChart";

    vm.invoicesChart.options = {
        legend: {position: 'none'},
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        colors: ['#3493d5']
    };

    vm.chartType = 0; // 0 = 1 year, 1 = 6 months, 2 = 1 month

    // Store invoice data
    var chartData = [];

    vm.setChartType = function (type) {

        if (chartData[type]) { // Get cached results
            vm.chartType = type;
            vm.invoicesChart.data = chartData[type];
            return;
        }

        switch (type) {
            case 0:
                API_SHOPS.getShopInvoicesChartYearPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;

            case 1:
                API_SHOPS.getShopInvoicesChart6MonthsPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
            case 2:
                API_SHOPS.getShopInvoicesChart1MonthPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
        }
    };

    function setChartData(type, data) {
        chartData[type] = utils.getColumnChartDataFromObject(data);
        vm.invoicesChart.data = chartData[type];
        vm.chartType = type;
    }

    /* Invoices tabs
     ========================================================================== */
    vm.invoicesType = 0; // 0 = all, 1 = due, 2 = paid

    // Store invoice data
    var invoicesData = [];

    vm.setInvoiceType = function (type) {

        if (invoicesData[type]) { // Get cached results
            vm.invoicesType = type;
            vm.invoices = invoicesData[type];
            return;
        }

        switch (type) {
            case 0:
                API_SHOPS.getShopAllInvoicesPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;

            case 1:
                API_SHOPS.getShopDueInvoicesPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;
            case 2:
                API_SHOPS.getShopPaidInvoicesPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;
        }
    };

    function setInvoiceData(type, data) {
        invoicesData[type] = data;
        vm.invoices = data;
        vm.invoicesType = type;
    }

    /* Datatable
     ========================================================================== */
    vm.dtInstance = {};

    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('numbers')
        .withOption('aaSorting', [])
        //.withDisplayLength(3)
        .withOption('sDom', 'rt<"dt-i-m"p>');


    /* Send alert
     ========================================================================== */
    vm.sendAlert = function() {
        API_SHOPS.getShopInvoiceSendAlertPromise(vm.details._id.$oid).then(function(response) {
            console.log(response.status);
        });
    }
});