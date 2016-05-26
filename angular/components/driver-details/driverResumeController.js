'use strict';

/*
 |--------------------------------------------------------------------------
 | Driver Resume Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('driverResumeController', function ($scope, $rootScope,
                                                                       $timeout, utils, CONSTANTS, ENV, API_DRIVERS) {

    var vm = this;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:driver-resume', function (event, data) {
        if(!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;

        // Activate jquery star rating plugin, ugly but ... :$
        $timeout(function () {
            $("#rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);

        // Get driver last invoices
        API_DRIVERS.getDriverLastInvoicesPromise(vm.details._id.$oid, 5).then(function(response) {
            vm.invoices = response.data;
        });

        // Load 1 year deliverys chart
        vm.setChartType(0);

        vm.loaded = true;
    }


    /* Functions
     ========================================================================== */
    // Image
    vm.image = function (id) {
        return ENV.getDriverImageUrlById(id);
    };

    vm.carImage = function(type) {
        switch (type) {
            case 'bike':
                return ENV.getDriverVehicleImageUrlByType('bike');
            case 'small_car':
                return ENV.getDriverVehicleImageUrlByType('small-car');
            default:
                return ENV.getDriverVehicleImageUrlByType('car');
        }
    };

    vm.carImageSize = function(type) {
        switch (type) {
            case 'bike':
                return 20;
            case 'small_car':
                return 35;
            default:
                return 45;
        }
    };

    vm.carName = function(type) {
        switch (type) {
            case 'bike':
                return 'Bike';
            case 'small_car':
                return 'Small Car';
            default:
                return 'Car';
        }
    };

    /* Chart
     ========================================================================== */
    vm.deliverysChart = {};
    vm.deliverysChart.type = "ColumnChart";

    vm.deliverysChart.options = {
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
            vm.deliverysChart.data = chartData[type];
            return;
        }

        switch (type) {
            case 0:
                API_DRIVERS.getDriverDeliverysChart1YearPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;

            case 1:
                API_DRIVERS.getDriverDeliverysChart6MonthsPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
            case 2:
                API_DRIVERS.getDriverDeliverysChart1MonthPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
        }
    };

    function setChartData(type, data) {
        chartData[type] = utils.getColumnChartDataFromObject(data);
        vm.deliverysChart.data = chartData[type];
        vm.chartType = type;
    }


});