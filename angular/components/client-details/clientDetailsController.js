'use strict';

/*
 |--------------------------------------------------------------------------
 | Client Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('clientDetailsController', function ($rootScope, utils,
                                                                        $timeout,
                                                                        API_CLIENTS, urls) {

    var vm = this;

    /* Client Details
     ========================================================================== */
    vm.clientId = utils.getUrlParameter.id;
    vm.tabIndex = utils.getUrlParameter.tab;
    vm.urls = urls;

    API_CLIENTS.getClientDetailsPromise(vm.clientId).then(function (response) {
        vm.info = response.data;

        vm.setTab(vm.tabIndex ? vm.tabIndex : 0);
    });

    /* Tabs
     ========================================================================== */
    vm.tabs = [
        {name: "client-resume", active: true},
        {name: "client-orders", active: false},
        {name: "client-reviews", active: false}
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
            text: "You are about to suspend the client!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, suspend it!",
            closeOnConfirm: false
        }, function () {
            swal("Driver Suspended!", "", "success");

            API_CLIENTS.getClientSuspendPromise(vm.clientId).then(function(response) {
                if(response.status == 200) {
                    vm.info.active = false;
                }
            });
        });
    };

    vm.restore = function() {
        swal("Client restored!", "", "success");

        API_CLIENTS.getClientRestorePromise(vm.clientId).then(function(response) {
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
        if(vm.tab.name == 'client-orders' || vm.tab.name == 'client-reviews') {
            $rootScope.$broadcast('tab:' + vm.tab.name + ":search", vm.searchText);
        }
    };

});

