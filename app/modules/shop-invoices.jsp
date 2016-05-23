<div class="data_table_area shopsview_table shops_resume_page">
    <div class="container">
        <div class="row">

            <div class="col-sm-6">
                <div class="left_column invoice_history_left_column">

                    <div class="invoice_left_top">
                        <div class="invoice_paid_left">
                            <p>Invoices Paid</p>
                            <h1>£ 250.00</h1>
                        </div>
                        <div class="invoice_paid_left">
                            <p class="red">Pending</p>
                            <h1>£ 50.00</h1>
                            <a href="#" class="send_alert" title="Send Alert">Send Alert</a>
                        </div>

                    </div>

                    <div class="invoice_left_bottom">
                        <div class="invoice_paid_bottm_top">
                            <div class="single_left_top">
                                <h4>Invoices Paid Graph</h4>
                                <ul>
                                    <li>1 Month</li>
                                    <li>6 Months</li>
                                    <li>1 Year</li>
                                </ul>
                            </div>
                        </div>

                        <div class="total_sale_bottom">
                            <div class="google_chart">
                                <div id="chart_div1" class="chart-size"></div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div class="col-sm-6">
                <div class="right_column">
                    <div class="contact_info invoice_history_section">
                        <div class="list_of_order">

                            <div class="list_of_order_table">

                                <div class="invoice_history">
                                    <p>Invoice History</p>

                                    <div class="invoice_history_menu">
                                        <ul>
                                            <li ng-class="{active: invoicesTabs[0].active}">
                                                <a ng-click="setInvoicesTab(0)" id="all" href="#" title="All">All</a>
                                            </li>
                                            <li ng-class="{active: invoicesTabs[1].active}">
                                                <a ng-click="setInvoicesTab(1)" id="paid" href="#" title="Paid">Paid</a>
                                            </li>
                                            <li ng-class="{active: invoicesTabs[2].active}">
                                                <a ng-click="setInvoicesTab(2)" id="due" href="#" title="Due">Due</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="invoice_history_data_table">

                                    <div class="table-responsive">
                                        <div class="table-responsive shops_sales_table">
                                            <table class="table" datatable="ng"
                                                   dt-instance="shopDetails.dtInstanceInvoices"
                                                   dt-options="shopDetails.dtOptionsInvoices">
                                                <thead ng-hide="true">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </thead>
                                                <tbody>

                                                <!-- Single Table Row -->
                                                <tr class="invoice_history_row"
                                                    ng-repeat="invoice in shopDetails.invoices">
                                                    <td class="invoice_date">{{ invoice.storeName }}</td>
                                                    <td class="invoice_price">$ 50.00</td>
                                                    <td class="invoice_due">Due</td>
                                                    <td class="invoice_download">
                                                        <a href="#" title="Download">
                                                            <img width="15"
                                                                 src="assets/images/download-icon.png"
                                                                 alt="Download Ico">
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
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>