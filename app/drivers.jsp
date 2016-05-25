<%@include file="partials/header.jsp" %>

<div ng-controller="driversController as driversCtrl">

    <!-- Sub Bar -->
    <div class="subbar_area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">
                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <h3>List of Drivers</h3>
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
                                        <input type="text" placeholder="Search" ng-model="driversCtrl.searchText"
                                               ng-change="driversCtrl.searchTable()">
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

                    <div class="table-responsive">
                        <table class="table driver_data_table"
                               datatable="ng"
                               dt-instance="driversCtrl.dtInstance"
                               dt-options="driversCtrl.dtOptions"
                               dt-column-defs="driversCtrl.dtColumnDefs">
                            <thead>
                                <tr class="table_title">
                                    <th>Image</th>
                                    <th>Driver Name</th>
                                    <th>Vehicle</th>
                                    <th>Deliverys</th>
                                    <th>Amount Win</th>
                                    <th>Driver Rate</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table_row" ng-repeat="driver in ::driversCtrl.drivers">
                                    <td class="logo">
                                        <img width="16" ng-src="{{ driversCtrl.image(driver._id.$oid) }}" alt="{{ driver.name }}"
                                             onError="this.src='./assets/images/image-icon.png'">
                                    </td>
                                    <td class="shop_name">
                                        {{ driver.name }}
                                    </td>
                                    <td class="type_of_shop vehicle">
                                        <div class="vehicle_image">
                                            <img width="{{ driversCtrl.carImageSize(driver.vehicle) }}"
                                                 ng-src="{{ driversCtrl.carImage(driver.vehicle) }}"
                                                 alt="{{ driversCtrl.carName(driver.vehicle) }}">
                                        </div>
                                        <div class="vehicle_name">
                                            {{ driversCtrl.carName(driver.vehicle) }}
                                        </div>
                                    </td>
                                    <td class="products">
                                        {{ driver.deliverys }}
                                    </td>
                                    <td class="sale_report">
                                        {{ driver.amount_win | money }}
                                    </td>
                                    <td class="shop_rate">
                                        <input type="number" class="rating-loading rating-stars" ng-model="driver.rate">
                                    </td>
                                    <td class="more_info text-center">
                                        <a title="View More" ng-href="{{ driversCtrl.urls.linkToDriversDetails(driver._id.$oid) }}" class="more_info_button">
                                            View More
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