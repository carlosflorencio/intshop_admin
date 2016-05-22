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
    var url = 'http://test.intshop.com';

    return {
        CURRENCY: '£',
        SHOP_IMAGES: url + '/images/retailer-profile/' // [shop Id].jpg
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
 | Utils Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop').service('utils', ["$window", function ($window) {
    return {
        getUrlParameter: function () {
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;
        }(),
        getFullDate: function (param) {
            var fortnightAway = new Date(param),
                date = fortnightAway.getDate(),
                month = "January,February,March,April,May,June,July,August,September,October,November,December"
                    .split(",")[fortnightAway.getMonth()];

            function nth(d) {
                if (d > 3 && d < 21) return 'th';
                switch (d % 10) {
                    case 1:
                        return "st";
                    case 2:
                        return "nd";
                    case 3:
                        return "rd";
                    default:
                        return "th";
                }
            }

            return date + nth(date) + " of "
                + month + ", " + fortnightAway.getFullYear();
        },
        pad: function (num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
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

    $scope.isActivePage = function(page) {

        // is array?
        if(page.constructor === Array) {
            return page.indexOf($scope.activePage) != -1;
        }

        return page === $scope.activePage;
    }



}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopDetailsController', ["$scope", "$location", "utils", "Restangular", "CONSTANTS", "DTOptionsBuilder", "DTColumnBuilder", "DTColumnDefBuilder", "$timeout", function ($scope, $location, utils, Restangular,
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

}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
//angular.module('intshop').controller('shopDetailsController', function ($scope, $location, utils, Restangular, CONSTANTS) {
//
//    /* Shop Details
//       ========================================================================== */
//    $scope.shopId = utils.getUrlParameter.id;
//
//    Restangular.one('Retailers').one("getRetailer").get({id: $scope.shopId}).then(function(result) {
//        $scope.info = result;
//        $scope.regDate = utils.getFullDate($scope.info.regDate.$date);
//    }, function() {
//        alert("Error getting the shop details..");
//    });
//
//    // Image
//    $scope.image = function(id) {
//        return CONSTANTS.SHOP_IMAGES + id + ".jpg";
//    };
//
//    /* Shop last 5 orders
//       ========================================================================== */
//    Restangular.one('Retailers').one("lastOrders").get({id: $scope.shopId, limit: 5}).then(function(result) {
//        $scope.lastOrders = result;
//
//        console.log(result.length);
//    }, function() {
//        alert("Error getting the shop last orders..");
//    });
//
//
//});
'use strict';

/*
|--------------------------------------------------------------------------
| Shops Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('shopsController', ["$scope", "$timeout", "Restangular", "DTOptionsBuilder", "DTColumnBuilder", "DTColumnDefBuilder", "CONSTANTS", function ($scope, $timeout, Restangular, DTOptionsBuilder,
                                                                  DTColumnBuilder, DTColumnDefBuilder, CONSTANTS) {

    var vm = this;

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
        return CONSTANTS.SHOP_IMAGES + id + ".jpg";
    }

}]);