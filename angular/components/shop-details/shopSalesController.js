'use strict';

/*
 |--------------------------------------------------------------------------
 | Shop Sales Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('shopSalesController', function ($scope, $location, utils) {

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
        vm.regDate = utils.getFullDate(vm.details.regDate.$date);

        // Activate jquery star rating plugin, ugly but ... :$
        $timeout(function () {
            $("#rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);

        // Get shop last orders
        ApiDevelop.getShopLastOrdersPromise(vm.details._id.$oid, 5).then(function(result) {
            console.log(result);
            vm.lastOrders = result;
        });

        vm.loaded = true;
    }
});