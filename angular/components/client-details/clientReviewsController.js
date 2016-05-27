'use strict';

/*
 |--------------------------------------------------------------------------
 | Client Reviews Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('clientReviewsController', function ($rootScope, API_CLIENTS, DTOptionsBuilder,
                                                                      DTColumnDefBuilder, urls) {

    var vm = this;
    vm.loaded = false;
    vm.urls = urls;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:client-reviews', function (event, data) {
        if(!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;

        // Get drivers deliverys list
        API_CLIENTS.getClientReviewsListPromise(vm.details._id.$oid).then(function(response) {
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
        .withOption('sDom', 'rt<"dt-i-m"lip>')
        .withOption('drawCallback', function (settings) {
            if(settings.aoData.length > 0) {
                $("#rating-stars,.rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
            }
        });;

    // Columns sortable
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1).notSortable(),
        DTColumnDefBuilder.newColumnDef(2).notSortable(),
        DTColumnDefBuilder.newColumnDef(3).notSortable(),
        DTColumnDefBuilder.newColumnDef(4).notSortable()
    ];

    $rootScope.$on('tab:client-reviews:search', function (event, search) {
        vm.dtInstance.DataTable.search(search);
        vm.dtInstance.DataTable.search(search).draw();
    });
});