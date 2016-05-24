'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Sales Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopSalesController', function ($rootScope, API, DTOptionsBuilder,
                                                                      DTColumnDefBuilder) {

    var vm = this;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:shop-sales', function (event, data) {
        if(!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;

        // Get shop last orders
        API.getShopSalesPromise(vm.details._id.$oid).then(function(response) {
            vm.list = response.data;
        });

        vm.loaded = true;
    }

    /* Datatable
       ========================================================================== */
    vm.dtInstance = {};

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

    $rootScope.$on('tab:shop-sales:search', function (event, search) {
        vm.dtInstance.DataTable.search(search);
        vm.dtInstance.DataTable.search(search).draw();
    });
});