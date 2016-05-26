<%@include file="partials/header.jsp" %>

<div ng-controller="dashboardController as dashboard">

    <!-- Sub Bar -->
    <div class="subbar_area shopsview_page dashboard_subbar">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <ul class="subbar_left_menu">
                                    <li class="active">
                                        <a title="Dashboard" href="#">Dashboard</a>
                                    </li>
                                    <li>
                                        <a title="Minicabs" href="#">Minicabs</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">
                            <div class="right_side_list">
                                <ul>
                                    <li ng-class="{active: dashboard.statsType == 0}">
                                        <a href="#" ng-click="dashboard.setStatsType(0)" title="Last 7 Days">Last 7 Days</a>
                                    </li>
                                    <li ng-class="{active: dashboard.statsType == 1}">
                                        <a href="#" ng-click="dashboard.setStatsType(1)" title="Last Month">Last Month</a>
                                    </li>
                                    <li ng-class="{active: dashboard.statsType == 2}">
                                        <a href="#" ng-click="dashboard.setStatsType(2)" title="All Time">All Time</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / Sub Bar -->

    <!-- Main Content Area -->
    <div class="data_table_area shopsview_table dashboard_page">
        <div class="container">
            <div class="row">

                <!-- Left Side Content -->
                <div class="col-sm-6">
                    <div class="left_column dashboard_progress">
                        <!-- Shops Invoice -->
                        <div class="single_progress_section">
                            <div class="dashboard_progress_top">
                                <div class="dashboard_progress_title">
                                    <h4>Shops Invoices</h4>
                                    <a title="Shops" ng-href="{{ dashboard.urls.linkToShopsList() }}" class="drivers_button pointer">
                                        Shops
                                    </a>
                                </div>
                                <div class="dashboard_progress_report">
                                    <div class="invoice_paid_left">
                                        <p>Invoices Paid</p>
                                        <h1>{{ dashboard.data.shops.invoicesPaid | money }}</h1>
                                    </div>
                                    <div class="invoice_paid_left">
                                        <p class="red">Pending</p>
                                        <h1>{{ dashboard.data.shops.invoicesPending | money }}</h1>
                                    </div>
                                </div>
                            </div>

                            <!--Shops Invoice Chart -->
                            <div class="dashboard_progress_chart">
                                <div class="google_chart">
                                    <div google-chart chart="dashboard.shopsChart" class="chart-size" style="width:100%;"></div>
                                </div>
                            </div>

                        </div>
                        <!-- / Shops Invoice -->

                        <!-- Drivers Invoice -->
                        <div class="single_progress_section">
                            <div class="dashboard_progress_top">
                                <div class="dashboard_progress_title">
                                    <h4>Drivers Invoices</h4>
                                    <a title="Drivers" ng-href="{{ dashboard.urls.linkToDriversList() }}" class="drivers_button pointer">
                                        Drivers
                                    </a>
                                </div>
                                <div class="dashboard_progress_report">
                                    <div class="invoice_paid_left">
                                        <p>Invoices Paid</p>
                                        <h1>{{ dashboard.data.drivers.invoicesPaid | money }}</h1>
                                    </div>
                                    <div class="invoice_paid_left">
                                        <p class="red">Pending</p>
                                        <h1>{{ dashboard.data.drivers.invoicesPending | money }}</h1>
                                    </div>
                                </div>
                            </div>

                            <!--Driver Invoice Chart -->
                            <div class="dashboard_progress_chart">
                                <div class="google_chart">
                                    <div google-chart chart="dashboard.driversChart" class="chart-size" style="width:100%;"></div>
                                </div>
                            </div>
                        </div>
                        <!-- / Drivers Invoice -->
                    </div>

                </div>
                <!-- / Left Side Content -->

                <!-- Right Side Content -->
                <div class="col-sm-6">
                    <div class="right_column dashboard_right_column">

                        <!-- Statistics -->
                        <div class="statistics_single_section">
                            <div class="statistics_title">
                                <h3>Statistics</h3>
                                <div class="progress_report_right">
                                    <h3>{{ dashboard.data.stats.activity }}% <span>more activity</span></h3>
                                    <div class="progress_report_arrow">
                                        <img width="15" src="../assets/images/arrow_top.png" alt="Arrow Top">
                                    </div>
                                </div>
                            </div>

                            <!-- Statistics Chart -->
                            <div class="statistics_chart">
                                <div class="statistics_chart_left">
                                    <h3>{{ dashboard.data.stats.paid_users | number_format }}</h3>
                                    <p>Paid by USers</p>
                                </div>
                                <div class="statistics_chart_middle">
                                    <div class="statics_total_orders">
                                        <h3>{{ dashboard.data.stats.total_orders | number_format }}</h3>
                                        <p>Total orders</p>
                                    </div>

                                    <div class="google_circle_chart">
                                        <div google-chart chart="dashboard.pieChart" id="donutchart" class="chart-size" style="width:100%; height: 120px"></div>
                                    </div>
                                </div>
                                <div class="statistics_chart_right">
                                    <h3>{{ dashboard.data.stats.paid_shops | number_format }}</h3>
                                    <p>Paid by Shops</p>
                                </div>
                            </div>

                            <!-- Total Sales Report -->
                            <div class="total_sales_report_section">
                                <div class="statistics_total_sales_report">
                                    <p>Total Sales Report</p>
                                    <h1>{{ dashboard.data.stats.total_sales_report | money }}</h1>
                                </div>
                                <a title="Orders" ng-href="{{ dashboard.urls.linkToOrdersList() }}" class="statistic_order_button pointer">
                                    Orders
                                </a>
                            </div>

                        </div>
                        <!-- / Statistics -->

                        <!-- Drivers Registered -->
                        <div class="statistics_single_section">
                            <div class="statistics_single_registered">
                                <div class="registered_left">
                                    <h4>Drivers Registered</h4>
                                    <h3>{{ dashboard.data.other.drivers.total }}</h3>
                                </div>
                                <div ng-show="dashboard.data.other.drivers.activity > 0" class="registered_right green_text">
                                    <p>more {{ dashboard.data.other.drivers.activity }}% than {{ dashboard.suffix }}</p>
                                    <img width="7" src="assets/images/arrow_top_small.png" alt="Arrow Top">
                                </div>
                                <div ng-show="dashboard.data.other.drivers.activity < 0" class="registered_right red_text">
                                    <p>less {{ dashboard.data.other.drivers.activity }}% than {{ dashboard.suffix }}</p>
                                    <img width="7" src="assets/images/arrow_down_red.png" alt="Arrow Down">
                                </div>
                            </div>
                            <div class="statistics_single_registered">
                                <div class="registered_left">
                                    <h4>Clients Registered</h4>
                                    <h3>{{ dashboard.data.other.clients.total }}</h3>
                                </div>
                                <div ng-show="dashboard.data.other.clients.activity > 0" class="registered_right green_text">
                                    <p>more {{ dashboard.data.other.clients.activity }}% than {{ dashboard.suffix }}</p>
                                    <img width="7" src="assets/images/arrow_top_small.png" alt="Arrow Top">
                                </div>
                                <div ng-show="dashboard.data.other.clients.activity < 0" class="registered_right red_text">
                                    <p>less {{ dashboard.data.other.clients.activity }}% than {{ dashboard.suffix }}</p>
                                    <img width="7" src="assets/images/arrow_down_red.png" alt="Arrow Down">
                                </div>
                            </div>
                            <div class="statistics_single_registered">
                                <div class="registered_left">
                                    <h4>Shops Registered</h4>
                                    <h3>{{ dashboard.data.other.shops.total }}</h3>
                                </div>
                                <div ng-show="dashboard.data.other.shops.activity > 0" class="registered_right green_text">
                                    <p>more {{ dashboard.data.other.shops.activity }}% than {{ dashboard.suffix }}</p>
                                    <img width="7" src="assets/images/arrow_top_small.png" alt="Arrow Top">
                                </div>
                                <div ng-show="dashboard.data.other.shops.activity < 0" class="registered_right red_text">
                                    <p>less {{ dashboard.data.other.shops.activity }}% than {{ dashboard.suffix }}</p>
                                    <img width="7" src="assets/images/arrow_down_red.png" alt="Arrow Down">
                                </div>
                            </div>
                            <div class="statistics_single_registered">
                                <div class="registered_left">
                                    <h4>Shops Removed</h4>
                                    <h3>{{ dashboard.data.other.shops_removed.total }}</h3>
                                </div>
                                <div ng-show="dashboard.data.other.shops_removed.activity > 0" class="registered_right green_text">
                                    <p>more {{ dashboard.data.other.shops_removed.activity }}% than {{ dashboard.suffix }}</p>
                                    <img width="7" src="assets/images/arrow_top_small.png" alt="Arrow Top">
                                </div>
                                <div ng-show="dashboard.data.other.shops_removed.activity < 0" class="registered_right red_text">
                                    <p>less {{ dashboard.data.other.shops_removed.activity }}% than {{ dashboard.suffix }}</p>
                                    <img width="7" src="assets/images/arrow_down_red.png" alt="Arrow Down">
                                </div>
                            </div>
                        </div>
                        <!-- / Drivers Registered -->

                    </div>
                </div>
                <!--/ Right Side Content -->

            </div>

        </div>
    </div>
    <!-- / Main Content Area -->

</div>

<%@include file="partials/footer.jsp" %>


