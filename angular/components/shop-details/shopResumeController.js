'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopResumeController', function ($scope, $rootScope,
                                                                       $timeout, utils, CONSTANTS,
                                                                       ApiDevelop) {

    var vm = this;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:shop-resume', function (event, data) {
        vm.loaded = true;
        vm.details = data;
        vm.regDate = utils.getFullDate(vm.details.regDate.$date);

        $timeout(function () {
            $("#rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);

        ApiDevelop.getShopLastOrdersPromise(vm.details._id.$oid, 5).then(function(result) {
            console.log(result);
            vm.lastOrders = result;
        });

    });


    // Chart
    $scope.salesChart = {};
    $scope.salesChart.type = "ColumnChart";

    // TODO: replace with data from json
    $scope.salesChart.data = {
        "cols": [
            {id: "t", label: "Month", type: "string"},
            {id: "s", label: "Sales", type: "number"}
        ], "rows": [
            {
                c: [
                    {v: "January"},
                    {v: 3}
                ]
            },
            {
                c: [
                    {v: "February"},
                    {v: 31}
                ]
            },
            {
                c: [
                    {v: "March"},
                    {v: 21}
                ]
            },
            {
                c: [
                    {v: "April"},
                    {v: 6},
                ]
            },
            {
                c: [
                    {v: "May"},
                    {v: 12},
                ]
            },
            {
                c: [
                    {v: "June"},
                    {v: 15},
                ]
            },
            {
                c: [
                    {v: "July"},
                    {v: 25},
                ]
            }, {
                c: [
                    {v: "August"},
                    {v: 32},
                ]
            },
            {
                c: [
                    {v: "September"},
                    {v: 63},
                ]
            },
            {
                c: [
                    {v: "October"},
                    {v: 33},
                ]
            },
            {
                c: [
                    {v: "November"},
                    {v: 7},
                ]
            },
            {
                c: [
                    {v: "December"},
                    {v: 22}
                ]
            }

        ]
    };
    $scope.salesChart.options = {
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
        return CONSTANTS.SHOP_IMAGES + id + ".jpg";
    };


    vm.hours = function (value) {
        return utils.pad(value, 2);
    }


});