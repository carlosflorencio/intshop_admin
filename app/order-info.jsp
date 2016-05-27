<%@include file="partials/header.jsp" %>

<div ng-controller="orderInfoController as order">

    <div class="subbar_area shopsview_page sales_page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <a class="backto_list pointer" ng-href="{{ order.backLink() }}"
                                   title="{{ order.backTitle() }}">
                                    <img width="6" src="assets/images/left-arrow.png" alt="Left arrow ico">
                                    {{ order.backTitle() }}
                                </a>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">
                            <div class="print_button">
                                <a class="pointer" ng-href="{{ order.info.pdf }}" title="Print Order">

                                    <span>Print Order</span>
                                    <img width="15" src="assets/images/print-download.png" alt="Download ICO">
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Drivers Salesview Data table -->
    <div class="data_table_area">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="sales_view_wrapper">
                        <!-- Sales View Top Info -->
                        <div class="sales_view_top_info">
                            <!-- Clients Section -->
                            <div class="sales_view_single_info">
                                <div class="single_info_top">
                                    <h5>Client</h5>
                                    <a title="Client Page"
                                       ng-href="{{ order.urls.linkToClientDetails(order.clientId) }}">
                                        Client Page
                                    </a>
                                </div>
                                <div class="single_info_bottom">
                                    <h4>{{ order.info.client.name }}</h4>
                                    <p class="clients_phone_number">
                                        <img width="12" src="assets/images/phone-blue-icon.png" alt="Phone">
                                        <span>{{ order.info.client.cell }}</span>
                                    </p>
                                    <p class="clients_address">
                                        {{ order.info.client.address }},
                                        {{ order.info.client.postcode }}
                                        <br/>{{ order.info.client.city }}
                                    </p>
                                </div>
                            </div>

                            <!-- Shop Section -->
                            <div class="sales_view_single_info">
                                <div class="single_info_top">
                                    <h5>Shop</h5>
                                    <a title="Shop Page" ng-href="{{ order.urls.linkToShopDetails(order.shopId) }}">
                                        Shop Page
                                    </a>
                                </div>
                                <div class="single_info_bottom">
                                    <h4>{{ order.info.shop.name }}</h4>
                                    <p class="clients_phone_number">
                                        <img width="12" src="assets/images/phone-blue-icon.png" alt="Phone">
                                        <span>{{ order.info.shop.cell }}</span>
                                    </p>
                                    <p class="clients_address">
                                        {{ order.info.shop.address }},
                                        {{ order.info.shop.postcode }} <br/>{{ order.info.shop.city }}
                                    </p>
                                </div>
                            </div>

                            <!-- Driver Section -->
                            <div class="sales_view_single_info">
                                <div class="single_info_top">
                                    <h5>Driver</h5>
                                    <a title="Driver Page" ng-href="{{ order.urls.linkToDriversDetails(order.driverId) }}">
                                        Driver Page
                                    </a>
                                </div>
                                <div class="single_info_bottom">
                                    <h4>{{ order.info.driver.name }}</h4>
                                    <p class="clients_phone_number">
                                        <img width="12" src="assets/images/phone-blue-icon.png" alt="Phone">
                                        <span>{{ order.info.driver.cell }}</span>
                                    </p>
                                    <p class="clients_address">Arrive in {{ order.info.driver.arrive }} min</p>
                                </div>
                            </div>

                            <!-- Statues Section -->
                            <div class="sales_view_single_info">
                                <div class="single_info_top">
                                    <h5>Statues</h5>
                                </div>
                                <div class="single_info_bottom">
                                    <h4>{{ order.info.statues }}</h4>
                                </div>
                            </div>

                        </div>
                        <!-- / Sales View Top Info -->


                        <!-- Sales View Data Table -->
                        <div class="sales_view_data_table">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="sales_view_data_title">
                                            <th></th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Item Price</th>
                                            <th>Quant.</th>
                                            <th class="item_total">Item Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class="sales_view_data_row" ng-repeat="item in order.info.items">
                                            <td class="product_thumb">
                                                <img width="40" ng-src="{{ order.image(item._id.$oid) }}"
                                                                           alt="{{ item.name }}">
                                            </td>
                                            <td class="product_name">{{ item.name }}</td>
                                            <td class="product_category">{{ item.category }}</td>
                                            <td class="product_price">{{ item.price | money }}</td>
                                            <td class="product_quantity">x {{ item.qtd }}</td>
                                            <td class="total_product">{{ item.total | money }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- / Sales View Data Table -->

                        <!-- Sales Date and Charges -->
                        <div class="sales_view_date_charge">
                            <div class="sales_view_date">
                                <h5>Date</h5>
                                <p>{{ order.info.date | simpleDate }}</p>
                            </div>
                            <div class="sales_view_charge">
                                <h5>Service Charge <span>{{ order.info.service_charge | money }}</span></h5>
                            </div>
                        </div>
                        <!-- / Sales Date and Charges -->

                        <!-- Sales Rating -->
                        <div class="shop_salesview_bottom">
                            <div class="driver_rate_receiver">
                                <p>Driver Rate received</p>
                                <div ng-show="order.info.driver_rate && order.info.driver_rate > 0">
                                    <input type="number" class="rating-stars" ng-model="order.info.driver_rate">
                                </div>
                                <h5 ng-show="!order.info.driver_rate">Not Submited yet</h5>
                            </div>
                            <div class="shop_rate_receiver">
                                <p>Shop Rate received</p>
                                <div ng-show="order.info.shop_rate && order.info.shop_rate > 0">
                                    <input type="number" class="rating-stars" ng-model="order.info.shop_rate">
                                </div>
                                <h5 ng-show="!order.info.shop_rate">Not Submited yet</h5>
                            </div>


                            <div class="sales_view_total_order">
                                <p>Total Order</p>
                                <h2>{{ order.info.total_order | money }}</h2>
                            </div>
                        </div>
                        <!-- / Sales Rating -->

                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- / Drivers Salesview Data table -->

</div>

<%@include file="partials/footer.jsp" %>