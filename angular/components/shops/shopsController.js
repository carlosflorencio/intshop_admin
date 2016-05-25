'use strict';

/*
|--------------------------------------------------------------------------
| Shops Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('shopsController', function ($scope, $timeout, API, DTOptionsBuilder,
                                                                  DTColumnBuilder, DTColumnDefBuilder, ENV, urls) {

    var vm = this;
    vm.urls = urls;

    // Datatable options
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('numbers')
        .withOption('aaSorting', [])
        //.withDisplayLength(3)
        .withOption('sDom', 'rt<"dt-i-m"lip>')
        .withOption('drawCallback', function (settings) {
            if(settings.aoData.length > 0) {
                // Move this code to a directive
                $("#rating-stars,.rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
                //$timeout(function() {
                //    compute();
                //}, 0);
            }
        });

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

    // Fetch the table data (shop lists)
    API.getShopListPromise().then(function(response) {
        vm.shops = response.data;
    });

    /* Search
       ========================================================================== */
    $scope.searchText = "";
    $scope.searchTable = function ()
    {
        vm.dtInstance.DataTable.search($scope.searchText);
        vm.dtInstance.DataTable.search($scope.searchText).draw();
    };

    /* Select rows
       ========================================================================== */
    //vm.selected = {};
    //vm.selectAll = false;
    //vm.toggleAll = toggleAll;
    //vm.toggleOne = toggleOne;
    //
    //function toggleAll (selectAll, selectedItems) {
    //    for (var id in selectedItems) {
    //        if (selectedItems.hasOwnProperty(id)) {
    //            selectedItems[id] = selectAll;
    //        }
    //    }
    //}
    //function toggleOne (selectedItems) {
    //    console.log(selectedItems);
    //    for (var id in selectedItems) {
    //        if (selectedItems.hasOwnProperty(id)) {
    //            if(!selectedItems[id]) {
    //                vm.selectAll = false;
    //                return;
    //            }
    //        }
    //    }
    //    vm.selectAll = true;
    //}

    //function compute() {
    //    // Get the current rows
    //    var displayedRows = vm.dtInstance.DataTable.rows({ page: 'current' });
    //
    //    vm.selectAll = false;
    //    vm.selected = {};
    //    _(displayedRows[0]).forEach(function(index) {
    //        vm.selected[vm.shops[index]._id.$oid] = false;
    //    });
    //}

    // Image
    $scope.image = function(id) {
        return ENV.getShopImageUrlById(id);
    }

});