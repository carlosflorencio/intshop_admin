'use strict';

/*
 |--------------------------------------------------------------------------
 | Driver Deliverys Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('driverDeliverysController', function ($rootScope, API_DRIVERS, DTOptionsBuilder,
                                                                      DTColumnDefBuilder, urls) {

    var vm = this;
    vm.loaded = false;
    vm.urls = urls;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:driver-deliverys', function (event, data) {
        if(!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;

        // Get drivers deliverys list
        API_DRIVERS.getDriverDeliverysListPromise(vm.details._id.$oid).then(function(response) {
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

    $rootScope.$on('tab:driver-deliverys:search', function (event, search) {
        vm.dtInstance.DataTable.search(search);
        vm.dtInstance.DataTable.search(search).draw();
    });
});