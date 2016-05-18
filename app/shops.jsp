<%@include file="partials/header.jsp" %>

<div ng-controller="shopsController">

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
                                        <input type="text" placeholder="Search">
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
                        <table class="table">
                            <thead>
                            <tr class="table_title">
                                <th>Logo</th>
                                <th class="sortable">
                                    <img src="assets/images/icon_arrow_darkblue.svg" class="svg img-up"/>
                                    <img src="assets/images/icon_arrow_darkblue.svg" class="svg img-down"/>
                                    <span>Shop Name</span>
                                </th>
                                <th class="sortable">
                                    <img src="assets/images/icon_arrow_darkblue.svg" class="svg img-up"/>
                                    <img src="assets/images/icon_arrow_darkblue.svg" class="svg img-down"/>
                                    <span>Type of Shop</span>
                                </th>
                                <th class="sortable">
                                    <img src="assets/images/icon_arrow_darkblue.svg" class="svg img-up"/>
                                    <img src="assets/images/icon_arrow_darkblue.svg" class="svg img-down"/>
                                    <span>Products</span>
                                </th>
                                <th class="sortable">
                                    <img src="assets/images/icon_arrow_darkblue.svg" class="svg img-up"/>
                                    <img src="assets/images/icon_arrow_darkblue.svg" class="svg img-down"/>
                                    <span>Total Sale Report</span>
                                </th>
                                <th> </th>
                                <th class="checkbox">
                                    <div class="grey-checkbox">
                                        <label>
                                            <input type="checkbox" id="selectall"><span></span>
                                        </label>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>

                                <!-- Single Table Row -->
                                <tr class="table_row" ng-repeat="shop in shops">
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
                                                <input type="checkbox" class="case" name="case"><span></span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="pagination_area">

                        <div class="pagination_left">
                            <select name="show_item" id="shop_item">
                                <option value="null">10 entrys</option>
                                <option value="1">20 entrys</option>
                                <option value="2">30 entrys</option>
                                <option value="3">40 entrys</option>
                                <option value="4">50 entrys</option>
                            </select>
                            <p class="showing_counter">Showing 1 to 10 of 23 shops</p>

                        </div>
                        <ul class="pagination">
                            <li class="previous"><a href="#"><span class="glyphicon glyphicon-chevron-left"></span></a></li>
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li><a href="#">...</a></li>
                            <li><a href="#">24</a></li>
                            <li class="next"><a href="#"><span class="glyphicon glyphicon-chevron-right"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<%@include file="partials/footer.jsp" %>