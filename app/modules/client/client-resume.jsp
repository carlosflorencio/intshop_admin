<!-- Clients Data datle -->
<div class="data_table_area shopsview_table driver_resume_page clients_resume_page"
     ng-controller="clientResumeController as resume">
    <div class="container">
        <div class="row">

            <!-- Drivers Resume Left -->
            <div class="col-sm-6">
                <div class="left_column drivers_resume_left">
                    <!-- Drivers Information -->
                    <div class="left_column_single">
                        <div class="drivers_left_top">
                            <div class="single_left">
                                <div class="tesco_logo">
                                    <img width="80" ng-src="{{ resume.image(client._id.$oid) }}"
                                         alt="{{ client.info.name }}">
                                </div>
                            </div>
                            <div class="single_middle">
                                <h2>{{ client.info.name }}</h2>
                                <p>This user sign in using
                                    <a title="{{ client.info.signup_origin }}">
                                        {{ client.info.signup_origin }}
                                    </a>
                                </p>
                                <h5>Born {{ client.info.born }}</h5>
                            </div>

                        </div>
                    </div>
                    <!-- / Drivers Information -->

                    <!-- Contact Info -->
                    <div class="left_column_single border_bottom_none">
                        <!-- Contact -->
                        <div class="contact_info">
                            <div class="contact_top">
                                <div class="contact_left">
                                    <h4>Contact Info</h4>
                                    <ul>
                                        <li>
                                            <img width="9" alt="Phone" src="assets/images/phone-icon.png">
                                            <span>{{ client.info.cell }}</span>
                                        </li>
                                        <li>
                                            <img width="9" alt="Phone" src="assets/images/phone-icon.png">
                                            <span>{{ client.info.email }}</span>
                                        </li>
                                        <li>
                                            <img width="9" alt="Map" src="assets/images/map-marker.png">
                                            <span>{{ client.info.address }},<br>
                                            {{ client.info.city }},<br>
                                            {{ client.info.postcode }}</span></li>
                                    </ul>
                                </div>
                                <!-- Newsletter -->
                                <div class="contact_right insurance">
                                    <h4>Newsletter</h4>
                                    <div class="single_date_time">
                                        <h5 ng-show="client.info.newsletter">
                                            <img width="15" src="assets/images/subscribed.png" alt="Checked">
                                            Subscribed
                                        </h5>
                                        <p ng-show="!client.info.newsletter">
                                            not subscribed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Car info -->
                        <div class="card_info contact_right insurance">
                            <h4>Card info</h4>
                            <div class="single_date_time">
                                <h4>Credit Card Number</h4>
                                <p>{{ client.info.card.number }}</p>
                            </div>
                            <div class="single_date_time">
                                <h4>Expirity Date</h4>
                                <p>{{ client.info.card.expiration }}</p>
                            </div>
                        </div>

                    </div>
                    <!-- Contact Info -->

                    <div class="contact_bottom">
                        <p>Registered in {{ client.info.regDate.$date | fullDate }}</p>
                    </div>

                </div>
            </div>
            <!-- / Drivers Resume Left -->

            <!-- Drivers Resume Right -->
            <div class="col-sm-6">
                <div class="right_column">
                    <div class="drivers_resume_chart_section">

                        <div class="total_deliverys">
                            <div class="single_left_top">
                                <p>Total Orders</p>
                                <h1>{{ client.info.total_orders | number_format }}</h1>
                            </div>
                            <a title="Orders" ng-click="client.setTab(1)" class="view_page pointer">Orders</a>
                        </div>

                        <div class="invoice_left_bottom">
                            <div class="invoice_paid_bottm_top">
                                <div class="single_left_top">
                                    <h4>Orders</h4>
                                    <ul>
                                        <li ng-click="resume.setChartType(2)"
                                            ng-class="{active: resume.chartType == 2}" class="pointer">1 Month</li>
                                        <li ng-click="resume.setChartType(1)"
                                            ng-class="{active: resume.chartType == 1}" class="pointer">6 Months</li>
                                        <li ng-click="resume.setChartType(0)"
                                            ng-class="{active: resume.chartType == 0}" class="pointer">1 Year</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="total_sale_bottom">
                                <div class="google_chart">
                                    <div google-chart chart="resume.ordersChart" class="chart-size" style="width:100%;"></div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <!-- Clients Data Table -->
                    <div class="list_of_order_table">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr class="row_head">
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Shop</th>
                                    <th>Statues</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>

                                    <tr class="table_row" ng-repeat="order in ::resume.orders | limitTo: 5">
                                        <td class="date_list">
                                            {{ order.date | simpleDate }}
                                        </td>
                                        <td class="price_list">
                                            {{ order.price | money }}
                                        </td>
                                        <td class="driver_by shop">
                                            <a class="pointer" ng-href="{{ client.urls.linkToShopDetails(order.shop._id.$oid) }}">
                                                {{ order.shop.name }}
                                            </a>
                                        </td>
                                        <td class="status">
                                            <div ng-show="order.statues == 'waiting'">
                                                <img  width="14" src="./assets/images/waiting-icon.png" alt=""/>
                                                Waiting...
                                            </div>
                                            <div ng-show="order.statues != 'waiting'">
                                                {{ order.statues | capitalize }}
                                            </div>
                                        </td>
                                        <td class="view_link">
                                            <a title="View" ng-href="{{ client.urls.linkToOrderInfo(order._id.$oid, 'client-resume') }}"
                                               class="sales_view_button pointer">
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <a title="View all orders" ng-click="client.setTab(1)" class="view_all_orders_button pointer">
                            View all orders
                        </a>
                    </div>
                    <!-- / Clients Data Table -->

                </div>
            </div>
            <!-- / Drivers Resume Right -->
        </div>

    </div>
</div>
<!-- / Clients Data datle -->