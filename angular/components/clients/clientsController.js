'use strict';

/*
|--------------------------------------------------------------------------
| Clients Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('clientsController', function (API_CLIENTS, DTOptionsBuilder,
                                                                    DTColumnDefBuilder, ENV, urls) {

    var vm = this;
    vm.urls = urls;

    /* Datatable options
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
        DTColumnDefBuilder.newColumnDef(4).notSortable()
    ];

    // Fetch the table data (shop lists)
    API_CLIENTS.getClientsListPromise().then(function(response) {
        vm.clients = response.data;
    });

    /* Search
       ========================================================================== */
    vm.searchText = "";
    vm.searchTable = function ()
    {
        vm.dtInstance.DataTable.search(vm.searchText);
        vm.dtInstance.DataTable.search(vm.searchText).draw();
    };


    /* Functions
       ========================================================================== */
    vm.image = function(id) {
        return ENV.getClientImageUrlById(id);
    }
});