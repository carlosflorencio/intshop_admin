<%@include file="partials/header.jsp" %>

<div ng-controller="shopsController as ngShops">

    <div class="subbar_area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <h3>List of Shops</h3>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">
                            <div class="search_bar">
                                    <div class="search_box">
                                        <button type="submit">
                                            <img width="15" src="assets/images/search.png" alt="Search Ico">
                                        </button>
                                        <input type="text" placeholder="Search" ng-model="searchText"
                                               ng-change="searchTable()">
                                    </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="data_table_area">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">

                    <div class="table-responsive">
                        <table class="table" datatable="ng" dt-instance="ngShops.dtInstance"
                               dt-options="ngShops.dtOptions" dt-column-defs="ngShops.dtColumnDefs">
                            <thead>
                            <tr class="table_title">
                                <th>Logo</th>
                                <th>
                                    Shop Name
                                </th>
                                <th>
                                    Type of Shop
                                </th>
                                <th>
                                    Products
                                </th>
                                <th>
                                    Total Sale Report
                                </th>
                                <th>
                                    Shop Rate
                                </th>
                                <th>

                                </th>
                            </tr>
                            </thead>
                            <tbody>

                            <!-- Single Table Row -->
                            <tr class="table_row" ng-repeat="shop in ::ngShops.shops">
                                <td class="logo">
                                    <img width="16" ng-src="{{ image(shop._id.$oid) }}" alt="{{ shop.storeName }}" onError="this.src='./assets/images/image-icon.png'">
                                </td>
                                <td class="shop_name">{{ shop.storeName }}</td>
                                <td class="type_of_shop">{{ shop.type }}</td>
                                <td class="products">{{ shop.totalProducts }}</td>
                                <td class="sale_report">{{ shop.totalSales | money }}</td>
                                <td class="rate">
                                    <input type="number" class="rating-loading rating-stars" ng-model="shop.shopRate">
                                </td>
                                <td class="more_info text-center">
                                    <a ng-show="shop.active" href="#" ng-href="{{ ngShops.urls.linkToShopDetails(shop._id.$oid) }}"  class="more_info_button" title="More Info">More Info</a>
                                    <a ng-show="!shop.active" href="#" ng-href="{{ ngShops.urls.linkToShopDetails(shop._id.$oid) }}" class="more_info_button red_state" title="Action">!</a>
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

<%@include file="partials/footer.jsp" %>