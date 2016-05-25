'use strict';

/*
|--------------------------------------------------------------------------
| Orders Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('ordersController', function (API_ORDERS, DTOptionsBuilder,
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
        .withOption('sDom', 'rt<"dt-i-m"lip>')
        .withOption('drawCallback', function (settings) {
            if(settings.aoData.length > 0) {
                $("#rating-stars, .rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
            }
        });

    // Columns sortable
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6),
        DTColumnDefBuilder.newColumnDef(7).notSortable()
    ];

    // Fetch the table data (shop lists)
    API_ORDERS.getOrdersListPromise().then(function(response) {
        vm.orders = response.data;
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

});