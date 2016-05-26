<div class="data_table_area shopsview_table shops_resume_page" ng-controller="driverInvoicesController as invoicesCtrl">
    <div class="container">
        <div class="row">

            <div class="col-sm-6">
                <div class="left_column invoice_history_left_column">

                    <div class="invoice_left_top">
                        <div class="invoice_paid_left">
                            <p>Invoices Paid</p>
                            <h1>{{ driver.info.invoicesPaid | money }}</h1>
                        </div>
                        <div class="invoice_paid_left">
                            <p class="red">Pending</p>
                            <h1>{{ driver.info.invoicesPending | money }}</h1>
                            <a href="#" class="send_alert" title="Send Alert">Send Alert</a>
                        </div>

                    </div>

                    <div class="invoice_left_bottom">
                        <div class="invoice_paid_bottm_top">
                            <div class="single_left_top">
                                <h4>Invoices Paid Graph</h4>
                                <ul>
                                    <li ng-click="invoicesCtrl.setChartType(2)"
                                        ng-class="{active: invoicesCtrl.chartType == 2}" class="pointer">1 Month</li>
                                    <li ng-click="invoicesCtrl.setChartType(1)"
                                        ng-class="{active: invoicesCtrl.chartType == 1}" class="pointer">6 Months</li>
                                    <li ng-click="invoicesCtrl.setChartType(0)"
                                        ng-class="{active: invoicesCtrl.chartType == 0}" class="pointer">1 Year</li>
                                </ul>
                            </div>
                        </div>

                        <div class="total_sale_bottom">
                            <div class="google_chart">
                                <div google-chart chart="invoicesCtrl.invoicesChart" class="chart-size" style="width:100%;"></div>
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
                                            <li ng-class="{active: invoicesCtrl.invoicesType == 0}">
                                                <a ng-click="invoicesCtrl.setInvoiceType(0)" id="all" href="#" title="All">All</a>
                                            </li>
                                            <li ng-class="{active: invoicesCtrl.invoicesType == 1}">
                                                <a ng-click="invoicesCtrl.setInvoiceType(1)" id="paid" href="#" title="Paid">Paid</a>
                                            </li>
                                            <li ng-class="{active: invoicesCtrl.invoicesType == 2}">
                                                <a ng-click="invoicesCtrl.setInvoiceType(2)" id="due" href="#" title="Due">Due</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="invoice_history_data_table">

                                    <div class="table-responsive">
                                        <div class="table-responsive shops_sales_table">
                                            <table class="table" datatable="ng"
                                                   dt-instance="invoicesCtrl.dtInstance"
                                                   dt-options="invoicesCtrl.dtOptions">
                                                <thead ng-hide="true">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </thead>
                                                <tbody>

                                                <!-- Single Table Row -->
                                                <tr class="invoice_history_row"
                                                    ng-repeat="invoice in invoicesCtrl.invoices">
                                                    <td class="invoice_date">{{ invoice.$date | simpleDate }}</td>
                                                    <td class="invoice_price">{{ invoice.value | money }}</td>
                                                    <td class="invoice_due">{{ invoice.type | capitalize }}</td>
                                                    <td class="invoice_download">
                                                        <a ng-href="{{ invoice.download }}" title="Download">
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