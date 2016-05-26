<!-- Drivers Resume Data Table -->
<div class="data_table_area shopsview_table driver_resume_page" ng-controller="driverResumeController as resume">
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
                                    <img width="80" ng-src="{{ resume.image(driver.driverId) }}" alt="{{ driver.info.name }}">
                                </div>
                            </div>
                            <div class="single_middle">
                                <h2>{{ driver.info.name }}</h2>
                                <p>License points: {{ driver.info.license_points }}</p>
                                <input type="number" ng-model="driver.info.rate"  class="hide" id="rating-stars">
                            </div>

                            <div class="single_right">
                                <img width="{{ resume.carImageSize(driver.info.vehicle) }}"
                                     ng-src="{{ resume.carImage(driver.info.vehicle) }}" alt="{{ resume.carName() }}">
                                <p>{{ resume.carName() }}</p>
                                <h3>{{ driver.info.plate }}</h3>
                            </div>
                        </div>

                        <div class="drivers_left_bottom">
                            <div class="delivery_licence_type">
                                <ul>
                                    <li>Driving License Type <span>{{ driver.info.license_type }}</span></li>
                                    <li>Number <span>{{ driver.info.license_number }}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- / Drivers Information -->

                    <!-- Contact Info -->
                    <div class="left_column_single border_bottom_none">

                        <div class="contact_info">
                            <div class="contact_top">
                                <!-- Contact -->
                                <div class="contact_left">
                                    <h4>Contact Info</h4>
                                    <ul>
                                        <li>
                                            <img width="9" alt="Phone ico" src="assets/images/phone-icon.png">
                                            <span>{{ driver.info.cell }}</span>
                                        </li>
                                        <li>
                                            <img width="9" alt="Phone ico" src="assets/images/phone-icon.png">
                                            <span>{{ driver.info.email }}</span>
                                        </li>
                                        <li><img width="9" alt="Pointer Ico" src="assets/images/map-marker.png"> <span>{{ driver.info.address }},<br>
                                            {{ driver.info.city }},<br>
                                            {{ driver.info.postcode }}</span></li>
                                        <li>Born {{ driver.info.born }}</li>
                                    </ul>
                                </div>

                                <!-- Insurance -->
                                <div class="contact_right insurance">
                                    <h4>Insurance</h4>
                                    <div class="single_date_time">
                                        <h4>Policy Number</h4>
                                        <p>{{ driver.info.insurance.policy_number }}</p>
                                    </div>
                                    <div class="single_date_time">
                                        <h4>Expiration Date</h4>
                                        <p>{{ driver.info.insurance.expiration }}</p>
                                    </div>
                                    <div class="single_date_time">
                                        <h4>Company Name</h4>
                                        <p>{{ driver.info.insurance.company }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Card Info -->
                        <div class="card_info contact_right insurance">
                            <h4>Card info</h4>
                            <div class="single_date_time">
                                <h4>Credit Card Number</h4>
                                <p>{{ driver.info.card.number }}</p>
                            </div>
                            <div class="single_date_time">
                                <h4>Expirity Date</h4>
                                <p>{{ driver.info.card.expiration }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- / Contact Info -->

                    <div class="contact_bottom">
                        <p>Registered in {{ driver.info.regDate.$date | fullDate }}</p>
                    </div>

                </div>
            </div>
            <!-- / Drivers Resume Left -->

            <!-- Drivers Resume Right -->
            <div class="col-sm-6">
                <div class="right_column">
                    <div class="drivers_resume_chart_section">
                        <!-- Total Deliverys -->
                        <div class="total_deliverys">
                            <div class="single_left_top">
                                <p>Total Deliverys</p>
                                <h1>{{ driver.info.total_deliveries | number_format }}</h1>
                            </div>
                            <a title="Deliverys" ng-click="driver.setTab(1)" class="view_page pointer">Deliverys</a>
                        </div>

                        <!-- Deliverys  Chart -->
                        <div class="invoice_left_bottom">
                            <div class="invoice_paid_bottm_top">
                                <div class="single_left_top">
                                    <h4>Deliverys</h4>
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
                                    <div google-chart chart="resume.deliverysChart" class="chart-size" style="width:100%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- List of orders -->
                    <div class="list_of_order">
                        <div class="left_column_single total_sale_report">

                            <div class="single_top_full">
                                <div class="single_left_top">
                                    <p>Invoices Paid</p>
                                    <h1>{{ driver.info.invoicesPaid | money }}</h1>
                                </div>
                                <div class="single_top_right">
                                    <a class="pointer" ng-click="driver.setTab(2)">Invoices</a>
                                </div>
                            </div>

                            <!-- Invoice History Table -->
                            <div class="invoice_history_table">
                                <p>Invoice History</p>
                                <div class="table-responsive">
                                    <table class="table">
                                        <tr ng-repeat="invoice in resume.invoices | limitTo: 5">
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
                            <!-- / Invoice History Table -->
                        </div>
                    </div>
                    <!-- / List of orders -->

                </div>
            </div>
            <!-- / Drivers Resume Right -->
        </div>

    </div>
</div>
<!-- / Drivers Resume Data Table -->