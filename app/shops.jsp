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
                                <form action="">
                                    <div class="search_box">
                                        <button type="submit"><img width="15" src="assets/images/search.png" alt=""></button>
                                        <input type="text" placeholder="Search" ng-model="searchText"
                                               ng-change="searchTable()" >
                                    </div>
                                </form>
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
                        <table class="table" datatable="ng" dt-instance="ngShops.dtInstance" dt-options="ngShops.dtOptions" dt-column-defs="ngShops.dtColumnDefs">
                            <thead>
                            <tr class="table_title">
                                <th>Logo</th>
                                <th>
                                    <span>Shop Name</span>
                                </th>
                                <th>
                                    <span>Type of Shop</span>
                                </th>
                                <th>
                                    <span>Products</span>
                                </th>
                                <th>
                                    <span>Total Sale Report</span>
                                </th>
                                <th></th>
                                <th class="checkbox">
                                    <div class="grey-checkbox">
                                        <label>
                                            <input type="checkbox" id="selectall" ng-model="ngShops.selectAll" ng-click="ngShops.toggleAll(ngShops.selectAll, ngShops.selected)"><span></span>
                                        </label>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>

                            <!-- Single Table Row -->
                            <tr class="table_row" ng-repeat="shop in ::ngShops.shops">
                                <td class="logo">
                                    <img width="16" src="assets/images/image-icon.png" alt="">
                                </td>
                                <td class="shop_name">{{ shop.storeName }}</td>
                                <td class="type_of_shop">Grocery</td>
                                <td class="products">654</td>
                                <td class="sale_report">£ 2 032.65</td>
                                <td class="more_info text-center"><a href="#" class="more_info_button">More Info</a></td>
                                <td class="checkbox">
                                    <div class="grey-checkbox">
                                        <label>
                                            <input ng-model="ngShops.selected[shop._id.$oid]" ng-click="ngShops.toggleOne(ngShops.selected)" type="checkbox" class="case" name="case"><span></span>
                                        </label>
                                    </div>
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