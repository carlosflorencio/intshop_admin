'use strict';

/*
 |--------------------------------------------------------------------------
 | Header Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('headerController', function ($scope, $location) {

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



});