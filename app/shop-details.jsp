<%@include file="partials/header.jsp" %>

<script type="text/javascript">
    //google.charts.load('current', {packages: ['corechart', 'bar']});

    //google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
        var data = google.visualization.arrayToDataTable([
            ['Element', 'Sales', {role: 'style'}],
            ['6h', 8, '#3493d5'],            // RGB value
            ['12h', 10, '#3493d5'],            // English color name
            ['24h', 19, '#3493d5'],
            ['total', 21, 'color: #3493d5'] // CSS-style declaration
        ]);

        var options = {
            legend: {position: 'none'},
            vAxis: {
                gridlines: {
                    color: 'transparent'
                }
            }
        };

        var chart = new google.visualization.ColumnChart(
                document.getElementById('chart_div'));

        //chart.draw(data, options);
    }
</script>

<div ng-controller="shopDetailsController as shop">

    <div ng-class="{sales_page: shop.tabs[1].active}" class="subbar_area shopsview_page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <a class="backto_list" href="shops.jsp" title="Back to Shops">
                                    <img width="6" src="assets/images/left-arrow.png" alt="Left Arrow">
                                    Back to list
                                </a>
                                <a href="#" class="tesco_express" title="{{ shop.info.storeName }}">{{ shop.info.storeName }}</a>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">

                            <div class="search_bar" ng-show="shop.tabs[1].active">
                                <form action="">
                                    <div class="search_box">
                                        <button type="submit">
                                            <img width="15" alt="Search Ico" src="assets/images/search.png">
                                        </button>
                                        <input type="text" placeholder="Search" ng-model="shop.searchText"
                                               ng-change="shop.searchTable()">
                                    </div>
                                </form>
                            </div>

                            <div class="right_side_list">
                                <ul>
                                    <li ng-class="{active: shop.tabs[0].active}">
                                        <a class="pointer" ng-click="shop.setTab(0)" title="Resume">Resume</a>
                                    </li>
                                    <li ng-class="{active: shop.tabs[1].active}">
                                        <a class="pointer" ng-click="shop.setTab(1)" title="Sales">Sales</a>
                                    </li>
                                    <li ng-class="{active: shop.tabs[2].active}">
                                        <a class="pointer" ng-click="shop.setTab(2)" title="Invoices">Invoices</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Resume tab -->
    <div ng-show="shop.tabs[0].active">
        <%@include file="modules/shop-resume.jsp" %>
    </div>
    <!-- /Resume tab -->


    <!-- Sales tab -->
    <div ng-show="shop.tabs[1].active">
        <%@include file="modules/shop-sales.jsp" %>
    </div>
    <!-- /Sales tab -->


    <!-- Invoices tab -->
    <div ng-show="shop.tabs[2].active">
        <%@include file="modules/shop-invoices.jsp" %>
    </div>
    <!-- /Invoices tab -->
</div>

<%@include file="partials/footer.jsp" %>