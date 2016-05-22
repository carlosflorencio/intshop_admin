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

        $timeout(function() {
            $("#rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);
    }, function () {
        alert("Error getting the shop details..");
    });




    /* Tabs
     ========================================================================== */
    $scope.tabs = [
        {name: "resume", isLoaded: false, active: true},
        {name: "sales", isLoaded: false, active: false},
        {name: "invoices", isLoaded: false, active: false}
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
                    loadTabResume();
                    return;
                case 1:
                    loadTabSales();
                    return;
                case 2:
                    loadTabInvoices();
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
    function loadTabResume() {
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

    function loadTabSales() {
        var tab = $scope.tabs[1];
        tab.isLoaded = true;

        // Fetch the table data (shop lists)
        Restangular.one('Retailers').getList('getRetailerList').then(function (result) {
            vm.sales = result;
        });
    }


    /* Invoices tab
       ========================================================================== */
    // Datatable options
    vm.dtOptionsInvoices = DTOptionsBuilder.newOptions()
        .withPaginationType('numbers')
        .withOption('aaSorting', [])
        //.withDisplayLength(3)
        .withOption('sDom', 'rt<"dt-i-m"p>');

    vm.dtInstanceInvoices = {};

    $scope.invoicesTabs = [
        {name: "all", isLoaded: false, active: true},
        {name: "paid", isLoaded: false, active: false},
        {name: "due", isLoaded: false, active: false}
    ];

    function loadTabInvoices() {
        var tab = $scope.tabs[2];
        tab.isLoaded = true;

        $scope.setInvoicesTab(0);
    }

    // Store invoice data
    var invoicesData = [];

    $scope.setInvoicesTab = function (index) {
        _($scope.invoicesTabs).forEach(function (tab) {
            tab.active = false;
        });

        var tab = $scope.invoicesTabs[index];
        tab.active = true;

        if (!tab.isLoaded) {
            switch (index) {
                case 0:
                    loadInvoicesTabAll();
                    return;
                case 1:
                    loadInvoicesTabPaid();
                    return;
                case 2:
                    loadInvoicesTabDue();
                    return;
            }
        } else {
            vm.invoices = invoicesData[index];
        }
    };


    function loadInvoicesTabAll() {
        var tab = $scope.invoicesTabs[0];
        tab.isLoaded = true;

        // Fetch all invoices
        Restangular.one('Retailers').getList('getRetailerList').then(function (result) {
            invoicesData[0] = result;
            vm.invoices = result;
        });
    }

    function loadInvoicesTabPaid() {
        var tab = $scope.invoicesTabs[1];
        tab.isLoaded = true;

        // replace vm.invoices
    }

    function loadInvoicesTabDue() {
        var tab = $scope.invoicesTabs[2];
        tab.isLoaded = true;

        // replace vm.invoices
    }

    /* Shared
     ========================================================================== */
    // Image
    $scope.image = function (id) {
        return CONSTANTS.SHOP_IMAGES + id + ".jpg";
    };

    $scope.hours = function(value) {
        return utils.pad(value, 2);
    }

});