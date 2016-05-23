'use strict';

/*
 |--------------------------------------------------------------------------
 | Angular IntShop Admin module
 |--------------------------------------------------------------------------
 */
angular.module('intshop', ['restangular', 'datatables', 'googlechart', 'filters']);

/**
 * App constants
 */
angular.module('intshop').constant('CONSTANTS', (function () {
    var url = 'http://intshop-admin.dev:8080'; //http://test.intshop.com

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
 | Api Develop Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop').factory('DevelopRestangular', ["Restangular", function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://intshop-admin.dev:8080');
    });
}]);

angular.module('intshop').service('ApiDevelop', ["DevelopRestangular", function (DevelopRestangular) {
    return {
        getShopDetailsPromise: function(id) {
            return DevelopRestangular.one('api').one("shop-details.json").get();
        },
        getShopLastOrdersPromise: function(id, limit) {
            return DevelopRestangular.one('api').one("shop-last-orders.json").get();
        }
    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Filters
 |--------------------------------------------------------------------------
 */
angular.module('filters', [])

    .filter('money', ["CONSTANTS", function (CONSTANTS) {
        return function (number) {
            return CONSTANTS.CURRENCY + " " + parseFloat(number).toFixed(2);
        };
    }])

    .filter('fullDate', ["utils", function (utils) {
        return function (date) {
            return utils.getFullDate(date);
        };
    }])

    .filter('monthDate', ["utils", function (utils) {
        return function (date) {
            return utils.getMonthDate(date);
        };
    }])

    .filter('simpleDate', ["utils", function (utils) {
        return function (date) {
            var d = new Date(date);
            return utils.pad(d.getDate(), 2) + '/' + utils.pad(d.getMonth() + 1, 2) + '/' + d.getFullYear();
        };
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
        getMonthDate: function (param) {
            var fortnightAway = new Date(param),
                month = "January,February,March,April,May,June,July,August,September,October,November,December"
                    .split(",")[fortnightAway.getMonth()];


            return month + ", " + fortnightAway.getFullYear();
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
'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopDetailsController', ["$rootScope", "$scope", "$location", "utils", "Restangular", "CONSTANTS", "DTOptionsBuilder", "DTColumnBuilder", "DTColumnDefBuilder", "$timeout", "ApiDevelop", function ($rootScope, $scope, $location, utils, Restangular,
                                                                        CONSTANTS, DTOptionsBuilder,
                                                                        DTColumnBuilder, DTColumnDefBuilder, $timeout,
                                                                        ApiDevelop) {

    var vm = this;

    /* Shop Details
     ========================================================================== */
    vm.shopId = utils.getUrlParameter.id;
    vm.tabIndex = utils.getUrlParameter.tab;

    ApiDevelop.getShopDetailsPromise(vm.shopId).then(function(result) {
        vm.info = result;

        vm.setTab(0);
    });

    /* Tabs
     ========================================================================== */
    vm.tabs = [
        {name: "resume", active: true},
        {name: "sales", active: false},
        {name: "invoices", active: false}
    ];

    vm.setTab = function (index) {
        _(vm.tabs).forEach(function (tab) {
            tab.active = false;
        });

        vm.tabs[index].active = true;
        $rootScope.$broadcast('tab:shop-resume', vm.info);
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


}]);


'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopResumeController', ["$scope", "$rootScope", "$timeout", "utils", "CONSTANTS", "ApiDevelop", function ($scope, $rootScope,
                                                                       $timeout, utils, CONSTANTS,
                                                                       ApiDevelop) {

    var vm = this;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:shop-resume', function (event, data) {
        vm.loaded = true;
        vm.details = data;
        vm.regDate = utils.getFullDate(vm.details.regDate.$date);

        $timeout(function () {
            $("#rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);

        ApiDevelop.getShopLastOrdersPromise(vm.details._id.$oid, 5).then(function(result) {
            console.log(result);
            vm.lastOrders = result;
        });

    });


    // Chart
    $scope.salesChart = {};
    $scope.salesChart.type = "ColumnChart";

    // TODO: replace with data from json
    $scope.salesChart.data = {
        "cols": [
            {id: "t", label: "Month", type: "string"},
            {id: "s", label: "Sales", type: "number"}
        ], "rows": [
            {
                c: [
                    {v: "January"},
                    {v: 3}
                ]
            },
            {
                c: [
                    {v: "February"},
                    {v: 31}
                ]
            },
            {
                c: [
                    {v: "March"},
                    {v: 21}
                ]
            },
            {
                c: [
                    {v: "April"},
                    {v: 6},
                ]
            },
            {
                c: [
                    {v: "May"},
                    {v: 12},
                ]
            },
            {
                c: [
                    {v: "June"},
                    {v: 15},
                ]
            },
            {
                c: [
                    {v: "July"},
                    {v: 25},
                ]
            }, {
                c: [
                    {v: "August"},
                    {v: 32},
                ]
            },
            {
                c: [
                    {v: "September"},
                    {v: 63},
                ]
            },
            {
                c: [
                    {v: "October"},
                    {v: 33},
                ]
            },
            {
                c: [
                    {v: "November"},
                    {v: 7},
                ]
            },
            {
                c: [
                    {v: "December"},
                    {v: 22}
                ]
            }

        ]
    };
    $scope.salesChart.options = {
        legend: {position: 'none'},
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        colors: ['#3493d5']
    };


    /* Functions
     ========================================================================== */
    // Image
    vm.image = function (id) {
        return CONSTANTS.SHOP_IMAGES + id + ".jpg";
    };


    vm.hours = function (value) {
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