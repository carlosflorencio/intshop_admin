'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopDetailsController', function ($scope, $location, utils, Restangular,
                                                                        CONSTANTS, DTOptionsBuilder,
                                                                        DTColumnBuilder, DTColumnDefBuilder, $timeout) {

    /* Shop Details
     ========================================================================== */
    $scope.shopId = utils.getUrlParameter.id;
    $scope.tabIndex = utils.getUrlParameter.tab;

    Restangular.one('Retailers').one("getRetailer").get({id: $scope.shopId}).then(function (result) {
        $scope.info = result;
        $scope.regDate = utils.getFullDate($scope.info.regDate.$date);
    }, function () {
        alert("Error getting the shop details..");
    });


    /* Tabs
     ========================================================================== */
    $scope.tabs = [
        {name: "resume", content: null, isLoaded: false, active: true},
        {name: "sales", content: null, isLoaded: false, active: false},
        {name: "invoices", content: null, isLoaded: false, active: false}
    ];

    $scope.setTab = function (index) {
        _($scope.tabs).forEach(function (tab) {
            tab.active = false;
        });

        var tab = $scope.tabs[index];
        tab.active = true;

        if (!tab.isLoaded) {
            switch (index) {
                case 0:
                    loadTab0();
                    return;
                case 1:
                    loadTab1();
                    return;
                case 2:
                    loadTab2();
                    return;
            }
        }
    };

    if($scope.tabIndex) {
        switch ($scope.tabIndex) {
            case "sales":
                $scope.setTab(1);
                break;
            case "invoices":
                $scope.setTab(2);
                break;
            default:
                $scope.setTab(0);
        }
    } else {
        $scope.setTab(0);
    }


    /* Resume tab
     ========================================================================== */
    function loadTab0() {
        var tab = $scope.tabs[0];
        tab.isLoaded = true;

        Restangular.one('Retailers').one("lastOrders").get({id: $scope.shopId, limit: 5}).then(function (result) {
            $scope.lastOrders = result;

            console.log(result.length);
        }, function () {
            alert("Error getting the shop last orders..");
        });
    }


    /* Sales tab
    ========================================================================== */
    var vm = this;
    // Datatable options
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('numbers')
        .withOption('aaSorting', [])
        //.withDisplayLength(3)
        .withOption('sDom', 'rt<"dt-i-m"lip>');

    // Columns sortable
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6).notSortable()
    ];

    vm.dtInstance = {};

    $scope.searchText = "";
    $scope.searchTable = function ()
    {
        vm.dtInstance.DataTable.search($scope.searchText);
        vm.dtInstance.DataTable.search($scope.searchText).draw();
    };

    function loadTab1() {
        var tab = $scope.tabs[1];
        tab.isLoaded = true;

        // Fetch the table data (shop lists)
        Restangular.one('Retailers').getList('getRetailerList').then(function (result) {
            vm.sales = result;
        });
    }


    /* Invoices tab
       ========================================================================== */
    function loadTab2() {
        var tab = $scope.tabs[2];
        tab.isLoaded = true;
    }

    /* Shared
     ========================================================================== */
    // Image
    $scope.image = function (id) {
        return CONSTANTS.SHOP_IMAGES + id + ".jpg";
    };

});