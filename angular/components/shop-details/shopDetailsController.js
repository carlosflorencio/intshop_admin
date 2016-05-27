'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Details Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopDetailsController', function ($rootScope, utils,
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

        vm.setTab(vm.tabIndex ? vm.tabIndex : 0);
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

});

