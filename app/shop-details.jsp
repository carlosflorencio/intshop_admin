<%@include file="partials/header.jsp" %>

<script type="text/javascript">
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
        var data = google.visualization.arrayToDataTable([
            ['Element', 'Sales', {role: 'style'}],
            ['6h', 8, '#3493d5'],            // RGB value
            ['12h', 10, '#3493d5'],            // English color name
            ['24h', 19, '#3493d5'],
            ['total', 21, 'color: #3493d5'] // CSS-style declaration
        ]);

        var options = {
            legend: {position: 'none'},
            vAxis: {
                gridlines: {
                    color: 'transparent'
                }
            }
        };

        var chart = new google.visualization.ColumnChart(
                document.getElementById('chart_div'));

        chart.draw(data, options);
    }
</script>

<div ng-controller="shopDetailsController as shopDetails">

    <div ng-class="{sales_page: tabs[1].active}" class="subbar_area shopsview_page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <a class="backto_list" href="shops.jsp" title="Back to Shops">
                                    <img width="6" src="assets/images/left-arrow.png" alt="Left Arrow">
                                    Back to list
                                </a>
                                <a href="#" class="tesco_express" title="{{ info.storeName }}">{{ info.storeName }}</a>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">

                            <div class="search_bar" ng-show="tabs[1].active">
                                <form action="">
                                    <div class="search_box">
                                        <button type="submit">
                                            <img width="15" alt="Search Ico" src="assets/images/search.png"></button>
                                        <input type="text" placeholder="Search" ng-model="searchText"
                                               ng-change="searchTable()">
                                    </div>
                                </form>
                            </div>

                            <div class="right_side_list">
                                <ul>
                                    <li ng-class="{active: tabs[0].active}">
                                        <a class="pointer" ng-click="setTab(0)" title="Resume">Resume</a>
                                    </li>
                                    <li ng-class="{active: tabs[1].active}">
                                        <a class="pointer" ng-click="setTab(1)" title="Sales">Sales</a>
                                    </li>
                                    <li ng-class="{active: tabs[2].active}">
                                        <a class="pointer" ng-click="setTab(2)" title="Invoices">Invoices</a>
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
    <div ng-show="tabs[0].active">
        <div class="data_table_area shopsview_table shops_resume_page">
            <div class="container">
                <div class="row">

                    <div class="col-sm-6">
                        <div class="left_column">

                            <div class="left_column_single">
                                <div class="single_left">
                                    <div class="tesco_logo">
                                        <img width="80" ng-src="{{ image(shopId) }}" alt="{{ info.storeName }}"
                                             onError="this.src='./assets/images/image-icon.png'">
                                    </div>
                                </div>
                                <div class="single_middle">
                                    <h2>{{ info.storeName }}</h2>
                                    <p>{{ info.category }}</p>
                                    <input type="number" class="rating-loading" id="rating-stars"
                                           ng-model="info.shopRate">
                                </div>

                                <div class="single_right">
                                    <p>Products</p>
                                    <h4>{{ info.totalProducts }}</h4>
                                    <a href="#" class="view_page" title="View Page">View Page</a>
                                </div>

                            </div>

                            <div class="left_column_single total_sale_report google_chart_area">
                                <div class="total_sale_top">
                                    <div class="single_left_top">
                                        <p>Total Sale Report</p>
                                        <h1>£ {{ info.totalSales }}</h1>
                                    </div>
                                    <a href="#" ng-click="setTab(1)" class="view_page" title="Sales">Sales</a>
                                </div>

                                <div class="total_sale_bottom">
                                    <div class="google_chart">
                                        <div id="chart_div" class="chart-size"></div>
                                    </div>

                                    <div class="total_sale_middle">
                                        <h2>Total Sales</h2>
                                        <p>{{ info.totalSales }}</p>
                                    </div>

                                    <div class="total_sale_right">
                                        <h4>$ 265.32</h4>
                                        <p>Sales Win</p>
                                    </div>

                                </div>


                            </div>

                            <div class="left_column_single total_sale_report">
                                <div class="single_top_full">
                                    <div class="single_left_top">
                                        <p>Invoices Paid</p>
                                        <h1>£ 250.00</h1>
                                    </div>
                                    <div class="single_top_right">
                                        <a href="#" ng-click="setTab(2)" title="Invoices">Invoices</a>
                                    </div>
                                </div>

                                <div class="invoice_history_table">
                                    <p>Invoice History</p>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tr>
                                                <td class="date">April 16, 2016</td>
                                                <td class="price">$ 50.00</td>
                                                <td class="due">Due</td>
                                                <td class="download">
                                                    <a href="#" title="Download">
                                                        <img width="13" src="assets/images/download-icon.png"
                                                             alt="Download Ico">
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="date">April 16, 2016</td>
                                                <td class="price">$ 50.00</td>
                                                <td class="due">Due</td>
                                                <td class="download" title="Download">
                                                    <a href="#">
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
                                                <span>{{ info.cell }}</span>
                                            </li>
                                            <li>
                                                <img width="9" src="assets/images/phone-icon.png" alt="Phone Ico">
                                                <span>{{ info.email }}</span>
                                            </li>
                                            <li>
                                                <img width="9" src="assets/images/map-marker.png" alt="Map Marker Ico"> <span>{{ info.address }},<br/>
                                            {{ info.city }},<br/>
                                            {{ info.postcode }}</span></li>
                                        </ul>
                                    </div>
                                    <div class="contact_right">
                                        <h4>Opening Time</h4>
                                        <div ng-show="!info.open247">
                                            <div class="single_date_time" ng-show="info.availableTime.monday">
                                                <h4>Monday</h4>
                                                <p>{{ hours(info.availableTime.monday[0]) }}:00 to {{
                                                    hours(info.availableTime.monday[1]) }}::00</p>
                                            </div>
                                            <div class="single_date_time" ng-show="info.availableTime.tuesday">
                                                <h4>Tuesday</h4>
                                                <p>{{ hours(info.availableTime.tuesday[0]) }}:00 to {{
                                                    hours(info.availableTime.tuesday[1]) }}::00</p>
                                            </div>
                                            <div class="single_date_time" ng-show="info.availableTime.wednesday">
                                                <h4>Wednesday</h4>
                                                <p>{{ hours(info.availableTime.wednesday[0]) }}:00 to {{
                                                    hours(info.availableTime.wednesday[1]) }}::00</p>
                                            </div>
                                            <div class="single_date_time" ng-show="info.availableTime.thursday">
                                                <h4>Thursday</h4>
                                                <p>{{ hours(info.availableTime.thursday[0]) }}:00 to {{
                                                    hours(info.availableTime.thursday[1]) }}::00</p>
                                            </div>
                                            <div class="single_date_time" ng-show="info.availableTime.friday">
                                                <h4>Friday</h4>
                                                <p>{{ hours(info.availableTime.friday[0]) }}:00 to {{
                                                    hours(info.availableTime.friday[1]) }}::00</p>
                                            </div>
                                            <div class="single_date_time" ng-show="info.availableTime.saturday">
                                                <h4>Saturday</h4>
                                                <p>{{ hours(info.availableTime.saturday[0]) }}:00 to {{
                                                    hours(info.availableTime.saturday[1]) }}::00</p>
                                            </div>
                                            <div class="single_date_time" ng-show="info.availableTime.sunday">
                                                <h4>Sunday</h4>
                                                <p>{{ hours(info.availableTime.sunday[0]) }}:00 to {{
                                                    hours(info.availableTime.sunday[1]) }}::00</p>
                                            </div>
                                        </div>
                                        <div ng-show="info.open247">
                                            <div class="single_date_time" ng-show="info.availableTime.sunday">
                                                <h4>Open 24/7</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="contact_bottom">
                                    <p>Registered in {{ regDate }}</p>
                                </div>
                            </div>

                            <div class="list_of_order">
                                <div class="list_of_order_head">
                                    <h3>Last Orders</h3>
                                    <a href="#" class="view_all-order" title="View all Orders">View all orders <span>
                                        <img width="4" src="assets/images/angle-right.png" alt="Arrow right"></span>
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

                                            <tr class="table_row" ng-repeat="order in lastOrders">
                                                <td class="date_list">16/05/2016</td>
                                                <td class="price_list">£ 1 365.32</td>
                                                <td class="status">Sended</td>
                                                <td class="driver_by">Shop</td>
                                                <td class="view_link">
                                                    <a href="#" title="View">View</a>
                                                </td>
                                            </tr>


                                            <tr class="table_row" ng-show="!lastOrders.length">
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
    </div>
    <!-- /Resume tab -->


    <!-- Sales tab -->
    <div ng-show="tabs[1].active">
        <div class="data_table_area">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="table-responsive shops_sales_table">
                            <table class="table" datatable="ng" dt-instance="shopDetails.dtInstance"
                                   dt-options="shopDetails.dtOptions" dt-column-defs="shopDetails.dtColumnDefs">
                                <thead>
                                <tr class="table_title">
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Post Code</th>
                                    <th>Statues</th>
                                    <th>Driver by</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>

                                <!-- Single Table Row -->
                                <tr class="table_row" ng-repeat="sale in ::shopDetails.sales">
                                    <td class="sales_name">{{ sale.storeName }}</td>
                                    <td class="sales_date">16/05/2016</td>
                                    <td class="sales_price">£ 1 365.32</td>
                                    <td class="sales_postcode">N3 2DB</td>
                                    <td class="sales_stutas">Sended</td>
                                    <td class="sales_driverby">Shop</td>
                                    <td class="sales_views">
                                        <a href="#" class="sales_view_button" title="View">View</a>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Sales tab -->


    <!-- Invoices tab -->
    <div ng-show="tabs[2].active">
        <div class="data_table_area shopsview_table shops_resume_page">
            <div class="container">
                <div class="row">

                    <div class="col-sm-6">
                        <div class="left_column invoice_history_left_column">

                            <div class="invoice_left_top">
                                <div class="invoice_paid_left">
                                    <p>Invoices Paid</p>
                                    <h1>£ 250.00</h1>
                                </div>
                                <div class="invoice_paid_left">
                                    <p class="red">Pending</p>
                                    <h1>£ 50.00</h1>
                                    <a href="#" class="send_alert" title="Send Alert">Send Alert</a>
                                </div>

                            </div>

                            <div class="invoice_left_bottom">
                                <div class="invoice_paid_bottm_top">
                                    <div class="single_left_top">
                                        <h4>Invoices Paid Graph</h4>
                                        <ul>
                                            <li>1 Month</li>
                                            <li>6 Months</li>
                                            <li>1 Year</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="total_sale_bottom">
                                    <div class="google_chart">
                                        <div id="chart_div1" class="chart-size"></div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="right_column">
                            <div class="contact_info invoice_history_section">
                                <div class="list_of_order">

                                    <div class="list_of_order_table">

                                        <div class="invoice_history">
                                            <p>Invoice History</p>

                                            <div class="invoice_history_menu">
                                                <ul>
                                                    <li ng-class="{active: invoicesTabs[0].active}">
                                                        <a ng-click="setInvoicesTab(0)" id="all" href="#" title="All">All</a>
                                                    </li>
                                                    <li ng-class="{active: invoicesTabs[1].active}">
                                                        <a ng-click="setInvoicesTab(1)" id="paid" href="#" title="Paid">Paid</a>
                                                    </li>
                                                    <li ng-class="{active: invoicesTabs[2].active}">
                                                        <a ng-click="setInvoicesTab(2)" id="due" href="#" title="Due">Due</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="invoice_history_data_table">

                                            <div class="table-responsive">
                                                <div class="table-responsive shops_sales_table">
                                                    <table class="table" datatable="ng"
                                                           dt-instance="shopDetails.dtInstanceInvoices"
                                                           dt-options="shopDetails.dtOptionsInvoices">
                                                        <thead ng-hide="true">
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        </thead>
                                                        <tbody>

                                                        <!-- Single Table Row -->
                                                        <tr class="invoice_history_row"
                                                            ng-repeat="invoice in shopDetails.invoices">
                                                            <td class="invoice_date">{{ invoice.storeName }}</td>
                                                            <td class="invoice_price">$ 50.00</td>
                                                            <td class="invoice_due">Due</td>
                                                            <td class="invoice_download">
                                                                <a href="#" title="Download">
                                                                    <img width="15"
                                                                         src="assets/images/download-icon.png"
                                                                         alt="Download Ico">
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
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Invoices tab -->
</div>

<%@include file="partials/footer.jsp" %>