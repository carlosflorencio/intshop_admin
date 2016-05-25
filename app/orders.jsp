<%@include file="partials/header.jsp" %>

<div ng-controller="ordersController as ordersCtrl">

    <!-- Sub Bar -->
    <div class="subbar_area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">
                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <h3>List of Orders</h3>
                            </div>
                        </div>
                        <!-- Order List Filter Area -->
                        <div class="filter_list">
                            <div class="search_bar">
                                <form action="">
                                    <div class="search_box">
                                        <button type="submit">
                                            <img width="15" src="assets/images/search.png" alt="Search">
                                        </button>
                                        <input type="text" placeholder="Search" ng-model="ordersCtrl.searchText"
                                               ng-change="ordersCtrl.searchTable()">
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / Sub Bar -->

    <!-- Table -->
    <div class="data_table_area">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">

                    <div class="table-responsive shops_sales_table">
                        <table class="table"
                               datatable="ng"
                               dt-instance="ordersCtrl.dtInstance"
                               dt-options="ordersCtrl.dtOptions"
                               dt-column-defs="ordersCtrl.dtColumnDefs">
                            <thead>
                                <tr class="table_title">
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Shop</th>
                                    <th>Fee to</th>
                                    <th>Driver</th>
                                    <th>Statues</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table_row" ng-repeat="order in ::ordersCtrl.orders">
                                    <td class="sales_name order_page_name">
                                        {{ order.name }}
                                    </td>
                                    <td class="sales_date">
                                        {{ order.$date | simpleDate }}
                                    </td>
                                    <td class="sales_price">
                                        {{ order.price | money }}
                                    </td>
                                    <td class="sales_postcode shop">
                                        <a class="pointer" ng-href="{{ ordersCtrl.urls.linkToShopDetails(order.shop._id.$oid) }}">
                                            {{ order.shop.name }}
                                        </a>
                                    </td>
                                    <td class="fee_to">
                                        {{ order.fee_to | capitalize }}
                                    </td>
                                    <td class="sales_driverby driver">
                                        <a class="pointer" ng-href="{{ ordersCtrl.urls.linkToDriversDetails(order.driver._id.$oid) }}">
                                            {{ order.driver.name }}
                                        </a>
                                    </td>
                                    <td class="sales_stutas">
                                        <div ng-show="order.statues == 'waiting'">
                                            <img  width="14" src="./assets/images/waiting-icon.png" alt=""/>
                                            Waiting...
                                        </div>
                                        <div ng-show="order.statues != 'waiting'">
                                            {{ order.statues | capitalize }}
                                        </div>
                                    </td>
                                    <td class="sales_views">
                                        <a title="View" ng-href="{{ ordersCtrl.urls.linkToOrderInfo(order._id.$oid) }}"
                                           class="sales_view_button pointer">
                                            View
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- /Table -->
</div>

<%@include file="partials/footer.jsp" %>