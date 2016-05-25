'use strict';

/*
|--------------------------------------------------------------------------
| Shops Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('driversController', function (API_DRIVERS, DTOptionsBuilder,
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
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2).notSortable(),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5).notSortable(),
        DTColumnDefBuilder.newColumnDef(6).notSortable()
    ];

    // Fetch the table data (shop lists)
    API_DRIVERS.getDriversListPromise().then(function(response) {
        vm.drivers = response.data;
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
        return ENV.getDriverImageUrlById(id);
    };

    vm.carImage = function(type) {
        switch (type) {
            case 'bike':
                return ENV.getDriverVehicleImageUrlByType('bike');
            case 'small_car':
                return ENV.getDriverVehicleImageUrlByType('small-car');
            default:
                return ENV.getDriverVehicleImageUrlByType('car');
        }
    };

    vm.carImageSize = function(type) {
        switch (type) {
            case 'bike':
                return 20;
            case 'small_car':
                return 35;
            default:
                return 45;
        }
    };

    vm.carName = function(type) {
        switch (type) {
            case 'bike':
                return 'Bike';
            case 'small_car':
                return 'Small Car';
            default:
                return 'Car';
        }
    }

});