'use strict';

/*
 |--------------------------------------------------------------------------
 | Header Controller
 |--------------------------------------------------------------------------
 */
angular.module('intshop').controller('headerController', function ($scope, $location, urls) {

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



});