<!-- Drivers Deliverys Data table -->
<div class="data_table_area" ng-controller="driverDeliverysController as deliverys">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <!-- Data table -->
                <div class="table-responsive shops_sales_table">
                    <table class="table" datatable="ng" dt-instance="deliverys.dtInstance"
                           dt-options="deliverys.dtOptions" dt-column-defs="deliverys.dtColumnDefs">
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

                        <tr class="table_row" ng-repeat="delivery in ::deliverys.list">
                            <td class="sales_name">{{ delivery.name }}</td>
                            <td class="sales_date">{{ delivery.$date | simpleDate }}</td>
                            <td class="sales_price">{{ delivery.price | money }}</td>
                            <td class="sales_postcode">{{ delivery.postcode }}</td>
                            <td class="sales_stutas">
                                <div ng-show="delivery.status == 'waiting'">
                                    <img  width="14" src="./assets/images/waiting-icon.png" alt=""/>
                                    Waiting...
                                </div>
                                <div ng-show="delivery.status != 'waiting'">
                                    {{ delivery.status | capitalize }}
                                </div>
                            </td>
                            <td class="sales_driverby">{{ delivery.driver_by }}</td>
                            <td class="sales_views">
                                <a ng-href="{{ deliverys.urls.linkToDelivery(delivery._id.$oid) }}"
                                   class="sales_view_button pointer" title="View">
                                    View
                                </a>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <!-- / Data table -->
            </div>
        </div>

    </div>
</div>
<!-- / Drivers Deliverys Data table -->