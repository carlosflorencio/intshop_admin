'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopDetailsController', function ($rootScope, $scope, $location, utils, Restangular,
                                                                        CONSTANTS, DTOptionsBuilder,
                                                                        DTColumnBuilder, DTColumnDefBuilder, $timeout,
                                                                        API, urls) {

    var vm = this;

    /* Shop Details
     ========================================================================== */
    vm.shopId = utils.getUrlParameter.id;
    vm.tabIndex = utils.getUrlParameter.tab;
    vm.urls = urls;

    API.getShopDetailsPromise(vm.shopId).then(function(response) {
        vm.info = response.data;

        vm.setTab(0);
    });

    /* Tabs
     ========================================================================== */
    vm.tabs = [
        {name: "shop-resume", active: true},
        {name: "shop-sales", active: false},
        {name: "shop-invoices", active: false}
    ];

    vm.setTab = function (index) {
        _(vm.tabs).forEach(function (tab) {
            tab.active = false;
        });

        vm.tabs[index].active = true;
        $rootScope.$broadcast('tab:' + vm.tabs[index].name, vm.info);
    };


    // TODO: each tab it its controller, send events to change tabs and load data
    //if(vm.tabIndex) {
    //    switch (vm.tabIndex) {
    //        case "sales":
    //            vm.setTab(1);
    //            break;
    //        case "invoices":
    //            vm.setTab(2);
    //            break;
    //        default:
    //            vm.setTab(0);
    //    }
    //} else {
    //    vm.setTab(0);
    //}


    ///* Resume tab
    // ========================================================================== */
    //function loadTabResume() {
    //    var tab = vm.tabs[0];
    //    tab.isLoaded = true;
    //
    //    Restangular.one('Retailers').one("lastOrders").get({id: vm.shopId, limit: 5}).then(function (result) {
    //        vm.lastOrders = result;
    //
    //        console.log(result.length);
    //    }, function () {
    //        alert("Error getting the shop last orders..");
    //    });
    //}
    //
    //
    ///* Sales tab
    //========================================================================== */
    //
    //// Datatable options
    //vm.dtOptions = DTOptionsBuilder.newOptions()
    //    .withPaginationType('numbers')
    //    .withOption('aaSorting', [])
    //    //.withDisplayLength(3)
    //    .withOption('sDom', 'rt<"dt-i-m"lip>');
    //
    //// Columns sortable
    //vm.dtColumnDefs = [
    //    DTColumnDefBuilder.newColumnDef(0).notSortable(),
    //    DTColumnDefBuilder.newColumnDef(1),
    //    DTColumnDefBuilder.newColumnDef(2),
    //    DTColumnDefBuilder.newColumnDef(3),
    //    DTColumnDefBuilder.newColumnDef(4),
    //    DTColumnDefBuilder.newColumnDef(5),
    //    DTColumnDefBuilder.newColumnDef(6).notSortable()
    //];
    //
    //vm.dtInstance = {};
    //
    //vm.searchText = "";
    //vm.searchTable = function ()
    //{
    //    vm.dtInstance.DataTable.search(vm.searchText);
    //    vm.dtInstance.DataTable.search(vm.searchText).draw();
    //};
    //
    //function loadTabSales() {
    //    var tab = vm.tabs[1];
    //    tab.isLoaded = true;
    //
    //    // Fetch the table data (shop lists)
    //    Restangular.one('Retailers').getList('getRetailerList').then(function (result) {
    //        vm.sales = result;
    //    });
    //}
    //
    //
    ///* Invoices tab
    //   ========================================================================== */
    //// Datatable options
    //vm.dtOptionsInvoices = DTOptionsBuilder.newOptions()
    //    .withPaginationType('numbers')
    //    .withOption('aaSorting', [])
    //    //.withDisplayLength(3)
    //    .withOption('sDom', 'rt<"dt-i-m"p>');
    //
    //vm.dtInstanceInvoices = {};
    //
    //vm.invoicesTabs = [
    //    {name: "all", isLoaded: false, active: true},
    //    {name: "paid", isLoaded: false, active: false},
    //    {name: "due", isLoaded: false, active: false}
    //];
    //
    //function loadTabInvoices() {
    //    var tab = vm.tabs[2];
    //    tab.isLoaded = true;
    //
    //    vm.setInvoicesTab(0);
    //}
    //
    //// Store invoice data
    //var invoicesData = [];
    //
    //vm.setInvoicesTab = function (index) {
    //    _(vm.invoicesTabs).forEach(function (tab) {
    //        tab.active = false;
    //    });
    //
    //    var tab = vm.invoicesTabs[index];
    //    tab.active = true;
    //
    //    if (!tab.isLoaded) {
    //        switch (index) {
    //            case 0:
    //                loadInvoicesTabAll();
    //                return;
    //            case 1:
    //                loadInvoicesTabPaid();
    //                return;
    //            case 2:
    //                loadInvoicesTabDue();
    //                return;
    //        }
    //    } else {
    //        vm.invoices = invoicesData[index];
    //    }
    //};
    //
    //
    //function loadInvoicesTabAll() {
    //    var tab = vm.invoicesTabs[0];
    //    tab.isLoaded = true;
    //
    //    // Fetch all invoices
    //    Restangular.one('Retailers').getList('getRetailerList').then(function (result) {
    //        invoicesData[0] = result;
    //        vm.invoices = result;
    //    });
    //}
    //
    //function loadInvoicesTabPaid() {
    //    var tab = vm.invoicesTabs[1];
    //    tab.isLoaded = true;
    //
    //    // replace vm.invoices
    //}
    //
    //function loadInvoicesTabDue() {
    //    var tab = vm.invoicesTabs[2];
    //    tab.isLoaded = true;
    //
    //    // replace vm.invoices
    //}
    //
    ///* Shared
    // ========================================================================== */


});

