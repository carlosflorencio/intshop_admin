<!-- Client Orders Data table -->
<div class="data_table_area" ng-controller="clientOrdersController as orders">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <!-- Data table -->
                <div class="table-responsive shops_sales_table">
                    <table class="table" datatable="ng" dt-instance="orders.dtInstance"
                           dt-options="orders.dtOptions" dt-column-defs="orders.dtColumnDefs">
                        <thead>
                        <tr class="table_title">
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

                        <tr class="table_row" ng-repeat="order in ::orders.list">
                            <td class="sales_date">
                                {{ order.$date | simpleDate }}
                            </td>
                            <td class="sales_price">
                                {{ order.price | money }}
                            </td>
                            <td class="sales_postcode shop">
                                <a class="pointer" ng-href="{{ client.urls.linkToShopDetails(order.shop._id.$oid) }}">
                                    {{ order.shop.name }}
                                </a>
                            </td>
                            <td class="fee_to">
                                {{ order.fee_to | capitalize }}
                            </td>
                            <td class="sales_driverby driver">
                                <a class="pointer" ng-href="{{ client.urls.linkToDriversDetails(order.driver._id.$oid) }}">
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
                                <a title="View" ng-href="{{ client.urls.linkToOrderInfo(order._id.$oid, 'user-orders') }}"
                                   class="sales_view_button pointer">
                                    View
                                </a>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <!-- / Data table -->
            </div>
        </div>

    </div>
</div>
<!-- / Client Orders Data table -->