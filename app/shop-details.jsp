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

    <div class="subbar_area shopsview_page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <a class="backto_list" href="shops.html"><img width="6"
                                                                              src="assets/images/left-arrow.png" alt="">
                                    Back to list</a>
                                <a href="#" class="tesco_express">{{ info.storeName }}</a>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">
                            <div class="right_side_list">
                                <ul>
                                    <li class="active">
                                        <a href="shops-resume.html">Resume</a>
                                    </li>
                                    <li>
                                        <a href="shops-sales.html">Sales</a>
                                    </li>
                                    <li>
                                        <a href="shops-invoices.html">Invoices</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="data_table_area shopsview_table shops_resume_page">
        <div class="container">
            <div class="row">

                <div class="col-sm-6">
                    <div class="left_column">

                        <div class="left_column_single">
                            <div class="single_left">
                                <div class="tesco_logo">
                                    <img width="80" ng-src="{{ image(shopId) }}" alt="">
                                </div>
                            </div>
                            <div class="single_middle">
                                <h2>{{ info.storeName }}</h2>
                                <p>{{ info.storeCat }}</p>
                                <div class="rating-container rating-xs rating-animate">
                                    <input type="number" ng-model="info.rating" class="hide" id="rating-stars">
                                </div>
                            </div>

                            <div class="single_right">
                                <p>Products</p>
                                <h4>{{ info.totalProducts }}</h4>
                                <a href="#" class="view_page">View Page</a>
                            </div>

                        </div>

                        <div class="left_column_single total_sale_report google_chart_area">
                            <div class="total_sale_top">
                                <div class="single_left_top">
                                    <p>Total Sale Report</p>
                                    <h1>£ {{ info.totalSales }}</h1>
                                </div>
                                <a href="#" class="view_page">Sales</a>
                            </div>

                            <div class="total_sale_bottom">
                                <div class="google_chart">
                                    <div id="chart_div" class="chart-size"></div>
                                </div>

                                <div class="total_sale_middle">
                                    <h2>Total Sales</h2>
                                    <p>1 264</p>
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
                                    <a href="#">Invoices</a>
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
                                            <td class="download"><a href="#"><img width="13"
                                                                                  src="assets/images/download-icon.png"
                                                                                  alt=""></a></td>
                                        </tr>
                                        <tr>
                                            <td class="date">April 16, 2016</td>
                                            <td class="price">$ 50.00</td>
                                            <td class="due">Due</td>
                                            <td class="download"><a href="#"><img width="13"
                                                                                  src="assets/images/download-icon.png"
                                                                                  alt=""></a></td>
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
                                        <li><img width="9" src="assets/images/phone-icon.png" alt=""> <span>{{ info.cell }}</span>
                                        </li>
                                        <li><img width="9" src="assets/images/phone-icon.png" alt=""> <span>{{ info.email }}</span>
                                        </li>
                                        <li><img width="9" src="assets/images/map-marker.png" alt=""> <span>{{ info.address }},<br/>
                                            {{ info.city }},<br/>
                                            {{ info.postcode }}</span></li>
                                    </ul>
                                </div>
                                <div class="contact_right">
                                    <h4>Opening Time</h4>
                                    <div class="single_date_time">
                                        <h4>Monday to Friday</h4>
                                        <p>from 09:00 to 18:00</p>
                                    </div>
                                    <div class="single_date_time">
                                        <h4>Saturday</h4>
                                        <p>from 09:00 to 18:00</p>
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
                                <a href="#" class="view_all-order">View all orders <span><img width="4"
                                                                                              src="assets/images/angle-right.png"
                                                                                              alt=""></span></a>
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

                                        <tr class="table_row">
                                            <td class="date_list">16/05/2016</td>
                                            <td class="price_list">£ 1 365.32</td>
                                            <td class="status">Sended</td>
                                            <td class="driver_by">Shop</td>
                                            <td class="view_link"><a href="#">View</a></td>
                                        </tr>


                                        <tr class="table_row">
                                            <td class="date_list">16/05/2016</td>
                                            <td class="price_list">£ 1 365.32</td>
                                            <td class="status"><img width="14" src="assets/images/waiting-icon.png"
                                                                    alt=""> Waiting...
                                            </td>
                                            <td class="driver_by">Shop</td>
                                            <td class="view_link"><a href="#">View</a></td>
                                        </tr>


                                        <tr class="table_row">
                                            <td class="date_list">16/05/2016</td>
                                            <td class="price_list">£ 1 365.32</td>
                                            <td class="status">Sended</td>
                                            <td class="driver_by">Shop</td>
                                            <td class="view_link"><a href="#">View</a></td>
                                        </tr>


                                        <tr class="table_row">
                                            <td class="date_list">16/05/2016</td>
                                            <td class="price_list">£ 1 365.32</td>
                                            <td class="status">Sended</td>
                                            <td class="driver_by">Shop</td>
                                            <td class="view_link"><a href="#">View</a></td>
                                        </tr>


                                        <tr class="table_row">
                                            <td class="date_list">16/05/2016</td>
                                            <td class="price_list">£ 1 365.32</td>
                                            <td class="status">Sended</td>
                                            <td class="driver_by">Shop</td>
                                            <td class="view_link"><a href="#">View</a></td>
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

<%@include file="partials/footer.jsp" %>