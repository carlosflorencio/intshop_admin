'use strict';

/*
 |--------------------------------------------------------------------------
 | Angular IntShop Admin module
 |--------------------------------------------------------------------------
 */
angular.module('intshop', ['restangular', 'datatables']);

/**
 * App constants
 */
angular.module('intshop').constant('CONSTANTS', (function () {
    return {
        CURRENCY: '£'
    }
})());

/**
 * Configure Restangular
 */
angular.module('intshop').config(["RestangularProvider", function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://test.intshop.com');
}]);

/**
 * Init some things
 */
angular.module('intshop').run(["$rootScope", "store", function ($rootScope, store) {


}]);
'use strict';

/*
|--------------------------------------------------------------------------
| Local Storage Service
|--------------------------------------------------------------------------
*/
angular.module('intshop').service('store', ['$window', function ($window) {
    return {
        get: function (key) {
            if ( $window.localStorage.getItem(key) )  {
                var cart = angular.fromJson( $window.localStorage.getItem(key) ) ;
                return JSON.parse(cart);
            }
            return false;

        },


        set: function (key, val) {

            if (val === undefined) {
                $window.localStorage.removeItem(key);
            } else {
                $window.localStorage.setItem( key, angular.toJson(val) );
            }
            return $window.localStorage.getItem(key);
        }
    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Header Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('headerController', ["$scope", "$location", function ($scope, $location) {

    // Active page (if shops.jsp page then activePage = shops)
    $scope.activePage = function () {
        var url = $location.absUrl(),
            file = url.substring(url.lastIndexOf('/')+1);

        return file.substr(0, file.lastIndexOf('.'));
    }();



}]);
'use strict';

/*
|--------------------------------------------------------------------------
| Shops Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('shopsController', ["$scope", "$timeout", "Restangular", "DTOptionsBuilder", "DTColumnBuilder", "DTColumnDefBuilder", function ($scope, $timeout, Restangular, DTOptionsBuilder,
                                                                  DTColumnBuilder, DTColumnDefBuilder) {

    var vm = this;

    // Datatable options
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('numbers')
        .withOption('aaSorting', [])
        //.withDisplayLength(3)
        .withOption('sDom', 'rt<"dt-i-m"lip>')
        .withOption('drawCallback', function (settings) {
            if(settings.aoData.length > 0) {
                $timeout(function() {
                    compute();
                }, 0);
            }
        });

    // Columns sortable
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5).notSortable(),
        DTColumnDefBuilder.newColumnDef(6).notSortable()
    ];

    vm.dtInstance = {};

    // Fetch the table data (shop lists)
    Restangular.one('Retailers').getList('getRetailerList').then(function(result) {
        vm.shops = result;
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
    vm.selected = {};
    vm.selectAll = false;
    vm.toggleAll = toggleAll;
    vm.toggleOne = toggleOne;

    function toggleAll (selectAll, selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                selectedItems[id] = selectAll;
            }
        }
    }
    function toggleOne (selectedItems) {
        console.log(selectedItems);
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                if(!selectedItems[id]) {
                    vm.selectAll = false;
                    return;
                }
            }
        }
        vm.selectAll = true;
    }

    function compute() {
        // Get the current rows
        var displayedRows = vm.dtInstance.DataTable.rows({ page: 'current' });

        vm.selectAll = false;
        vm.selected = {};
        _(displayedRows[0]).forEach(function(index) {
            vm.selected[vm.shops[index]._id.$oid] = false;
        });
    }

}]);