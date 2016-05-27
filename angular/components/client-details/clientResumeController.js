'use strict';

/*
 |--------------------------------------------------------------------------
 | Client Resume Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('clientResumeController', function ($scope, $rootScope,
                                                                       $timeout, utils, CONSTANTS, ENV, API_CLIENTS) {

    var vm = this;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:client-resume', function (event, data) {
        if(!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;

        // Get client last orders
        API_CLIENTS.getClientLastOrdersPromise(vm.details._id.$oid, 5).then(function(response) {
            vm.orders = response.data;
        });

        // Load 1 year orders chart
        vm.setChartType(0);

        vm.loaded = true;
    }


    /* Functions
     ========================================================================== */
    // Image
    vm.image = function (id) {
        return ENV.getClientImageUrlById(id);
    };

    /* Chart
     ========================================================================== */
    vm.ordersChart = {};
    vm.ordersChart.type = "ColumnChart";

    vm.ordersChart.options = {
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
            vm.ordersChart.data = chartData[type];
            return;
        }

        switch (type) {
            case 0:
                API_CLIENTS.getClientOrdersChart1YearPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;

            case 1:
                API_CLIENTS.getClientOrdersChart6MonthsPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
            case 2:
                API_CLIENTS.getClientOrdersChart1MonthPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
        }
    };

    function setChartData(type, data) {
        chartData[type] = utils.getColumnChartDataFromObject(data);
        vm.ordersChart.data = chartData[type];
        vm.chartType = type;
    }

});