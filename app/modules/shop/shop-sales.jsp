<div class="data_table_area" ng-controller="shopSalesController as sales">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="table-responsive shops_sales_table">
                    <table class="table" datatable="ng" dt-instance="sales.dtInstance"
                           dt-options="sales.dtOptions" dt-column-defs="sales.dtColumnDefs">
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

                        <tr class="table_row" ng-repeat="sale in ::sales.list">
                            <td class="sales_name">{{ sale.name }}</td>
                            <td class="sales_date">{{ sale.$date | simpleDate }}</td>
                            <td class="sales_price">{{ sale.price | money }}</td>
                            <td class="sales_postcode">{{ sale.postcode }}</td>
                            <td class="sales_stutas">
                                <div ng-show="sale.status == 'waiting'">
                                    <img  width="14" src="./assets/images/waiting-icon.png" alt=""/>
                                    Waiting...
                                </div>
                                <div ng-show="sale.status != 'waiting'">
                                    {{ sale.status | capitalize }}
                                </div>
                            </td>
                            <td class="sales_driverby">{{ sale.driver_by }}</td>
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