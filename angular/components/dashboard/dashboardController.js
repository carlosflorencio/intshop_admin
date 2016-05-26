'use strict';

/*
 |--------------------------------------------------------------------------
 | Dashboard Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('dashboardController', function (API_STATS, ENV, urls, utils) {

    var vm = this;
    vm.urls = urls;

    /* Dashboard Tabs
     ========================================================================== */
    vm.statsType = 0; // 0 = last 7 days, 1 = last month, 2 = all time

    // Store stats data
    var statsData = [];

    vm.setStatsType = function (type) {

        if (statsData[type]) { // Get cached results
            vm.statsType = type;
            vm.data = statsData[type];

            vm.shopsChart.data = statsData[type].shops.chart;
            vm.driversChart.data = statsData[type].drivers.chart;
            vm.pieChart.data = statsData[type].stats.chart;
            return;
        }

        switch (type) {
            case 0:
                API_STATS.getStatsLast7daysPromise().then(function (response) {
                    setStatsData(type, response.data);
                });
                vm.suffix = 'last week';
                break;

            case 1:
                API_STATS.getStatsLastMonthPromise().then(function (response) {
                    setStatsData(type, response.data);
                });
                vm.suffix = 'last month';
                break;
            case 2:
                API_STATS.getStatsAllTimePromise().then(function (response) {
                    setStatsData(type, response.data);
                });
                vm.suffix = 'all time';
                break;
        }
    };

    vm.setStatsType(0);

    function setStatsData(type, data) {
        statsData[type] = data;
        statsData[type].shops.chart = utils.getColumnChartDataFromObject(data.shops.chart);
        statsData[type].drivers.chart = utils.getColumnChartDataFromObject(data.drivers.chart);
        statsData[type].stats.chart = utils.getColumnChartDataFromObject(data.stats.chart);

        vm.data = data;
        vm.statsType = type;

        vm.shopsChart.data = statsData[type].shops.chart;
        vm.driversChart.data = statsData[type].drivers.chart;
        vm.pieChart.data = statsData[type].stats.chart;
    }

    /* Shop column chart
     ========================================================================== */
    vm.shopsChart = {};
    vm.shopsChart.type = "ColumnChart";

    vm.shopsChart.options = {
        legend: {position: 'none'},
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        colors: ['#3493d5']
    };

    /* Drivers column chart
     ========================================================================== */
    vm.driversChart = {};
    vm.driversChart.type = "ColumnChart";

    vm.driversChart.options = {
        legend: {position: 'none'},
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        colors: ['#3493d5']
    };

    /* Pie chart
     ========================================================================== */
    vm.pieChart = {};
    vm.pieChart.type = "PieChart";

    vm.pieChart.options = {
        legend: {
            position: 'none'
        },
        title: '',
        pieHole: 0.85,
        slices: {
            0: {
                color: '#263B50'
            },
            1: {
                color: '#3493D5'
            }
        }
    };



});