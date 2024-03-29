<%@include file="partials/header.jsp" %>
<div ng-controller="shopDetailsController as shop">

    <div ng-class="{sales_page: shop.tabs[1].active}" class="subbar_area shopsview_page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <a class="backto_list pointer" ng-href="{{ shop.urls.linkToShopsList() }}" title="Back to Shops">
                                    <img width="6" src="assets/images/left-arrow.png" alt="Left Arrow">
                                    Back to list
                                </a>
                                <a href="#" class="tesco_express" title="{{ shop.info.storeName }}">
                                    {{ shop.info.storeName }}
                                </a>
                                <a ng-show="shop.info.active" ng-click="shop.suspend()"
                                   title="Suspend Account" class="suspend_account"
                                   href="#">
                                    Suspend Account
                                </a>
                                <a ng-show="!shop.info.active" ng-click="shop.restore()"
                                   title="Suspend Account" class="restore_account"
                                   href="#">
                                    Restore Account
                                </a>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">

                            <div class="search_bar" ng-show="shop.tabs[1].active">
                                <form action="">
                                    <div class="search_box">
                                        <button type="submit">
                                            <img width="15" alt="Search Ico" src="assets/images/search.png">
                                        </button>
                                        <input type="text" placeholder="Search" ng-model="shop.searchText"
                                               ng-change="shop.searchTable()">
                                    </div>
                                </form>
                            </div>

                            <div class="right_side_list">
                                <ul>
                                    <li ng-class="{active: shop.tabs[0].active}">
                                        <a class="pointer" ng-click="shop.setTab(0)" title="Resume">Resume</a>
                                    </li>
                                    <li ng-class="{active: shop.tabs[1].active}">
                                        <a class="pointer" ng-click="shop.setTab(1)" title="Sales">Sales</a>
                                    </li>
                                    <li ng-class="{active: shop.tabs[2].active}">
                                        <a class="pointer" ng-click="shop.setTab(2)" title="Invoices">Invoices</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Resume tab -->
    <div ng-show="shop.tabs[0].active">
        <%@include file="modules/shop/shop-resume.jsp" %>
    </div>
    <!-- /Resume tab -->


    <!-- Sales tab -->
    <div ng-show="shop.tabs[1].active">
        <%@include file="modules/shop/shop-sales.jsp" %>
    </div>
    <!-- /Sales tab -->


    <!-- Invoices tab -->
    <div ng-show="shop.tabs[2].active">
        <%@include file="modules/shop/shop-invoices.jsp" %>
    </div>
    <!-- /Invoices tab -->
</div>

<%@include file="partials/footer.jsp" %>