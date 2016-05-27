<!-- Client Orders Data table -->
<div class="data_table_area" ng-controller="clientReviewsController as reviews">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <!-- Data table -->
                <div class="table-responsive shops_sales_table">
                    <table class="table" datatable="ng" dt-instance="reviews.dtInstance"
                           dt-options="reviews.dtOptions" dt-column-defs="reviews.dtColumnDefs">
                        <thead>
                        <tr class="table_title">
                            <th>Date</th>
                            <th>Order</th>
                            <th>To</th>
                            <th>Rate</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr class="table_row" ng-repeat="review in ::reviews.list">
                            <td class="sales_date clients_reviews">
                                {{ review.$date | simpleDate }}
                            </td>
                            <td class="clients_order">
                                <div class="order_number">{{ review.order.number | hashtag }}</div>
                                <div class="order_date">({{ review.order.date | simpleDate }})</div>
                            </td>
                            <td class="Clients_to">{{ review.order.to }}</td>
                            <td class="shop_rate">
                                <input type="number" class="rating-stars" ng-model="review.rate">
                            </td>
                            <td class="sales_views">
                                <a title="View"
                                   ng-href="{{ client.urls.linkToOrderInfo(review.order._id.$oid) }}"
                                   class="sales_view_button pointer">
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
<!-- / Client Orders Data table -->