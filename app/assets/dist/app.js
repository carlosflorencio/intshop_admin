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
    'intshop.api.shops',
    'intshop.api.drivers',
    'intshop.api.orders',
    'intshop.api.clients',
    'intshop.api.stats'
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
        getShopImageUrlById: function (id) {
            return url + "/assets/images/tesco.jpg";
        },
        getDriverImageUrlById: function (id) {
            return url + "/assets/images/user-image.jpg";
        },
        getDriverVehicleImageUrlByType: function (type) {
            return url + "/assets/images/" + type + ".png";
        },
        getClientImageUrlById: function (id) {
            return url + "/assets/images/user-image.jpg";
        },

        // API ENDPOINTS

        // Shops
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
        getShop1MonthInvoiceChartUrl: url + '/api/shop/invoices/shop-chart-1m.json',
        getShopInvoiceSendAlertUrl: url + '/api/shop/invoices/shop-chart-1m.json',

        // Drivers
        getDriversListUrl: url + '/api/drivers/drivers-list.json',
        getDriverDetailsUrl: url + '/api/drivers/driver-details.json',
        getDriverSuspendUrl: url + '/api/drivers/driver-details.json',
        getDriverRestoreUrl: url + '/api/drivers/driver-details.json',
        getDriverDeliveryChart1YearUrl: url + '/api/drivers/resume/driver-chart-year.json',
        getDriverDeliveryChart6MonthsUrl: url + '/api/drivers/resume/driver-chart-6m.json',
        getDriverDeliveryChart1MonthUrl: url + '/api/drivers/resume/driver-chart-1m.json',
        getDriverLastInvoicesUrl: url + '/api/drivers/resume/driver-last-invoices.json',
        getDriverDeliverysListUrl: url + '/api/drivers/deliverys/driver-deliverys.json',
        getDriverInvoicesChart1MonthUrl: url + '/api/drivers/invoices/driver-chart-1m.json',
        getDriverInvoicesChart6MonthsUrl: url + '/api/drivers/invoices/driver-chart-6m.json',
        getDriverInvoicesChart1YearUrl: url + '/api/drivers/invoices/driver-chart-year.json',
        getDriverInvoicesListAllUrl: url + '/api/drivers/invoices/driver-invoices-all.json',
        getDriverInvoicesListDueUrl: url + '/api/drivers/invoices/driver-invoices-due.json',
        getDriverInvoicesListPaidUrl: url + '/api/drivers/invoices/driver-invoices-paid.json',
        getDriverInvoicesSendAlertUrl: url + '/api/drivers/invoices/driver-invoices-paid.json',

        // Orders
        getOrdersListUrl: url + '/api/orders/orders-list.json',

        // Clients
        getClientsListUrl: url + '/api/clients/clients-list.json',

        // Stats
        getStatsLast7days: url + '/api/stats/stats-7days.json',
        getStatsLastMonth: url + '/api/stats/stats-last-month.json',
        getStatsAllTime: url + '/api/stats/stats-all-time.json'
    }
})());

/*
 |--------------------------------------------------------------------------
 | Log $http requests
 |--------------------------------------------------------------------------
 */
angular.module('intshop').config(["$provide", "$httpProvider", function ($provide, $httpProvider) {
    $provide.factory('myHttpInterceptor', ["$q", function ($q) {
        return {
            'request': function (config) {
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
| Clients Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('clientsController', ["API_CLIENTS", "DTOptionsBuilder", "DTColumnDefBuilder", "ENV", "urls", function (API_CLIENTS, DTOptionsBuilder,
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
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Dashboard Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('dashboardController', ["API_STATS", "ENV", "urls", "utils", function (API_STATS, ENV, urls, utils) {

    var vm = this;
    vm.urls = urls;

    /* Dashboard Tabs
     ========================================================================== */
    vm.statsType = 0; // 0 = last 7 days, 1 = last month, 2 = all time

    // Store stats data
    var statsData = [];

    vm.setStatsType = function (type) {

        if (statsData[type]) { // Get cached results
            vm.statsType = type;
            vm.data = statsData[type];

            vm.shopsChart.data = statsData[type].shops.chart;
            vm.driversChart.data = statsData[type].drivers.chart;
            vm.pieChart.data = statsData[type].stats.chart;
            return;
        }

        switch (type) {
            case 0:
                API_STATS.getStatsLast7daysPromise().then(function (response) {
                    setStatsData(type, response.data);
                });
                vm.suffix = 'last week';
                break;

            case 1:
                API_STATS.getStatsLastMonthPromise().then(function (response) {
                    setStatsData(type, response.data);
                });
                vm.suffix = 'last month';
                break;
            case 2:
                API_STATS.getStatsAllTimePromise().then(function (response) {
                    setStatsData(type, response.data);
                });
                vm.suffix = 'all time';
                break;
        }
    };

    vm.setStatsType(0);

    function setStatsData(type, data) {
        statsData[type] = data;
        statsData[type].shops.chart = utils.getColumnChartDataFromObject(data.shops.chart);
        statsData[type].drivers.chart = utils.getColumnChartDataFromObject(data.drivers.chart);
        statsData[type].stats.chart = utils.getColumnChartDataFromObject(data.stats.chart);

        vm.data = data;
        vm.statsType = type;

        vm.shopsChart.data = statsData[type].shops.chart;
        vm.driversChart.data = statsData[type].drivers.chart;
        vm.pieChart.data = statsData[type].stats.chart;
    }

    /* Shop column chart
     ========================================================================== */
    vm.shopsChart = {};
    vm.shopsChart.type = "ColumnChart";

    vm.shopsChart.options = {
        legend: {position: 'none'},
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        colors: ['#3493d5']
    };

    /* Drivers column chart
     ========================================================================== */
    vm.driversChart = {};
    vm.driversChart.type = "ColumnChart";

    vm.driversChart.options = {
        legend: {position: 'none'},
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        colors: ['#3493d5']
    };

    /* Pie chart
     ========================================================================== */
    vm.pieChart = {};
    vm.pieChart.type = "PieChart";

    vm.pieChart.options = {
        legend: {
            position: 'none'
        },
        title: '',
        pieHole: 0.85,
        slices: {
            0: {
                color: '#263B50'
            },
            1: {
                color: '#3493D5'
            }
        }
    };



}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Driver Deliverys Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('driverDeliverysController', ["$rootScope", "API_DRIVERS", "DTOptionsBuilder", "DTColumnDefBuilder", "urls", function ($rootScope, API_DRIVERS, DTOptionsBuilder,
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
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Driver Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('driverDetailsController', ["$rootScope", "utils", "$timeout", "API_DRIVERS", "urls", function ($rootScope, utils,
                                                                        $timeout,
                                                                        API_DRIVERS, urls) {

    var vm = this;

    /* Driver Details
     ========================================================================== */
    vm.driverId = utils.getUrlParameter.id;
    vm.tabIndex = utils.getUrlParameter.tab;
    vm.urls = urls;

    API_DRIVERS.getDriverDetailsPromise(vm.driverId).then(function (response) {
        vm.info = response.data;

        vm.setTab(0);
    });

    /* Tabs
     ========================================================================== */
    vm.tabs = [
        {name: "driver-resume", active: true},
        {name: "driver-deliverys", active: false},
        {name: "driver-invoices", active: false}
    ];

    vm.setTab = function (index) {
        _(vm.tabs).forEach(function (tab) {
            tab.active = false;
        });

        vm.tabs[index].active = true;
        vm.tab = vm.tabs[index];
        $rootScope.$broadcast('tab:' + vm.tabs[index].name, vm.info);
    };

    /* Suspend & Restore driver
     ========================================================================== */
    vm.suspend = function () {
        swal({
            title: "Are you sure?",
            text: "You are about to suspend the driver!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, suspend it!",
            closeOnConfirm: false
        }, function () {
            swal("Driver Suspended!", "", "success");

            API_DRIVERS.getDriverSuspendPromise(vm.driverId).then(function(response) {
                if(response.status == 200) {
                    vm.info.active = false;
                }
            });
        });
    };

    vm.restore = function() {
        swal("Driver restored!", "", "success");

        API_DRIVERS.getDriverRestorePromise(vm.driverId).then(function(response) {
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
        if(vm.tab.name == 'driver-deliverys') {
            $rootScope.$broadcast('tab:' + vm.tab.name + ":search", vm.searchText);
        }
    };

}]);


'use strict';

/*
 |--------------------------------------------------------------------------
 | Driver Invoices Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('driverInvoicesController', ["$scope", "$rootScope", "$timeout", "utils", "CONSTANTS", "ENV", "API_DRIVERS", "DTOptionsBuilder", function ($scope, $rootScope,
                                                                         $timeout, utils, CONSTANTS, ENV, API_DRIVERS,
                                                                         DTOptionsBuilder) {

    var vm = this;
    vm.test = 2;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:driver-invoices', function (event, data) {
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
                API_DRIVERS.getDriverInvoicesChart1YearPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;

            case 1:
                API_DRIVERS.getDriverInvoicesChart6MonthsPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
            case 2:
                API_DRIVERS.getDriverInvoicesChart1MonthPromise(vm.details._id.$oid).then(function (response) {
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
                API_DRIVERS.getDriverInvoicesListAllPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;

            case 1:
                API_DRIVERS.getDriverInvoicesListPaidPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;
            case 2:
                API_DRIVERS.getDriverInvoicesListDuePromise(vm.details._id.$oid).then(function (response) {
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

    /* Send alert
       ========================================================================== */
    vm.sendAlert = function() {
        API_DRIVERS.getDriverInvoicesSendAlertPromise(vm.details._id.$oid).then(function(response) {
            console.log(response.status);
        });
    }

}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Driver Resume Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('driverResumeController', ["$scope", "$rootScope", "$timeout", "utils", "CONSTANTS", "ENV", "API_DRIVERS", function ($scope, $rootScope,
                                                                       $timeout, utils, CONSTANTS, ENV, API_DRIVERS) {

    var vm = this;
    vm.loaded = false;

    /* When tab is selected
     ========================================================================== */
    $rootScope.$on('tab:driver-resume', function (event, data) {
        if(!vm.loaded)
            loadData(data);
    });

    function loadData(data) {
        vm.details = data;

        // Activate jquery star rating plugin, ugly but ... :$
        $timeout(function () {
            $("#rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);

        // Get driver last invoices
        API_DRIVERS.getDriverLastInvoicesPromise(vm.details._id.$oid, 5).then(function(response) {
            vm.invoices = response.data;
        });

        // Load 1 year deliverys chart
        vm.setChartType(0);

        vm.loaded = true;
    }


    /* Functions
     ========================================================================== */
    // Image
    vm.image = function (id) {
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
    };

    /* Chart
     ========================================================================== */
    vm.deliverysChart = {};
    vm.deliverysChart.type = "ColumnChart";

    vm.deliverysChart.options = {
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
            vm.deliverysChart.data = chartData[type];
            return;
        }

        switch (type) {
            case 0:
                API_DRIVERS.getDriverDeliverysChart1YearPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;

            case 1:
                API_DRIVERS.getDriverDeliverysChart6MonthsPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
            case 2:
                API_DRIVERS.getDriverDeliverysChart1MonthPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
        }
    };

    function setChartData(type, data) {
        chartData[type] = utils.getColumnChartDataFromObject(data);
        vm.deliverysChart.data = chartData[type];
        vm.chartType = type;
    }


}]);
'use strict';

/*
|--------------------------------------------------------------------------
| Drivers Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('driversController', ["API_DRIVERS", "DTOptionsBuilder", "DTColumnDefBuilder", "ENV", "urls", function (API_DRIVERS, DTOptionsBuilder,
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
| Orders Controller
|--------------------------------------------------------------------------
*/
angular.module('intshop').controller('ordersController', ["API_ORDERS", "DTOptionsBuilder", "DTColumnDefBuilder", "ENV", "urls", function (API_ORDERS, DTOptionsBuilder,
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
        .withOption('sDom', 'rt<"dt-i-m"lip>');;

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

}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopDetailsController', ["$rootScope", "utils", "$timeout", "API_SHOPS", "urls", function ($rootScope, utils,
                                                                        $timeout,
                                                                        API_SHOPS, urls) {

    var vm = this;

    /* Shop Details
     ========================================================================== */
    vm.shopId = utils.getUrlParameter.id;
    vm.tabIndex = utils.getUrlParameter.tab;
    vm.urls = urls;

    API_SHOPS.getShopDetailsPromise(vm.shopId).then(function (response) {
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

            API_SHOPS.getShopSuspendPromise(vm.shopId).then(function(response) {
                if(response.status == 200) {
                    vm.info.active = false;
                }
            });
        });
    };

    vm.restore = function() {
        swal("Shop restored!", "", "success");

        API_SHOPS.getShopRestorePromise(vm.shopId).then(function(response) {
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
 | Shop Invoices Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopInvoicesController', ["$scope", "$rootScope", "$timeout", "utils", "CONSTANTS", "ENV", "API_SHOPS", "DTOptionsBuilder", function ($scope, $rootScope,
                                                                         $timeout, utils, CONSTANTS, ENV, API_SHOPS,
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
                API_SHOPS.getShopInvoicesChartYearPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;

            case 1:
                API_SHOPS.getShopInvoicesChart6MonthsPromise(vm.details._id.$oid).then(function (response) {
                    setChartData(type, response.data);
                });
                break;
            case 2:
                API_SHOPS.getShopInvoicesChart1MonthPromise(vm.details._id.$oid).then(function (response) {
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
                API_SHOPS.getShopAllInvoicesPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;

            case 1:
                API_SHOPS.getShopDueInvoicesPromise(vm.details._id.$oid).then(function (response) {
                    setInvoiceData(type, response.data);
                });
                break;
            case 2:
                API_SHOPS.getShopPaidInvoicesPromise(vm.details._id.$oid).then(function (response) {
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


    /* Send alert
     ========================================================================== */
    vm.sendAlert = function() {
        API_SHOPS.getShopInvoiceSendAlertPromise(vm.details._id.$oid).then(function(response) {
            console.log(response.status);
        });
    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Resume Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopResumeController', ["$scope", "$rootScope", "$timeout", "utils", "CONSTANTS", "ENV", "API_SHOPS", function ($scope, $rootScope,
                                                                       $timeout, utils, CONSTANTS, ENV, API_SHOPS) {

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
        API_SHOPS.getShopLastOrdersPromise(vm.details._id.$oid, 5).then(function(response) {
            vm.lastOrders = response.data;
        });

        // Get shop sales chart
        API_SHOPS.getShopSalesChartPromise(vm.details._id.$oid).then(function(response) {
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
angular.module('intshop').controller('shopSalesController', ["$rootScope", "API_SHOPS", "DTOptionsBuilder", "DTColumnDefBuilder", function ($rootScope, API_SHOPS, DTOptionsBuilder,
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
        API_SHOPS.getShopSalesPromise(vm.details._id.$oid).then(function(response) {
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
angular.module('intshop').controller('shopsController', ["$scope", "$timeout", "API_SHOPS", "DTOptionsBuilder", "DTColumnBuilder", "DTColumnDefBuilder", "ENV", "urls", function ($scope, $timeout, API_SHOPS, DTOptionsBuilder,
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
        DTColumnDefBuilder.newColumnDef(5).notSortable(),
        DTColumnDefBuilder.newColumnDef(6).notSortable()
    ];

    vm.dtInstance = {};

    // Fetch the table data (shop lists)
    API_SHOPS.getShopListPromise().then(function(response) {
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
angular.module('intshop.api.clients', []).service('API_CLIENTS', ["ENV", "$http", function (ENV, $http) {
    return {

        /* Clients list
           ========================================================================== */
        getClientsListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getClientsListUrl
            });
        }

    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.drivers', []).service('API_DRIVERS', ["ENV", "$http", function (ENV, $http) {
    return {

        /* Drivers list
         ========================================================================== */
        getDriversListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getDriversListUrl
            });
        },

        /* Driver details
         ========================================================================== */
        getDriverDetailsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDetailsUrl,
                params: {id: id}
            });
        },

        getDriverRestorePromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getDriverRestoreUrl,
                params: {id: id}
            });
        },

        getDriverSuspendPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getDriverSuspendUrl,
                params: {id: id}
            });
        },

        /* Resume tab
         ========================================================================== */
        getDriverDeliverysChart1YearPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDeliveryChart1YearUrl,
                params: {id: id}
            });
        },
        getDriverDeliverysChart6MonthsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDeliveryChart6MonthsUrl,
                params: {id: id}
            });
        },
        getDriverDeliverysChart1MonthPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDeliveryChart1MonthUrl,
                params: {id: id}
            });
        },
        getDriverLastInvoicesPromise: function (id, limit) {
            return $http({
                method: "GET",
                url: ENV.getDriverLastInvoicesUrl,
                params: {id: id, limit: limit}
            });
        },

        /* Deliverys tab
         ========================================================================== */
        getDriverDeliverysListPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverDeliverysListUrl,
                params: {id: id}
            });
        },

        /* Invoices tab
         ========================================================================== */
        getDriverInvoicesChart1YearPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesChart1YearUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesChart6MonthsPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesChart6MonthsUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesChart1MonthPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesChart1MonthUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesListAllPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesListAllUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesListPaidPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesListPaidUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesListDuePromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesListDueUrl,
                params: {id: id}
            });
        },
        getDriverInvoicesSendAlertPromise: function (id) {
            return $http({
                method: "GET",
                url: ENV.getDriverInvoicesSendAlertUrl,
                params: {id: id}
            });
        }
    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.orders', []).service('API_ORDERS', ["ENV", "$http", function (ENV, $http) {
    return {

        /* Orders list
           ========================================================================== */
        getOrdersListPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getOrdersListUrl
            });
        }

    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.shops', []).service('API_SHOPS', ["ENV", "$http", function (ENV, $http) {
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

        getShopInvoiceSendAlertPromise: function(id) {
            return $http({
                method: "GET",
                url: ENV.getShopInvoiceSendAlertUrl,
                params: {id: id}
            });
        }
    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Api Service
 |--------------------------------------------------------------------------
 */
angular.module('intshop.api.stats', []).service('API_STATS', ["ENV", "$http", function (ENV, $http) {
    return {

        /* Stats
           ========================================================================== */
        getStatsLast7daysPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getStatsLast7days
            });
        },

        getStatsLastMonthPromise: function () {
            return $http({
                method: "GET",
                url: ENV.getStatsLastMonth
            });
        },

        getStatsAllTimePromise: function () {
            return $http({
                method: "GET",
                url: ENV.getStatsAllTime
            });
        }
    }
}]);
'use strict';

/*
 |--------------------------------------------------------------------------
 | Filters
 |--------------------------------------------------------------------------
 */
angular.module('intshop.filters', [])

    .filter('money', ["CONSTANTS", "utils", function (CONSTANTS, utils) {
        return function (number) {

            var n = parseFloat(number).toFixed(2);

            if(isNaN(n))
                n = 0;
            else
                n = utils.number_format(n, 2, '.', ' ');

            return CONSTANTS.CURRENCY + " " + n;
        };
    }])

    .filter('number_format', ["CONSTANTS", "utils", function (CONSTANTS, utils) {
        return function (number) {

            var n = parseFloat(number).toFixed(2);

            if(isNaN(n))
                n = 0;
            else
                n = utils.number_format(n, 0, '.', ' ');

            return n;
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
            return 'order-info.jsp?id=' + id;
        },
        linkToOrdersList: function() {
            return 'orders.jsp'
        },
        linkToShopItemsPage: function(id) {
            return 'http://test.intshop.com/shop-items.jsp';
        },
        linkToShopDetails: function(id) {
            return 'shop-details.jsp?id=' + id;
        },
        linkToDriversDetails: function(id) {
            return 'driver-details.jsp?id=' + id;
        },
        linkToClientDetails: function(id) {
            return 'client-details.jsp?id=' + id;
        },
        linkToDelivery: function(id) {
            return 'delivery.jsp?id=' + id;
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
        },

        number_format: function(number, decimals, dec_point, thousands_sep) {
            // http://kevin.vanzonneveld.net
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +     bugfix by: Michael White (http://getsprink.com)
            // +     bugfix by: Benjamin Lupton
            // +     bugfix by: Allan Jensen (http://www.winternet.no)
            // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +     bugfix by: Howard Yeend
            // +    revised by: Luke Smith (http://lucassmith.name)
            // +     bugfix by: Diogo Resende
            // +     bugfix by: Rival
            // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
            // +   improved by: davook
            // +   improved by: Brett Zamir (http://brett-zamir.me)
            // +      input by: Jay Klehr
            // +   improved by: Brett Zamir (http://brett-zamir.me)
            // +      input by: Amir Habibi (http://www.residence-mixte.com/)
            // +     bugfix by: Brett Zamir (http://brett-zamir.me)
            // +   improved by: Theriault
            // +   improved by: Drew Noakes
            // *     example 1: number_format(1234.56);
            // *     returns 1: '1,235'
            // *     example 2: number_format(1234.56, 2, ',', ' ');
            // *     returns 2: '1 234,56'
            // *     example 3: number_format(1234.5678, 2, '.', '');
            // *     returns 3: '1234.57'
            // *     example 4: number_format(67, 2, ',', '.');
            // *     returns 4: '67,00'
            // *     example 5: number_format(1000);
            // *     returns 5: '1,000'
            // *     example 6: number_format(67.311, 2);
            // *     returns 6: '67.31'
            // *     example 7: number_format(1000.55, 1);
            // *     returns 7: '1,000.6'
            // *     example 8: number_format(67000, 5, ',', '.');
            // *     returns 8: '67.000,00000'
            // *     example 9: number_format(0.9, 0);
            // *     returns 9: '1'
            // *    example 10: number_format('1.20', 2);
            // *    returns 10: '1.20'
            // *    example 11: number_format('1.20', 4);
            // *    returns 11: '1.2000'
            // *    example 12: number_format('1.2000', 3);
            // *    returns 12: '1.200'
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                toFixedFix = function (n, prec) {
                    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                    var k = Math.pow(10, prec);
                    return Math.round(n * k) / k;
                },
                s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        }



    }
}]);