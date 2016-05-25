<%@include file="partials/header.jsp" %>

<div ng-controller="clientsController as clientsCtrl">

    <!-- Sub Bar -->
    <div class="subbar_area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">
                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <h3>List of Clients</h3>
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
                                        <input type="text" placeholder="Search" ng-model="clientsCtrl.searchText"
                                               ng-change="clientsCtrl.searchTable()">
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
    <div class="data_table_area clients_table">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">

                    <div class="table-responsive">
                        <table class="table"
                               datatable="ng"
                               dt-instance="clientsCtrl.dtInstance"
                               dt-options="clientsCtrl.dtOptions"
                               dt-column-defs="clientsCtrl.dtColumnDefs">
                            <thead>
                                <tr class="table_title">
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Total Orders</th>
                                    <th>Amount Spend</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table_row" ng-repeat="client in ::clientsCtrl.clients">
                                    <td class="logo">
                                        <img width="16" ng-src="{{ clientsCtrl.image(client._id.$oid) }}" alt="{{ client.name }}">
                                    </td>
                                    <td class="shop_name">
                                        {{ client.name }}
                                    </td>
                                    <td class="type_of_shop">
                                        {{ client.orders }}
                                    </td>
                                    <td class="sale_report">
                                        {{ client.amount_spend | money }}
                                    </td>
                                    <td class="more_info text-center">
                                        <a title="View more" ng-href="{{ clientsCtrl.urls.linkToClientDetails(client._id.$oid) }}"
                                           class="more_info_button pointer">
                                            View more
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