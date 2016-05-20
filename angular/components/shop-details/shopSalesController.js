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