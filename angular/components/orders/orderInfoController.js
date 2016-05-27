'use strict';

/*
 |--------------------------------------------------------------------------
 | Order Info Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('orderInfoController', function (ENV, API_ORDERS, urls, utils, $timeout) {

    var vm = this;
    vm.urls = urls;

    vm.orderId = utils.getUrlParameter.id;
    vm.from = utils.getUrlParameter.from;
    vm.clientId = null;
    vm.shopId = null;
    vm.driverId = null;

    // Get order info
    API_ORDERS.getOrdersDetailsPromise(vm.orderId).then(function(response) {
        vm.info = response.data;
        vm.clientId = vm.info.client._id.$oid;
        vm.shopId = vm.info.shop._id.$oid;
        vm.driverId = vm.info.driver._id.$oid;

        // Activate jquery star rating plugin, ugly but ... :$
        $timeout(function () {
            $(".rating-stars").rating({displayOnly: true, step: 0.5, size: 'xs'});
        }, 200);
    });


    /* Functions
     ========================================================================== */
    // Product image
    vm.image = function (id) {
        return ENV.getItemImageUrlById(id);
    };

    vm.backTitle = function() {
        switch(vm.from) {
            case 'deliverys':
                return 'Back to Deliverys';
            case 'shop-sales':
                return 'Back to Shop Sales';
            case 'client-resume':
                return 'Back to Client';
            case 'shop-resume':
                return 'Back to Shop';
            default:
                return 'Back to Orders';
        }
    };

    vm.backLink = function() {
        switch(vm.from) {
            case 'deliverys':
                return urls.linkToDriversDetails(vm.driverId, 1);
            case 'user-orders':
                return urls.linkToClientDetails(vm.clientId, 1);
            case 'shop-sales':
                return urls.linkToShopDetails(vm.shopId, 1);
            case 'client-resume':
                return urls.linkToClientDetails(vm.clientId);
            case 'shop-resume':
                return urls.linkToShopDetails(vm.shopId, 0);
            default:
                return urls.linkToOrdersList();
        }
    }

});