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