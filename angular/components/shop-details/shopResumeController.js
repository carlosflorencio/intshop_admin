'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Resume Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopResumeController', function ($scope, $rootScope,
                                                                       $timeout, utils, CONSTANTS, ENV, API_SHOPS) {

    var vm = this;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:shop-resume', function (event, data) {
        if(!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;
        vm.regDate = utils.getFullDate(vm.details.regDate.$date);

        // Activate jquery star rating plugin, ugly but ... :$
        $timeout(function () {
            $("#rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);

        // Get shop last orders
        API_SHOPS.getShopLastOrdersPromise(vm.details._id.$oid, 5).then(function(response) {
            vm.lastOrders = response.data;
        });

        // Get shop sales chart
        API_SHOPS.getShopSalesChartPromise(vm.details._id.$oid).then(function(response) {
            vm.salesChartData = response.data;
            vm.salesChart.data = utils.getColumnChartDataFromObject(vm.salesChartData);
        });

        vm.loaded = true;
    }

    // Chart
    vm.salesChart = {};
    vm.salesChart.type = "ColumnChart";

    vm.salesChart.options = {
        legend: {position: 'none'},
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        colors: ['#3493d5']
    };


    /* Functions
     ========================================================================== */
    // Image
    vm.image = function (id) {
        return ENV.getShopImageUrlById(id);
    };


    vm.hours = function (value) {
        return utils.pad(value, 2);
    }


});