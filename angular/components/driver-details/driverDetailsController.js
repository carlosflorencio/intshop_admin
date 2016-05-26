'use strict';

/*
 |--------------------------------------------------------------------------
 | Driver Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('driverDetailsController', function ($rootScope, utils,
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

});

