<div class="data_table_area shopsview_table shops_resume_page" ng-controller="shopResumeController as resume">
    <div class="container">
        <div class="row">

            <div class="col-sm-6">
                <div class="left_column">

                    <div class="left_column_single">
                        <div class="single_left">
                            <div class="tesco_logo">
                                <img width="80" ng-src="{{ resume.image(shop.shopId) }}" alt="{{ shop.info.storeName }}"
                                     onError="this.src='./assets/images/image-icon.png'">
                            </div>
                        </div>
                        <div class="single_middle">
                            <h2>{{ shop.info.storeName }}</h2>
                            <p>{{ shop.info.category }}</p>
                            <input type="number" class="rating-loading" id="rating-stars"
                                   ng-model="shop.info.shopRate">
                        </div>

                        <div class="single_right">
                            <p>Products</p>
                            <h4>{{ shop.info.totalProducts }}</h4>
                            <a ng-href="{{ shop.urls.linkToShopItemsPage(shop.shopId) }}" target="_blank"
                               class="view_page" title="View Page">
                                INTSHOP
                            </a>
                        </div>

                    </div>

                    <div class="left_column_single total_sale_report google_chart_area">
                        <div class="total_sale_top">
                            <div class="single_left_top">
                                <p>Total Sale Report</p>
                                <h1>{{ shop.info.totalSales | money }}</h1>
                            </div>
                            <a href="#" ng-click="shop.setTab(1)" class="view_page" title="Sales">Sales</a>
                        </div>

                        <div class="total_sale_bottom">
                            <div class="google_chart">
                                <div google-chart chart="salesChart" class="chart-size" style="width:100%;"></div>
                            </div>

                            <div class="total_sale_middle">
                                <h2>Total Sales</h2>
                                <p>{{ shop.info.totalSales }}</p>
                            </div>

                            <div class="total_sale_right">
                                <h4>{{ shop.info.totalSalesWin | money }}</h4>
                                <p>Sales Win</p>
                            </div>
                        </div>
                    </div>

                    <div class="left_column_single total_sale_report">
                        <div class="single_top_full">
                            <div class="single_left_top">
                                <p>Invoices Paid</p>
                                <h1>{{ shop.info.invoicesPaid | money }}</h1>
                            </div>
                            <div class="single_top_right">
                                <a href="#" ng-click="shop.setTab(2)" title="Invoices">Invoices</a>
                            </div>
                        </div>

                        <div class="invoice_history_table">
                            <p>Invoice History</p>
                            <div class="table-responsive">
                                <table class="table">
                                    <tr ng-repeat="invoice in shop.info.invoices | limitTo: 2">
                                        <td class="date">{{ invoice.$date | monthDate }}</td>
                                        <td class="price">{{ invoice.value | money }}</td>
                                        <td class="due">{{ invoice.type }}</td>
                                        <td class="download">
                                            <a ng-href="{{ invoice.download }}" title="Download Invoice">
                                                <img width="13" src="assets/images/download-icon.png"
                                                     alt="Download Ico">
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="right_column">

                    <div class="contact_info">
                        <div class="contact_top">
                            <div class="contact_left">
                                <h4>Contact Info</h4>
                                <ul>
                                    <li>
                                        <img width="9" src="assets/images/phone-icon.png" alt="Phone Ico">
                                        <span>{{ shop.info.cell }}</span>
                                    </li>
                                    <li>
                                        <img width="9" src="assets/images/phone-icon.png" alt="Phone Ico">
                                        <span>{{ shop.info.email }}</span>
                                    </li>
                                    <li>
                                        <img width="9" src="assets/images/map-marker.png" alt="Map Marker Ico">
                                        <span>{{ shop.info.address }},<br/>
                                            {{ shop.info.city }},<br/>
                                            {{ shop.info.postcode }}
                                    </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="contact_right">
                                <h4>Opening Time</h4>
                                <div ng-show="!info.open247">
                                    <div class="single_date_time" ng-show="shop.info.availableTime.monday">
                                        <h4>Monday</h4>
                                        <p>{{ resume.hours(shop.info.availableTime.monday[0]) }}:00 to {{
                                            resume.hours(shop.info.availableTime.monday[1]) }}::00</p>
                                    </div>
                                    <div class="single_date_time" ng-show="shop.info.availableTime.tuesday">
                                        <h4>Tuesday</h4>
                                        <p>{{ resume.hours(shop.info.availableTime.tuesday[0]) }}:00 to {{
                                            resume.hours(shop.info.availableTime.tuesday[1]) }}::00</p>
                                    </div>
                                    <div class="single_date_time" ng-show="shop.info.availableTime.wednesday">
                                        <h4>Wednesday</h4>
                                        <p>{{ resume.hours(shop.info.availableTime.wednesday[0]) }}:00 to {{
                                            resume.hours(shop.info.availableTime.wednesday[1]) }}::00</p>
                                    </div>
                                    <div class="single_date_time" ng-show="shop.info.availableTime.thursday">
                                        <h4>Thursday</h4>
                                        <p>{{ resume.hours(shop.info.availableTime.thursday[0]) }}:00 to {{
                                            resume.hours(shop.info.availableTime.thursday[1]) }}::00</p>
                                    </div>
                                    <div class="single_date_time" ng-show="shop.info.availableTime.friday">
                                        <h4>Friday</h4>
                                        <p>{{ resume.hours(shop.info.availableTime.friday[0]) }}:00 to {{
                                            resume.hours(shop.info.availableTime.friday[1]) }}::00</p>
                                    </div>
                                    <div class="single_date_time" ng-show="shop.info.availableTime.saturday">
                                        <h4>Saturday</h4>
                                        <p>{{ resume.hours(shop.info.availableTime.saturday[0]) }}:00 to {{
                                            resume.hours(shop.info.availableTime.saturday[1]) }}::00</p>
                                    </div>
                                    <div class="single_date_time" ng-show="shop.info.availableTime.sunday">
                                        <h4>Sunday</h4>
                                        <p>{{ resume.hours(shop.info.availableTime.sunday[0]) }}:00 to {{
                                            resume.hours(shop.info.availableTime.sunday[1]) }}::00</p>
                                    </div>
                                </div>
                                <div ng-show="shop.info.open247">
                                    <div class="single_date_time" ng-show="shop.info.availableTime.sunday">
                                        <h4>Open 24/7</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="contact_bottom">
                            <p>Registered in {{ resume.regDate }}</p>
                        </div>
                    </div>

                    <div class="list_of_order">
                        <div class="list_of_order_head">
                            <h3>Last Orders</h3>
                            <a ng-href="{{ shop.urls.linkToOrdersList() }}" class="view_all-order" title="View all Orders">View all orders
                                <span>
                                    <img width="4" src="assets/images/angle-right.png" alt="Arrow right">
                                </span>
                            </a>
                        </div>

                        <div class="list_of_order_table">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr class="row_head">
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th>Statues</th>
                                        <th>Driver by</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr class="table_row" ng-repeat="order in resume.lastOrders">
                                        <td class="date_list">{{ order.$date | simpleDate }}</td>
                                        <td class="price_list">{{ order.price | money }}</td>
                                        <td class="status">
                                            <div ng-show="order.status == 'waiting'">
                                                <img  width="14" src="./assets/images/waiting-icon.png" alt=""/>
                                                Waiting...
                                            </div>
                                            <div ng-show="order.status != 'waiting'">
                                                {{ order.status | capitalize }}
                                            </div>
                                        </td>
                                        <td class="driver_by">{{ order.driver_by | capitalize }}</td>
                                        <td class="view_link">
                                            <a ng-href="{{ shop.urls.linkToOrderInfo(order._id.$oid) }}" title="View">View</a>
                                        </td>
                                    </tr>


                                    <tr class="table_row" ng-show="!resume.lastOrders.length">
                                        <td colspan="5" class="text-center">No orders yet..</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


    </div>
</div>