'use strict';

/*
 |--------------------------------------------------------------------------
 | Angular IntShop Admin module
 |--------------------------------------------------------------------------
 */
angular.module('intshop', [
    'restangular',
    'datatables',
    'googlechart',
    'intshop.filters',
    'intshop.env',
    'intshop.api'
]);

/**
 * App constants
 */
angular.module('intshop').constant('CONSTANTS', (function () {
    return {
        CURRENCY: '£'
    }
})());


/**
 * Init some things
 */
angular.module('intshop').run(["$rootScope", "store", function ($rootScope, store) {


}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Development Env (change the env in the gulpfile)
 |--------------------------------------------------------------------------
 */
angular.module('intshop.env', []).constant('ENV', (function () {
    var url = 'http://intshop-admin.dev:8080';

    return {
        // General
        type: 'development',
        url: url,

        // Images
        getShopImageUrlById: function(id) {
            return url + "/assets/images/tesco.jpg";
        },

        // API ENDPOINTS
        getShopDetailsUrl: url + '/api/shop/shop-details.json',
        getShopListUrl: url + '/api/shop/shop-list.json',
        getShopLastOrdersUrl: url + '/api/shop/resume/shop-last-orders.json',
        getShopSalesChartUrl: url + '/api/shop/resume/shop-sales-chart.json',
        getShopSuspendUrl: url + '/api/shop/shop-details.json',
        getShopRestoreUrl: url + '/api/shop/shop-details.json',
        getShopSalesUrl: url + '/api/shop/sales/shop-sales.json',
        getShopAllInvoicesUrl: url + '/api/shop/invoices/shop-invoices-all.json',
        getShopDueInvoicesUrl: url + '/api/shop/invoices/shop-invoices-due.json',
        getShopPaidInvoicesUrl: url + '/api/shop/invoices/shop-invoices-paid.json',
        getShopYearInvoiceChartUrl: url + '/api/shop/invoices/shop-chart-year.json',
        getShop6MonthsInvoiceChartUrl: url + '/api/shop/invoices/shop-chart-6m.json',
        getShop1MonthInvoiceChartUrl: url + '/api/shop/invoices/shop-chart-1m.json'
    }
})());

/*
|--------------------------------------------------------------------------
| Log $http requests
|--------------------------------------------------------------------------
*/
angular.module('intshop').config(["$provide", "$httpProvider", function($provide, $httpProvider) {
    $provide.factory('myHttpInterceptor', ["$q", function($q) {
        return {
            'request': function(config) {
                var params = config.params ? JSON.stringify(config.params) : 'no';
                console.log("REQUEST: " + config.url + " PARAMS: " + params);
                return config;
            }
        };
    }]);


    $httpProvider.interceptors.push('myHttpInterceptor');
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Header Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('headerController', ["$scope", "$location", "urls", function ($scope, $location, urls) {

    var vm = this;
    vm.urls = urls;

    // Active page (if shops.jsp page then activePage = shops)
    vm.activePage = function () {
        var url = $location.absUrl(),
            file = url.substring(url.lastIndexOf('/')+1);

        return file.substr(0, file.lastIndexOf('.'));
    }();

    vm.isActivePage = function(page) {

        // is array?
        if(page.constructor === Array) {
            return page.indexOf(vm.activePage) != -1;
        }

        return page === vm.activePage;
    }



}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopDetailsController', ["$rootScope", "utils", "$timeout", "API", "urls", function ($rootScope, utils,
                                                                        $timeout,
                                                                        API, urls) {

    var vm = this;

    /* Shop Details
     ========================================================================== */
    vm.shopId = utils.getUrlParameter.id;
    vm.tabIndex = utils.getUrlParameter.tab;
    vm.urls = urls;

    API.getShopDetailsPromise(vm.shopId).then(function (response) {
        vm.info = response.data;

        vm.setTab(0);
    });

    /* Tabs
     ========================================================================== */
    vm.tabs = [
        {name: "shop-resume", active: true},
        {name: "shop-sales", active: false},
        {name: "shop-invoices", active: false}
    ];

    vm.setTab = function (index) {
        _(vm.tabs).forEach(function (tab) {
            tab.active = false;
        });

        vm.tabs[index].active = true;
        vm.tab = vm.tabs[index];
        $rootScope.$broadcast('tab:' + vm.tabs[index].name, vm.info);
    };

    /* Suspend & Restore shop
     ========================================================================== */
    vm.suspend = function () {
        swal({
            title: "Are you sure?",
            text: "You are about to suspend the shop!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, suspend it!",
            closeOnConfirm: false
        }, function () {
            swal("Shop Suspended!", "", "success");

            API.getShopSuspendPromise(vm.shopId).then(function(response) {
                if(response.status == 200) {
                    vm.info.active = false;
                }
            });
        });
    };

    vm.restore = function() {
        swal("Shop restored!", "", "success");

        API.getShopRestorePromise(vm.shopId).then(function(response) {
            if(response.status == 200) {
                vm.info.active = true;
            }
        });
    };

    /* Search input
       ========================================================================== */
    vm.searchText = "";
    vm.searchTable = function ()
    {
        if(vm.tab.name == 'shop-sales') {
            $rootScope.$broadcast('tab:' + vm.tab.name + ":search", vm.searchText);
        }
    };

}]);


'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopInvoicesController', ["$scope", "$rootScope", "$timeout", "utils", "CONSTANTS", "ENV", "API", "DTOptionsBuilder", function ($scope, $rootScope,
                                                                         $timeout, utils, CONSTANTS, ENV, API,
                                                                         DTOptionsBuilder) {

    var vm = this;
    vm.test = 2;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:shop-invoices', function (event, data) {
        if (!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;

        // Get shop invoices chart
        vm.setChartType(0);

        // Get shop all invoices
        vm.setInvoiceType(0);

        vm.loaded = true;
    }

    /* Chart
     ========================================================================== */
    vm.invoicesChart = {};
    vm.invoicesChart.type = "ColumnChart";

    vm.invoicesChart.options = {
        legend: {position: 'none'},
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        colors: ['#3493d5']
    };

    vm.chartType = 0; // 0 = 1 year, 1 = 6 months, 2 = 1 month

    // Store invoice data
    var chartData = [];

    vm.setChartType = function (type) {

        if (chartData[type]) { // Get cached results
            vm.chartType = type;
            vm.invoicesChart.data = chartData[type];
            return;
        }

        switch (type) {
            case 0:
                API.getShopInvoicesChartYearPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;

            case 1:
                API.getShopInvoicesChart6MonthsPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
            case 2:
                API.getShopInvoicesChart1MonthPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
        }
    };

    function setChartData(type, data) {
        chartData[type] = utils.getColumnChartDataFromObject(data);
        vm.invoicesChart.data = chartData[type];
        vm.chartType = type;
    }

    /* Invoices tabs
     ========================================================================== */
    vm.invoicesType = 0; // 0 = all, 1 = due, 2 = paid

    // Store invoice data
    var invoicesData = [];

    vm.setInvoiceType = function (type) {

        if (invoicesData[type]) { // Get cached results
            vm.invoicesType = type;
            vm.invoices = invoicesData[type];
            return;
        }

        switch (type) {
            case 0:
                API.getShopAllInvoicesPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;

            case 1:
                API.getShopDueInvoicesPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;
            case 2:
                API.getShopPaidInvoicesPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;
        }
    };

    function setInvoiceData(type, data) {
        invoicesData[type] = data;
        vm.invoices = data;
        vm.invoicesType = type;
    }

    /* Datatable
     ========================================================================== */
    vm.dtInstance = {};

    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('numbers')
        .withOption('aaSorting', [])
        //.withDisplayLength(3)
        .withOption('sDom', 'rt<"dt-i-m"p>');

}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopResumeController', ["$scope", "$rootScope", "$timeout", "utils", "CONSTANTS", "ENV", "API", function ($scope, $rootScope,
                                                                       $timeout, utils, CONSTANTS, ENV, API) {

    var vm = this;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:shop-resume', function (event, data) {
        if(!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;
        vm.regDate = utils.getFullDate(vm.details.regDate.$date);

        // Activate jquery star rating plugin, ugly but ... :$
        $timeout(function () {
            $("#rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);

        // Get shop last orders
        API.getShopLastOrdersPromise(vm.details._id.$oid, 5).then(function(response) {
            vm.lastOrders = response.data;
        });

        // Get shop sales chart
        API.getShopSalesChartPromise(vm.details._id.$oid).then(function(response) {
            vm.salesChartData = response.data;
            vm.salesChart.data = utils.getColumnChartDataFromObject(vm.salesChartData);
        });

        vm.loaded = true;
    }

    // Chart
    vm.salesChart = {};
    vm.salesChart.type = "ColumnChart";

    vm.salesChart.options = {
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
        return ENV.getShopImageUrlById(id);
    };


    vm.hours = function (value) {
        return utils.pad(value, 2);
    }


}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Sales Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopSalesController', ["$rootScope", "API", "DTOptionsBuilder", "DTColumnDefBuilder", function ($rootScope, API, DTOptionsBuilder,
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
}]);
'use strict';

/*
|--------------------------------------------------------------------------
| Shops Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('shopsController', ["$scope", "$timeout", "API", "DTOptionsBuilder", "DTColumnBuilder", "DTColumnDefBuilder", "ENV", "urls", function ($scope, $timeout, API, DTOptionsBuilder,
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

}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api', []).service('API', ["ENV", "$http", function (ENV, $http) {
    return {

        /* Shop list
           ========================================================================== */
        getShopListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getShopListUrl
            });
        },

        /* Shop details
           ========================================================================== */
        getShopDetailsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getShopDetailsUrl,
                params: {id: id}
            });
        },

        getShopRestorePromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopRestoreUrl,
                params: {id: id}
            });
        },

        getShopSuspendPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopSuspendUrl,
                params: {id: id}
            });
        },

        /* Shop resume
           ========================================================================== */
        getShopLastOrdersPromise: function (id, limit) {
            return $http({
                method: "GET",
                url: ENV.getShopLastOrdersUrl,
                params: {id: id, limit: limit}
            });
        },

        getShopSalesChartPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getShopSalesChartUrl,
                params: {id: id}
            });
        },


        /* Shop sales
           ========================================================================== */
        getShopSalesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopSalesUrl,
                params: {id: id}
            });
        },

        /* Shop invoices
           ========================================================================== */
        getShopAllInvoicesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopAllInvoicesUrl,
                params: {id: id}
            });
        },

        getShopDueInvoicesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopDueInvoicesUrl,
                params: {id: id}
            });
        },

        getShopPaidInvoicesPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopPaidInvoicesUrl,
                params: {id: id}
            });
        },

        getShopInvoicesChartYearPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopYearInvoiceChartUrl,
                params: {id: id}
            });
        },

        getShopInvoicesChart6MonthsPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShop6MonthsInvoiceChartUrl,
                params: {id: id}
            });
        },

        getShopInvoicesChart1MonthPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShop1MonthInvoiceChartUrl,
                params: {id: id}
            });
        },
    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Filters
 |--------------------------------------------------------------------------
 */
angular.module('intshop.filters', [])

    .filter('money', ["CONSTANTS", function (CONSTANTS) {
        return function (number) {

            var n = parseFloat(number).toFixed(2);

            if(isNaN(n))
                n = 0;

            return CONSTANTS.CURRENCY + " " + n;
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
    }])

    .filter('capitalize', function () {
        return function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        };
    });

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
 | Urls Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop').service('urls', function () {
    return {
        linkToHome: function() {
          return 'index.jsp';
        },
        linkToDriversList: function() {
            return 'drivers.jsp'
        },
        linkToShopsList: function() {
            return 'shops.jsp'
        },
        linkToClientsList: function() {
            return 'clients.jsp'
        },
        linkToOrderInfo: function(id) {
            return 'orders-info.jsp?id=' + id;
        },
        linkToOrdersList: function() {
            return 'orders.jsp'
        },
        linkToShopItemsPage: function(id) {
            return 'http://test.intshop.com/shop-items.jsp';
        },
        linkToShopDetails: function(id) {
            return 'shop-details.jsp?id=' + id;
        }
    }
});
'use strict';

/*
 |--------------------------------------------------------------------------
 | Utils Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop').service('utils', ["$window", function ($window) {
    return {
        /**
         * Get url query string in object format
         */
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

        /**
         * Get full date string from iso string
         * @param param
         * @returns {string}
         */
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

        /**
         * Get month string date format from iso string
         * @param param
         * @returns {string}
         */
        getMonthDate: function (param) {
            var fortnightAway = new Date(param),
                month = "January,February,March,April,May,June,July,August,September,October,November,December"
                    .split(",")[fortnightAway.getMonth()];


            return month + ", " + fortnightAway.getFullYear();
        },

        /**
         * Pad number with zeros
         * @param num
         * @param size
         * @returns {string}
         */
        pad: function (num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        },

        /**
         * Convert object to column chart data, label1 and label2 properties are required
         * @param object
         * @returns {{cols: *[], rows: Array}}
         */
        getColumnChartDataFromObject: function (object) {
            var res = {
                "cols": [
                    {id: "t", label: object.label1, type: "string"},
                    {id: "s", label: object.label2, type: "number"}
                ],
                "rows": []
            };

            var rows = [];
            for (var k in object) {
                if (object.hasOwnProperty(k)) {
                    if (k == 'label1' || k == 'label2') continue;

                    rows.push({
                        c: [
                            {v: k},
                            {v: object[k]}
                        ]
                    });
                }
            }
            res.rows = rows;

            return res;
        }

    }
}]);